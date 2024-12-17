// 定义相关信息
const loverName = "唐小姐";
const message = "我爱她！超级超级爱她！人生目标搞钱搞钱，去把她娶回家，她当老大我当小弟！嘿嘿 \n\n\t2024.8.15\n\t我的宝宝! 女神大人！😭";

// 构建输出信息
const outputMessage = `\n\t我们的恋爱开始于: 2023年10月04日 \n\n\t我的恋人 ${loverName} \n\t她是一个美丽的娃娃\n\n\t${message}\n\n`;

// 输出到控制台
console.log(outputMessage);

// 移动端卡片创建函数
function createMobileCards() {
    const tables = document.querySelectorAll('table');
    const defaultIcon = 'https://awafuns.cn/background.svg';

    tables.forEach(table => {
        const mobileGrid = document.createElement('div');
        mobileGrid.className = 'mobile-grid';

        // 判断表格类型
        const isRecommendTable = table.closest('section#recommend');
        const isToolsTable = table.closest('#Tools');
        const isAwATable = table.classList.contains('AwA');

        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            if (!row.querySelector('.tool-name')?.textContent.trim()) return;

            const card = document.createElement('div');
            card.className = 'card';

            // 获取基础数据
            const name = row.querySelector('.tool-name')?.textContent.trim() || '';
            const icon = row.querySelector('svg')?.outerHTML || '';
            let price = '';
            let description = '';
            let link = '#';

            // 创建图标元素
            const iconElement = document.createElement('div');
            iconElement.className = 'card-icon';
            if (icon) {
                iconElement.innerHTML = icon;
            } else {
                const imgElement = document.createElement('img');
                imgElement.src = defaultIcon;
                imgElement.alt = name;
                imgElement.onerror = () => {
                    imgElement.style.display = 'none';
                    iconElement.textContent = name.charAt(0).toUpperCase();
                    iconElement.classList.add('text-icon');
                };
                iconElement.appendChild(imgElement);
            }

            // 根据不同机场表格类型处理数据
            if (isAwATable) {
                // 机场表格处理
                price = row.cells[1]?.textContent.trim() || '';
                description = row.cells[2]?.textContent.trim() || '';

                // 获取机场链接
                const linkCell = row.cells[3];
                if (linkCell) {
                    const aLink = linkCell.querySelector('a');
                    if (aLink && aLink.href && !aLink.href.includes('javascript:void(0)')) {
                        link = aLink.href;
                    }
                }
            } else if (isRecommendTable) {
                // 软件推荐表格处理
                description = row.cells[1]?.textContent.trim() || '';
                const officialLink = row.cells[2]?.querySelector('a')?.href || '#';
                const downloadCell = row.cells[3];

                if (downloadCell) {
                    const links = Array.from(downloadCell.querySelectorAll('a'));

                    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                        // iOS设备链接处理
                        const iosLink = links.find(a =>
                            a.href.includes('apps.apple.com') ||
                            a.textContent.includes('App Store (ios)')
                        );
                        link = iosLink?.href || officialLink;
                    } else if (/Android/i.test(navigator.userAgent)) {
                        // Android设备链接处理
                        const androidLink = links.find(a =>
                            a.textContent.includes('Android') ||
                            a.href.includes('apkpure.com')
                        );
                        link = androidLink?.href || officialLink;
                    } else {
                        // Windows设备链接处理
                        const windowsLink = links.find(a =>
                            a.textContent.includes('Windows') &&
                            !a.hasAttribute('onclick')
                        );
                        link = windowsLink?.href || officialLink;
                    }
                }
            } else {
                // 其他表格处理
                link = row.querySelector('a[href^="http"]')?.href || '#';
                description = '点击前往下载';
            }

            // 创建卡片内容
            const fragment = document.createDocumentFragment();
            fragment.appendChild(iconElement);

            const titleDiv = document.createElement('div');
            titleDiv.className = 'card-title';
            titleDiv.textContent = name;
            fragment.appendChild(titleDiv);

            if (price) {
                const priceDiv = document.createElement('div');
                priceDiv.className = 'card-price';
                priceDiv.textContent = price;
                fragment.appendChild(priceDiv);
            }

            const descDiv = document.createElement('div');
            descDiv.className = 'card-description';
            descDiv.textContent = description;
            fragment.appendChild(descDiv);

            card.appendChild(fragment);

            // 添加点击事件
            if (link && link !== '#' && link.startsWith('http')) {
                card.classList.add('clickable');
                card.addEventListener('click', () => {
                    card.classList.add('clicking');
                    setTimeout(() => {
                        try {
                            window.open(link, '_blank', 'noopener,noreferrer');
                        } catch (e) {
                            console.error('Failed to open link:', link);
                            window.location.href = link;
                        }
                        card.classList.remove('clicking');
                    }, 150);
                });
            }

            mobileGrid.appendChild(card);
        });

        // 添加到容器
        const container = table.parentNode.querySelector('.mobile-grid-container');
        if (container) {
            container.innerHTML = '';
            container.style.opacity = '0';
            container.appendChild(mobileGrid);
            requestAnimationFrame(() => {
                container.style.transition = 'opacity 0.3s ease';
                container.style.opacity = '1';
            });
        }
    });
}

// 统一的DOMContentLoaded事件处理
document.addEventListener('DOMContentLoaded', function () {
    // 导航栏相关
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

    navShow.addEventListener('mouseover', function () {
        navShow.classList.add('active');
    });

    navShow.addEventListener('mouseout', function () {
        navShow.classList.remove('active');
    });

    // 移动端处理
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    if (isMobileDevice()) {
        document.addEventListener('click', function (event) {
            if (!navShow.contains(event.target) && event.target !== toggleButton) {
                navShow.classList.remove('active');
            }
        });

        navShow.addEventListener('touchend', function (event) {
            if (!navShow.contains(event.target)) {
                navShow.classList.remove('active');
            }
        });
    } else {
        document.addEventListener('click', function (event) {
            if (!navShow.contains(event.target) && event.target !== toggleButton) {
                navShow.classList.remove('active');
            }
        });
    }

    // 创建移动端卡片
    createMobileCards();

    // 处理显示切换
    function handleDisplayToggle() {
        const isMobile = window.innerWidth <= 930;
        document.querySelectorAll('table').forEach(table => {
            table.style.display = isMobile ? 'none' : 'table';
        });
        document.querySelectorAll('.mobile-grid').forEach(grid => {
            grid.style.display = isMobile ? 'grid' : 'none';
        });
    }

    // 初始化显示
    handleDisplayToggle();

    // 监听窗口大小变化
    window.addEventListener('resize', handleDisplayToggle);
});