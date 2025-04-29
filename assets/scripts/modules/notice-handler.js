// 通知处理模块

// 初始化通知处理
export function initNoticeHandler() {
    const dailyNotice = document.getElementById('dailyNotice');
    const canceledMessage = document.getElementById('canceledMessage');
    const warningMessage = document.getElementById('warningMessage');
    const mask = document.getElementById('mask');
    const navLinks = document.getElementById('navLinks');
    const logo = document.querySelector('h1 a');
    const MAX_CANCEL_COUNT = 5;

    // 禁用所有导航和链接
    function disableAllNavigation(disable = true) {
        // 禁用导航链接
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (disable) {
                link.style.opacity = '0.5';
            } else {
                link.style.opacity = '';
            }
        });

        // 禁用卡片点击
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (disable) {
                card.style.opacity = '0.5';
            } else {
                card.style.opacity = '';
            }
        });

        // 禁用 logo 点击
        if (logo) {
            logo.style.opacity = disable ? '0.5' : '';
        }
    }

    // 更新警告消息
    function updateWarningMessage(remainingTries) {
        warningMessage.innerHTML = `警告：再取消 ${remainingTries} 次将无法访问！`;
        warningMessage.style.display = 'flex';
        warningMessage.style.animation = 'none';
        warningMessage.offsetHeight; // 触发重排
        warningMessage.style.animation = 'slideDown 0.3s ease-out';
    }
    

    // 禁用页面滚动和交互
    function disablePageInteraction(disable = true) {
        document.body.style.overflow = disable ? 'hidden' : '';
        const elements = document.querySelectorAll('a, input, select, textarea, .card');
        elements.forEach(el => {
            el.style.pointerEvents = disable ? 'none' : '';
        });
    }

    // 总是显示公告
    dailyNotice.style.display = 'flex';
    mask.style.display = 'block';
    disableAllNavigation(true);
    disablePageInteraction(true);

    // 初始化显示
    dailyNotice.style.display = 'flex';
    mask.style.display = 'block';
    disableAllNavigation(true);
    disablePageInteraction(true);

    // 同意按钮点击事件
    document.querySelector('.acknowledge').addEventListener('click', () => {
        localStorage.setItem('hasAgreedToTerms', 'true');
        localStorage.setItem('lastAgreedDate', new Date().toDateString());
        dailyNotice.style.display = 'none';
        mask.style.display = 'none';
        document.querySelector('header').style.opacity = '1';
        disableAllNavigation(false);
        disablePageInteraction(false);
    });

    // 取消按钮点击事件
    const cancelButton = document.querySelector('.cancel');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            let cancelCount = parseInt(localStorage.getItem('cancelCount') || '0');
            cancelCount++;
            localStorage.setItem('cancelCount', cancelCount.toString());

            const remainingTries = MAX_CANCEL_COUNT - cancelCount;

            if (cancelCount >= MAX_CANCEL_COUNT) {
                dailyNotice.style.display = 'none';
                canceledMessage.style.display = 'flex';
                mask.style.display = 'block';
                disableAllNavigation(true);
                disablePageInteraction(true);
                return;
            }

            // 立即更新并显示警告消息
            updateWarningMessage(remainingTries);
            setTimeout(() => {
                warningMessage.style.display = 'none';
            }, 2000);
        });
    }
}