/**
 * 文档站功能脚本
 */
document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏功能
    initSidebar();
    
    // 目录导航
    initTableOfContents();
    
    // 图片预览
    initImagePreview();
    
    // 返回顶部按钮
    initBackToTop();
    
    // 滚动监听，高亮当前阅读的部分
    initScrollSpy();
    
    // 移动端菜单处理
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileFeedbackModal = document.getElementById('mobile-feedback-modal');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
    
    // 移动端邮箱反馈功能
    if (mobileFeedbackModal) {
        mobileFeedbackModal.addEventListener('click', function() {
            window.location.href = 'mailto:support@toolstore.com?subject=ToolStore%20反馈';
            mobileMenu.classList.remove('active');
        });
    }
});

/**
 * 侧边栏功能初始化
 */
function initSidebar() {
    // 侧边栏切换
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault(); // 防止事件冒泡
            e.stopPropagation(); // 阻止事件传播
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
            
            // 添加动画效果
            if (sidebar.classList.contains('active')) {
                sidebar.style.transition = 'left 0.3s ease';
            }
        });
    }
    
    // 点击空白处关闭侧边栏（仅限移动设备）
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            sidebar && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            sidebarToggle && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            if (sidebarToggle) sidebarToggle.classList.remove('active');
        }
    });
    
    // 分类折叠功能
    const categoryTitles = document.querySelectorAll('.category-title');
    
    categoryTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            // 阻止事件冒泡，避免点击分类标题时触发其他事件
            e.stopPropagation();
            
            this.classList.toggle('collapsed');
            const navItems = this.nextElementSibling;
            if (navItems) {
                navItems.classList.toggle('collapsed');
                
                // 给分类标题添加点击反馈效果
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                this.appendChild(ripple);
                
                // 延迟移除效果
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
    
    // 标记当前页面对应的导航项为活跃状态
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item a');
    
    // 保存当前活跃的导航项
    let activeNavItem = null;
    
    // 修复链接路径问题
    // 检查当前页面是在doc子目录还是在wiki根目录
    const isInDocDirectory = currentPath.includes('/doc/');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        
        // 修正链接路径
        if (isInDocDirectory && !itemHref.startsWith('http') && !itemHref.startsWith('../') && !itemHref.startsWith('/')) {
            // 如果在doc子目录中，而链接是相对于wiki目录的，则需要调整
            if (!itemHref.startsWith('./') && !itemHref.startsWith('../')) {
                item.setAttribute('href', '../' + itemHref);
            }
        }
        
        // 精确匹配当前路径或者当前路径以链接地址结尾
        if (itemHref === currentPath || 
            currentPath.endsWith(itemHref)) {
            
            // 保存当前项为活跃项
            activeNavItem = item.parentElement;
            
            // 添加活跃类
            activeNavItem.classList.add('active');
            
            // 确保包含当前项的分类是展开的
            const parentCategory = activeNavItem.closest('.nav-items');
            if (parentCategory && parentCategory.previousElementSibling) {
                parentCategory.classList.remove('collapsed');
                parentCategory.previousElementSibling.classList.remove('collapsed');
            }
            
            // 滚动到当前活跃项，确保它在视野中
            setTimeout(() => {
                if (sidebar && activeNavItem) {
                    sidebar.scrollTop = activeNavItem.offsetTop - 100;
                }
            }, 300);
        }
    });
}

/**
 * 目录导航初始化
 */
function initTableOfContents() {
    const mainContent = document.querySelector('.main-content');
    const tocContainer = document.querySelector('.table-of-contents .toc-list');
    
    if (!mainContent || !tocContainer) return;
    
    // 获取所有标题
    const headings = mainContent.querySelectorAll('h2, h3');
    
    // 如果没有标题，隐藏目录
    if (headings.length === 0) {
        const tocElement = document.querySelector('.table-of-contents');
        if (tocElement) {
            tocElement.style.display = 'none';
        }
        return;
    }
    
    // 清空现有目录
    tocContainer.innerHTML = '';
    
    // 为每个标题添加ID
    headings.forEach((heading, index) => {
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
}

/**
 * 滚动监听功能
 */
function initScrollSpy() {
    const headings = document.querySelectorAll('.main-content h2, .main-content h3');
    const tocItems = document.querySelectorAll('.toc-item a');
    
    if (headings.length === 0 || tocItems.length === 0) return;
    
    // 使用 IntersectionObserver 监听标题进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                
                // 高亮对应的目录项
                tocItems.forEach(item => {
                    const href = item.getAttribute('href').substring(1);
                    
                    if (href === currentId) {
                        item.parentElement.classList.add('active');
                    } else {
                        item.parentElement.classList.remove('active');
                    }
                });
            }
        });
    }, { 
        rootMargin: '-80px 0px -80% 0px', // 顶部偏移，确保标题到达顶部才触发
        threshold: 0 
    });
    
    // 观察所有标题
    headings.forEach(heading => {
        observer.observe(heading);
    });
    
    // 点击目录项滚动到对应位置
    tocItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 更新URL，方便分享特定章节
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

/**
 * 图片预览功能初始化
 */
function initImagePreview() {
    // 获取模态框元素
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementById('closeModal');
    
    if (!modal || !modalImg) return;
    
    // 为所有内容区域的图片添加点击事件
    document.querySelectorAll('.content-section img').forEach(img => {
        if (!img.classList.contains('no-preview')) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                captionText.innerHTML = this.alt || '';
                document.body.style.overflow = 'hidden';
                
                // 添加淡入动画
                modalImg.style.opacity = '0';
                setTimeout(() => {
                    modalImg.style.opacity = '1';
                }, 50);
            });
        }
    });
    
    // 关闭模态框
    function closeModal() {
        // 添加淡出动画
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.opacity = '1';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // 点击关闭按钮
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // 点击模态框背景
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    
    // ESC 键关闭
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

/**
 * 返回顶部按钮
 */
function initBackToTop() {
    // 如果已存在按钮，则不重复创建
    if (document.querySelector('.back-to-top')) return;
    
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M8 4.5l6 6H2z"/></svg>';
    document.body.appendChild(backToTopBtn);
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}