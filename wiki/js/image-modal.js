/**
 * 图片预览模态框功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取模态框元素
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementById('closeModal');
    
    // 为页面中所有图片添加点击事件
    document.querySelectorAll('img').forEach(img => {
        // 排除不需要放大预览的图片
        if (!img.classList.contains('no-modal')) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                openModal(this);
            });
        }
    });
    
    // 打开模态框
    function openModal(img) {
        modal.style.display = 'block';
        modalImg.src = img.src;
        captionText.innerHTML = img.alt || '';
        
        // 禁止背景滚动
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭模态框
    function closeModal() {
        modal.style.display = 'none';
        
        // 恢复背景滚动
        document.body.style.overflow = '';
    }
    
    // 点击关闭按钮
    closeBtn.addEventListener('click', closeModal);
    
    // 点击模态框背景
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // ESC 键关闭
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // 将 openModal 函数暴露给全局作用域，以便其他脚本可以使用
    window.openModal = openModal;
}); 