export function copyEmail() {
    const email = 'toolstore@awafuns.cn';

    // 创建临时输入框
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);

    // 选择并复制
    tempInput.select();
    document.execCommand('copy');

    // 移除临时输入框
    document.body.removeChild(tempInput);

    // 显示提示
    showCopyNotification();
}

function showCopyNotification() {
    // 创建提示元素
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = '邮箱已复制到剪贴板';

    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(124, 138, 255, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(notification);

    // 显示动画
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);

    // 3秒后消失
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
