// 获取所有导航链接
const navLinks = document.querySelectorAll('nav ul li a');

// 获取所有内容区
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    // 移除所有链接的激活状态
    navLinks.forEach(link => {
        link.style.color = '';
        link.style.borderBottom = '';
    });

    // 计算每个内容区的顶部位置
    let topPositions = [];
    sections.forEach(section => {
        topPositions.push(section.offsetTop);
    });

    // 确定哪个内容区在视口内
    let activeIndex = -1;
    let scrollTop = window.scrollY || window.pageYOffset;
    for (let i = 0; i < topPositions.length; i++) {
        if (scrollTop >= topPositions[i]) {
            activeIndex = i;
        } else {
            break;
        }
    }
}

// 初始化
if (location.hash) {
    window.dispatchEvent(new Event('hashchange'));
}

// 添加滚动事件监听器
window.addEventListener('scroll', highlightActiveSection);

// 页面加载时初始化
highlightActiveSection();

document.addEventListener("DOMContentLoaded", function () {
    const notice = document.getElementById('dailyNotice');
    const acknowledgeButton = notice.querySelector('.acknowledge');
    const cancelButton = notice.querySelector('.cancel');
    const canceledMessage = document.getElementById('canceledMessage');
    const warningMessage = document.getElementById('warningMessage');
    const mask = document.getElementById('mask'); // 遮罩层
    // 获取返回顶部按钮
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    let cancelCount = parseInt(localStorage.getItem('cancelCount')) || 0;
    let hasAgreed = localStorage.getItem('hasAgreed') === 'true';
    const startDate = new Date('2023-10-04'); // 修改为你想要的开始日期

    function calculateLovedays() {
        const now = new Date(); // 当前时间已经是北京时间
        const diff = now - startDate;
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1; // 加上开始的那一天
        const totalHours = Math.floor(diff / (1000 * 60 * 60)) + 24; // 加上开始的那一天的24小时
        const currentHour = now.getHours(); // 获取当前小时数
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return {
            years: years,
            months: months,
            days: days,
            totalDays: totalDays,
            totalHours: totalHours,
            currentHour: currentHour,
            minutes: minutes,
            seconds: seconds
        };
    }

    function printLovedays() {
        const lovedays = calculateLovedays();

        // 格式化输出
        const formattedYearsMonthsDays = `相爱 ${lovedays.years} 年 ${lovedays.months} 月 ${lovedays.days} 日  当前时间:${lovedays.currentHour}:${lovedays.minutes}:${lovedays.seconds}`;
        const formattedTotalDays = `相爱共 ${lovedays.totalDays} 天`;
        const formattedTotalHours = `共 ${lovedays.totalHours} 小时`;

        console.log(formattedYearsMonthsDays);
        console.log(formattedTotalDays);
        console.log(formattedTotalHours);
        console.log('每30秒显示一次时间')
    }

    // 初始输出
    printLovedays();

    // 每隔一秒更新并输出
    setInterval(printLovedays, 30000);

    function toggleScrollToTopButton() {
        if (window.pageYOffset > 100) { // 当滚动超过 100px 时显示按钮
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }

    // 添加滚动事件监听器来显示/隐藏返回顶部按钮
    window.addEventListener('scroll', toggleScrollToTopButton);

    // 当点击按钮时滚动到页面顶部
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 页面加载时初始化返回顶部按钮的状态
    toggleScrollToTopButton();

    function showDailyNotice() {
        if (!hasAgreed && (isTwelveHoursPassed() || cancelCount < 5)) {
            notice.style.display = 'block';
            mask.style.display = 'block'; // 显示遮罩层
        }
    }

    function hideNotice() {
        notice.style.display = 'none';
        mask.style.display = 'none'; // 隐藏遮罩层
    }


    function storeLastShownTime() {
        localStorage.setItem('lastShownTime', new Date().getTime());
    }

    function getLastShownTime() {
        return localStorage.getItem('lastShownTime');
    }

    function isTwelveHoursPassed() {
        const lastShownTime = getLastShownTime();
        if (!lastShownTime) {
            return true;
        }
        const currentTime = new Date().getTime();
        const twelveHoursInMs = 12 * 60 * 60 * 1000;
        return (currentTime - lastShownTime) > twelveHoursInMs;
    }

    function showCancelMessage() {
        // 清空整个 body 的内容
        document.body.innerHTML = '';
        // 添加新的内容
        document.body.appendChild(canceledMessage);
        canceledMessage.style.display = 'block';
    }

    function incrementCancelCount() {
        cancelCount++;
        localStorage.setItem('cancelCount', cancelCount);
    }

    function showWarning() {
        warningMessage.style.display = 'block';
        setTimeout(() => {
            warningMessage.style.display = 'none';
        }, 1200);
    }

    if (!hasAgreed && (isTwelveHoursPassed() || cancelCount < 5)) {
        showDailyNotice();
        storeLastShownTime();
    }

    acknowledgeButton.addEventListener('click', function () {
        hideNotice();
        localStorage.setItem('hasAgreed', 'true'); // 用户已同意
    });

    cancelButton.addEventListener('click', function () {
        showWarning();
        incrementCancelCount();
        if (cancelCount >= 5) {
            showCancelMessage();
            localStorage.removeItem('cancelCount'); // 清除取消次数
            localStorage.setItem('hasAgreed', 'false'); // 用户不同意
        }
    });
});

// 定义相关信息
const loverName = "唐小姐";
const message = "我爱她！超级超级爱她！人生目标搞钱搞钱，去把她娶回家，她当老大我当小弟！嘿嘿 \n\n\t2024.8.15\n\t我的宝宝! 女神大人！😭";

// 构建输出信息
const outputMessage = `\n\t我们的恋爱开始于: 2023年10月04日 \n\n\t我的恋人 ${loverName} \n\t她是一个美丽的娃娃\n\n\t${message}\n\n`;

// 输出到控制台
console.log(outputMessage);

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');
    const navShow = document.getElementById('navLinks');
    const links = navShow.querySelectorAll('a');

    toggleButton.addEventListener('click', function () {
        navShow.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', function () {
            navShow.classList.remove('active');
        });
    });

    // 为导航栏本身添加鼠标悬停事件监听器
    navShow.addEventListener('mouseover', function () {
        navShow.classList.add('active');
    });

    navShow.addEventListener('mouseout', function () {
        navShow.classList.remove('active');
    });

    // 检测设备类型
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    // 为文档添加点击事件监听器，点击空白处隐藏导航栏
    if (isMobileDevice()) {
        document.addEventListener('click', function (event) {
            if (!navShow.contains(event.target) && event.target !== toggleButton) {
                navShow.classList.remove('active');
            }
        });

        // 为导航栏添加触摸事件监听器，处理移动端触摸移出
        navShow.addEventListener('touchend', function (event) {
            if (!navShow.contains(event.target)) {
                navShow.classList.remove('active');
            }
        });
    } else {
        // 为PC端添加点击事件监听器，点击空白处隐藏导航栏
        document.addEventListener('click', function (event) {
            if (!navShow.contains(event.target) && event.target !== toggleButton) {
                navShow.classList.remove('active');
            }
        });
    }
});