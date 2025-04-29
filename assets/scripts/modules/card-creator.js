// 卡片创建模块
import { platformIcons, getPlatformName } from './platform-icons.js';
import { downloadLinks } from '../configs/download-config.js';
import { createDownloadModal } from './download-modal.js';

// 获取支持平台的函数
export function getSupportedPlatforms(toolName) {
    const links = downloadLinks[toolName];
    if (!links) return [];
    // 过滤掉 github，因为它是通用的
    return Object.keys(links).filter(platform => platform !== 'github');
}

// 创建卡片函数
export function createCards() {
    const tables = document.querySelectorAll('table');

    tables.forEach(table => {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';

        const isToolsSection = table.closest('.tools-section:first-child');
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            if (!row.querySelector('.tool-name')?.textContent.trim()) return;

            const card = document.createElement('div');
            card.className = 'card';

            // 获取基础数据
            const name = row.querySelector('.tool-name')?.textContent.trim() || '';
            const link = row.querySelector('a[href^="http"]')?.href || '#';

            // 创建图标元素
            const iconElement = document.createElement('div');
            iconElement.className = 'card-icon';

            const imgElement = document.createElement('img');
            const existingImg = row.querySelector('img');
            if (existingImg && existingImg.src) {
                imgElement.src = existingImg.src;
                // 预加载图片以防闪烁
                const preloadImg = new Image();
                preloadImg.src = existingImg.src;
            }
            imgElement.alt = name;
            imgElement.onerror = () => {
                imgElement.src = '';
            };
            iconElement.appendChild(imgElement);

            // 创建卡片内容
            card.appendChild(iconElement);

            const titleDiv = document.createElement('div');
            titleDiv.className = 'card-title';
            titleDiv.textContent = name;
            card.appendChild(titleDiv);

            // 如果是工具客户端区域，添加平台图标
            if (isToolsSection) {
                const platformIconsDiv = document.createElement('div');
                platformIconsDiv.className = 'platform-icons';

                // 获取支持的平台
                const supportedPlatforms = getSupportedPlatforms(name.toLowerCase());

                // 只显示支持的平台图标
                supportedPlatforms.forEach(platform => {
                    const iconWrapper = document.createElement('div');
                    iconWrapper.className = 'platform-icon-wrapper';
                    iconWrapper.innerHTML = platformIcons[platform];
                    iconWrapper.title = getPlatformName(platform);
                    platformIconsDiv.appendChild(iconWrapper);
                });

                card.appendChild(platformIconsDiv);
                // 保存支持的平台信息到卡片数据中
                card.dataset.platforms = supportedPlatforms.join(',');
            }

            // 添加点击事件
            if (link && link !== '#') {
                card.classList.add('clickable');
                addCardClickHandler(card, link);
            }

            gridContainer.appendChild(card);
        });

        // 替换表格
        const container = table.parentNode;
        container.insertBefore(gridContainer, table);
        table.style.display = 'none';
    });
}

// 卡片点击事件处理
export function addCardClickHandler(card, link) {
    card.addEventListener('click', () => {
        const toolName = card.querySelector('.card-title').textContent;
        createDownloadModal(toolName, link);
    });
}