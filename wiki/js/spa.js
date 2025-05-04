/**
 * 单页应用功能实现
 * 实现点击左侧导航加载内容而不是整页刷新
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化SPA功能
    initSPA();
    
    // 监听浏览器前进后退事件
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.path) {
            // 滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
            loadContent(event.state.path, false);
        }
    });
    
    // 检查当前URL是否需要加载特定内容
    checkCurrentPath();
});

/**
 * 初始化SPA功能
 */
function initSPA() {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-item a, .nav-links a');
    
    // 为每个链接添加点击事件
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // 跳过外部链接、锚点链接或已初始化的链接
        if (href && !href.startsWith('http') && !href.startsWith('#') && !link.hasAttribute('data-spa-initialized')) {
            link.addEventListener('click', function(e) {
                // 如果链接是指向当前域名下的HTML页面
                if (href.endsWith('.html') || href.indexOf('.html#') > -1) {
                    e.preventDefault();
                    
                    // 如果是当前活动链接，不做任何操作
                    if (this.parentElement.classList.contains('active')) {
                        return;
                    }
                    
                    // 加载内容
                    loadContent(href, true);
                    
                    // 更新URL，不刷新页面
                    history.pushState({ path: href }, '', href);
                    
                    // 如果在移动设备上，点击后关闭侧边栏
                    if (window.innerWidth <= 768) {
                        const sidebar = document.querySelector('.sidebar');
                        const sidebarToggle = document.querySelector('.sidebar-toggle');
                        if (sidebar) sidebar.classList.remove('active');
                        if (sidebarToggle) sidebarToggle.classList.remove('active');
                    }
                }
            });
            
            // 标记为已初始化
            link.setAttribute('data-spa-initialized', 'true');
        }
    });
    
    // 修复页面中的所有相对路径（初始加载时）
    setTimeout(() => {
        const currentPath = window.location.pathname;
        fixImagePaths(currentPath);
    }, 500);
}

/**
 * 加载指定路径的内容
 * @param {string} path - 内容路径
 * @param {boolean} updateActive - 是否更新活动状态
 */
function loadContent(path, updateActive) {
    // 显示加载状态
    showLoading();
    
    // 使用fetch API加载内容
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`网络响应异常: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // 解析HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // 提取主要内容
            const mainContent = doc.querySelector('.main-content');
            const tocContent = doc.querySelector('.table-of-contents');
            const sidebar = doc.querySelector('.sidebar');
            
            if (mainContent) {
                try {
                    // 先滚动到顶部，确保页面从顶部开始浏览
                    window.scrollTo({
                        top: 0,
                        behavior: 'auto'
                    });
                    
                    // 更新主内容区
                    document.querySelector('.main-content').innerHTML = mainContent.innerHTML;
                    
                    // 更新右侧目录
                    if (tocContent) {
                        const currentToc = document.querySelector('.table-of-contents');
                        if (currentToc) {
                            currentToc.innerHTML = tocContent.innerHTML;
                        }
                    }
                    
                    // 更新左侧侧边栏
                    if (sidebar) {
                        const currentSidebar = document.querySelector('.sidebar');
                        if (currentSidebar) {
                            currentSidebar.innerHTML = sidebar.innerHTML;
                        }
                    }
                    
                    // 更新页面标题
                    const title = doc.querySelector('title');
                    if (title) {
                        document.title = title.textContent;
                    }
                    
                    // 如果需要更新活动状态
                    if (updateActive) {
                        updateActiveNavItem(path);
                    }
                    
                    // 重新初始化交互功能
                    setTimeout(() => {
                        // 先修复图片路径
                        fixImagePaths(path);
                        // 然后初始化各种功能
                        initSidebar(); // 重新初始化侧边栏
                        initImagePreview();
                        initScrollSpy();
                        initCodeHighlight();
                        initCopyButtons();
                        lazyLoadImages();
                        initTableOfContents();
                        console.log("所有功能已重新初始化");
                    }, 100);
                } catch (error) {
                    console.error('处理内容时出错:', error);
                    showErrorMessage('处理内容时发生错误，请刷新页面重试。');
                }
            } else {
                throw new Error('无法获取页面内容: 找不到主内容区');
            }
        })
        .catch(error => {
            console.error('加载内容失败:', error);
            showErrorMessage(`无法加载请求的内容: ${error.message}。请稍后再试或刷新页面。`);
        })
        .finally(() => {
            // 隐藏加载状态
            hideLoading();
        });
}

/**
 * 更新活动导航项
 */
function updateActiveNavItem(path) {
    console.log("更新活动导航项：", path);
    
    // 移除所有导航项的活动状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 设置当前路径对应的导航项为活动状态
    let foundActiveItem = false;
    document.querySelectorAll('.nav-item a').forEach(link => {
        const href = link.getAttribute('href');
        
        // 精确匹配或路径结尾匹配
        if (href === path || path.endsWith(href)) {
            link.parentElement.classList.add('active');
            foundActiveItem = true;
            
            // 确保包含当前项的分类是展开的
            const parentCategory = link.closest('.nav-items');
            if (parentCategory && parentCategory.previousElementSibling) {
                parentCategory.classList.remove('collapsed');
                parentCategory.previousElementSibling.classList.remove('collapsed');
            }
            
            // 滚动侧边栏，确保当前项可见
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                setTimeout(() => {
                    sidebar.scrollTop = link.parentElement.offsetTop - 100;
                }, 100);
            }
        }
    });
    
    // 如果没有找到精确匹配，尝试基于文件名匹配
    if (!foundActiveItem) {
        const pathFilename = path.split('/').pop();
        document.querySelectorAll('.nav-item a').forEach(link => {
            const href = link.getAttribute('href');
            const hrefFilename = href.split('/').pop();
            
            if (pathFilename === hrefFilename) {
                link.parentElement.classList.add('active');
                
                // 确保包含当前项的分类是展开的
                const parentCategory = link.closest('.nav-items');
                if (parentCategory && parentCategory.previousElementSibling) {
                    parentCategory.classList.remove('collapsed');
                    parentCategory.previousElementSibling.classList.remove('collapsed');
                }
            }
        });
    }
}

/**
 * 显示加载状态
 */
function showLoading() {
    // 如果已有加载指示器，先移除
    hideLoading();
    
    // 创建加载指示器
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = `
        <div class="loading-spinner"></div>
        <p>加载中...</p>
    `;
    
    // 添加到主内容区顶部
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(loadingIndicator, mainContent.firstChild);
    
    // 添加半透明遮罩
    mainContent.classList.add('loading');
}

/**
 * 隐藏加载状态
 */
function hideLoading() {
    // 移除加载指示器
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
    
    // 移除半透明遮罩
    document.querySelector('.main-content').classList.remove('loading');
}

/**
 * 代码高亮功能
 */
function initCodeHighlight() {
    // 获取所有代码块
    const codeBlocks = document.querySelectorAll('pre code, .code-block');
    
    if (codeBlocks.length === 0) return;
    
    // 如果页面上有代码块但没有加载highlight.js，则动态加载
    if (typeof hljs === 'undefined') {
        // 加载highlight.js样式
        if (!document.querySelector('link[href*="highlight"]')) {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/atom-one-dark.min.css';
            document.head.appendChild(linkElement);
        }
        
        // 加载highlight.js脚本
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/highlight.min.js';
        script.onload = function() {
            // 脚本加载完成后执行高亮
            hljs.highlightAll();
        };
        document.head.appendChild(script);
    } else {
        // 如果已经加载了highlight.js，直接执行高亮
        hljs.highlightAll();
    }
}

/**
 * 添加代码复制按钮
 */
function initCopyButtons() {
    // 获取所有代码块
    const codeBlocks = document.querySelectorAll('pre code, .code-block');
    
    codeBlocks.forEach(block => {
        // 如果已经有复制按钮，跳过
        if (block.parentNode.querySelector('.copy-btn')) return;
        
        // 创建复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '复制';
        copyBtn.title = '复制代码';
        
        // 设置相对定位的容器
        if (block.parentNode.style.position !== 'relative') {
            block.parentNode.style.position = 'relative';
        }
        
        // 添加复制按钮到代码块
        block.parentNode.appendChild(copyBtn);
        
        // 添加点击事件
        copyBtn.addEventListener('click', function() {
            // 创建一个临时textarea来复制文本
            const textArea = document.createElement('textarea');
            textArea.value = block.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                // 执行复制命令
                const successful = document.execCommand('copy');
                
                // 根据复制结果显示不同提示
                this.innerHTML = successful ? '已复制!' : '复制失败';
                this.classList.add(successful ? 'success' : 'error');
                
                // 2秒后恢复按钮状态
                setTimeout(() => {
                    this.innerHTML = '复制';
                    this.classList.remove('success', 'error');
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
                this.innerHTML = '复制失败';
                this.classList.add('error');
            }
            
            // 移除临时textarea
            document.body.removeChild(textArea);
        });
    });
}

/**
 * 图片懒加载实现
 */
function lazyLoadImages() {
    // 检查浏览器是否支持IntersectionObserver
    if ('IntersectionObserver' in window) {
        // 获取所有图片
        const images = document.querySelectorAll('.main-content img:not(.no-lazy):not(.loaded)');
        
        // 创建观察者
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // 当图片进入视口
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // 如果有data-src属性，则加载真实图片
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        
                        // 图片加载完成后停止观察该图片
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // 开始观察所有图片
        images.forEach(img => {
            // 如果没有data-src属性，则设置data-src为当前src
            if (!img.dataset.src) {
                img.dataset.src = img.src;
                // 设置一个占位图或模糊的较小版本
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"%3E%3Crect width="300" height="150" fill="%23f0f0f0"/%3E%3C/svg%3E';
            }
            
            imageObserver.observe(img);
        });
    } else {
        // 如果浏览器不支持IntersectionObserver，直接加载所有图片
        document.querySelectorAll('.main-content img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

/**
 * 标签过滤系统
 */
function initTagSystem() {
    // 获取所有标签
    const tags = document.querySelectorAll('.tag');
    
    if (tags.length === 0) return;
    
    // 创建标签过滤区域
    const filterContainer = document.createElement('div');
    filterContainer.className = 'tag-filter-container';
    filterContainer.innerHTML = '<h4>按标签筛选</h4><div class="tag-filters"></div>';
    
    // 收集所有标签
    const uniqueTags = new Set();
    tags.forEach(tag => {
        uniqueTags.add(tag.textContent.trim());
    });
    
    // 创建标签过滤按钮
    const tagFiltersContainer = filterContainer.querySelector('.tag-filters');
    uniqueTags.forEach(tag => {
        const filterTag = document.createElement('span');
        filterTag.className = 'filter-tag';
        filterTag.textContent = tag;
        filterTag.addEventListener('click', function() {
            this.classList.toggle('active');
            filterContent();
        });
        tagFiltersContainer.appendChild(filterTag);
    });
    
    // 在合适的位置插入标签过滤区域
    const contentHeader = document.querySelector('.content-header');
    if (contentHeader && contentHeader.nextElementSibling) {
        contentHeader.parentNode.insertBefore(filterContainer, contentHeader.nextElementSibling);
    }
    
    // 过滤内容
    function filterContent() {
        const activeFilters = document.querySelectorAll('.filter-tag.active');
        const filtersArray = Array.from(activeFilters).map(filter => filter.textContent.trim());
        
        // 如果没有活动的过滤器，显示所有内容
        if (filtersArray.length === 0) {
            document.querySelectorAll('.tool-card, .category-card').forEach(item => {
                item.style.display = '';
            });
            return;
        }
        
        // 过滤卡片
        document.querySelectorAll('.tool-card, .category-card').forEach(card => {
            const cardTags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.trim());
            
            // 检查卡片是否包含所有活动的过滤器标签
            const hasAllTags = filtersArray.every(filter => cardTags.includes(filter));
            
            // 设置显示或隐藏
            card.style.display = hasAllTags ? '' : 'none';
        });
    }
}

/**
 * 重新初始化目录导航
 */
function initTableOfContents() {
    const mainContent = document.querySelector('.main-content');
    const tocContainer = document.querySelector('.table-of-contents .toc-list');
    
    if (!mainContent || !tocContainer) return;
    
    // 清空目录
    tocContainer.innerHTML = '';
    
    // 获取所有标题
    const headings = mainContent.querySelectorAll('h2, h3');
    
    // 为每个标题添加ID并创建目录项
    headings.forEach((heading, index) => {
        // 如果标题没有ID，创建一个
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        // 创建目录项
        const tocItem = document.createElement('li');
        tocItem.className = `toc-item${heading.tagName === 'H3' ? ' sub-item' : ''}`;
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        tocItem.appendChild(link);
        tocContainer.appendChild(tocItem);
    });
    
    // 添加点击目录项滚动到对应位置的事件
    document.querySelectorAll('.toc-item a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log("右侧目录已更新");
}

/**
 * 显示错误消息
 */
function showErrorMessage(message) {
    document.querySelector('.main-content').innerHTML = `
        <div class="content-header">
            <h1>加载失败</h1>
        </div>
        <div class="content-section">
            <div class="note">
                <p><strong>错误：</strong> ${message}</p>
                <p>您可以<a href="javascript:window.location.reload()">刷新页面</a>或返回<a href="wiki.html">教程目录</a>。</p>
            </div>
        </div>
    `;
}

/**
 * 检查当前路径并加载对应内容
 */
function checkCurrentPath() {
    // 获取当前路径
    const currentPath = window.location.pathname;
    console.log("当前路径:", currentPath);
    
    // 如果是在教程子页面
    if (currentPath.includes('/doc/') && !currentPath.endsWith('wiki.html')) {
        // 提取文件名
        const fileName = currentPath.split('/').pop();
        console.log("尝试加载内容:", fileName);
        
        if (fileName) {
            // 查找对应的导航链接
            const navLinks = document.querySelectorAll('.nav-item a');
            let found = false;
            
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref && linkHref.endsWith(fileName)) {
                    console.log("找到匹配链接:", linkHref);
                    // 模拟点击该链接
                    setTimeout(() => link.click(), 100);
                    found = true;
                }
            });
            
            if (!found) {
                console.log("未找到匹配链接，尝试直接加载内容");
                loadContent(fileName, true);
            }
        }
    }
}

/**
 * 修复图片路径问题
 * @param {string} currentPath - 当前页面路径
 */
function fixImagePaths(currentPath) {
    // 获取当前路径的目录部分
    const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    console.log("基础路径:", basePath);
    
    // 修复所有图片路径
    document.querySelectorAll('.main-content img').forEach(img => {
        const originalSrc = img.getAttribute('src');
        console.log("原始图片路径:", originalSrc);
        
        // 如果是相对路径且不是以/或http开头
        if (originalSrc && !originalSrc.startsWith('/') && !originalSrc.startsWith('http')) {
            // 处理不同类型的相对路径
            let newSrc = originalSrc;
            
            // 如果是以images/开头但不是完整路径
            if (originalSrc.includes('images/') && !originalSrc.startsWith('./') && !originalSrc.startsWith('../')) {
                // 连接basePath和src
                newSrc = basePath + originalSrc;
                console.log("修正后的图片路径1:", newSrc);
                img.src = newSrc;
            } 
            // 如果是其他相对路径，尝试解析
            else if (!originalSrc.startsWith(basePath) && !originalSrc.startsWith('./') && !originalSrc.startsWith('../')) {
                newSrc = basePath + originalSrc;
                console.log("修正后的图片路径2:", newSrc);
                img.src = newSrc;
            }
            
            // 尝试加载图片，并在加载失败时尝试其他路径
            img.onerror = function() {
                console.log("图片加载失败:", this.src);
                
                // 尝试其他可能的路径
                if (this.src.includes('/doc/')) {
                    // 如果路径中有/doc/，尝试从doc目录加载
                    const docPath = this.src.substring(this.src.indexOf('/doc/'));
                    this.src = docPath;
                    console.log("尝试新路径1:", this.src);
                } else if (originalSrc.startsWith('images/')) {
                    // 尝试从当前文档的上一级images目录加载
                    this.src = basePath + '../' + originalSrc;
                    console.log("尝试新路径2:", this.src);
                }
                
                // 如果仍然失败，使用占位图像
                this.onerror = function() {
                    console.log("备选路径也加载失败");
                    this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" text-anchor="middle" alignment-baseline="middle" fill="%23999"%3E图片加载失败%3C/text%3E%3C/svg%3E';
                    this.style.border = '1px solid #ddd';
                    this.style.padding = '10px';
                    this.onerror = null; // 防止无限循环
                };
            };
        }
    });
    
    // 修复所有链接中的图片路径
    document.querySelectorAll('.main-content a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('images/') && !href.startsWith('http') && !href.startsWith('/')) {
            if (!href.startsWith(basePath) && !href.startsWith('./') && !href.startsWith('../')) {
                link.href = basePath + href;
                console.log("修正后的链接路径:", link.href);
            }
        }
    });
} 