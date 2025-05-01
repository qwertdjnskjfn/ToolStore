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
});

/**
 * 侧边栏功能初始化
 */
function initSidebar() {
    // 侧边栏切换
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 点击空白处关闭侧边栏（仅限移动设备）
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            sidebar && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            sidebarToggle.classList.remove('active');
        }
    });
    
    // 分类折叠功能
    const categoryTitles = document.querySelectorAll('.category-title');
    
    categoryTitles.forEach(title => {
        title.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            const navItems = this.nextElementSibling;
            navItems.classList.toggle('collapsed');
        });
    });
    
    // 标记当前页面对应的导航项为活跃状态
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPath || 
            currentPath.endsWith(item.getAttribute('href'))) {
            item.parentElement.classList.add('active');
            
            // 确保包含当前项的分类是展开的
            const parentCategory = item.closest('.nav-items');
            if (parentCategory && parentCategory.previousElementSibling) {
                parentCategory.classList.remove('collapsed');
                parentCategory.previousElementSibling.classList.remove('collapsed');
            }
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
    
    window.addEventListener('scroll', function() {
        let currentHeading = '';
        
        // 找出当前可见的标题
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                currentHeading = heading.id;
            }
        });
        
        // 高亮对应的目录项
        tocItems.forEach(item => {
            const href = item.getAttribute('href').substring(1);
            
            if (href === currentHeading) {
                item.parentElement.classList.add('active');
            } else {
                item.parentElement.classList.remove('active');
            }
        });
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
            });
        }
    });
    
    // 关闭模态框
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
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