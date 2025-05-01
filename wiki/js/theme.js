/**
 * 主题切换功能
 */
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initThemeListeners();
});

/**
 * 初始化主题切换功能
 */
function initThemeToggle() {
    const toggleSwitch = document.getElementById('themeToggle');
    if (!toggleSwitch) return;
    
    // 默认使用暗色主题，除非本地存储中有其他设置
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleSwitch.checked = false;
    } else {
        // 默认暗色主题或者跟随系统偏好
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleSwitch.checked = true;
    }
    
    // 立即应用主题样式
    applyThemeStyles(localStorage.getItem('theme') || 'dark');
    
    // 监听切换事件
    toggleSwitch.addEventListener('change', function(e) {
        const newTheme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // 应用主题样式
        applyThemeStyles(newTheme);
    });
}

/**
 * 应用主题相关样式
 * @param {string} theme - 'dark' 或 'light'
 */
function applyThemeStyles(theme) {
    // 确保页面上所有需要主题的元素都能正确适应主题变化
    const body = document.body;
    const isDark = theme === 'dark';
    
    // 移除任何可能存在的临时主题类
    body.classList.remove('theme-transition');
    
    // 添加过渡效果类，然后延迟移除以允许平滑过渡
    body.classList.add('theme-transition');
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 1000);
    
    // 设置页面的meta主题色，这影响移动设备上的浏览器UI
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDark ? '#0f1115' : '#7c8aff');
    }
    
    // 触发自定义事件，以便其他可能需要响应主题变化的脚本可以监听
    const themeChangeEvent = new CustomEvent('themeChanged', { detail: { theme } });
    document.dispatchEvent(themeChangeEvent);
}

/**
 * 初始化与主题相关的其他监听器
 */
function initThemeListeners() {
    // 系统主题偏好变化时自动适应
    if (window.matchMedia) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // 检查是否有用户自定义设置，如果没有则跟随系统
        prefersDarkScheme.addEventListener('change', (e) => {
            // 只有当用户未明确选择主题时才跟随系统
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                
                // 同步切换开关状态
                const toggleSwitch = document.getElementById('themeToggle');
                if (toggleSwitch) {
                    toggleSwitch.checked = e.matches;
                }
                
                // 应用主题样式
                applyThemeStyles(newTheme);
            }
        });
    }
} 