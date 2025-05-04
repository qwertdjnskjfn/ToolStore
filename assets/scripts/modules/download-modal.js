// 下载模态框模块
import { platformIcons, githubIcon, getPlatformName } from './platform-icons.js';
import { downloadLinks, getToolVersion } from '../configs/download-config.js';

// 创建下载模态框
export function createDownloadModal(toolName) {
    const existingModal = document.querySelector('.download-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'download-modal';

    // 获取工具的下载链接
    const normalizedName = toolName.toLowerCase().trim();
    const links = downloadLinks[normalizedName];
    if (!links) return;
    
    // 获取工具版本
    const version = getToolVersion(toolName);

    const content = `
        <div class="download-content">
            <button class="close-modal">×</button>
            <div class="download-header">
                <h3>${toolName} ${version && version !== 'undefined' ? `<span class="tool-version">${version}</span>` : ''}</h3>
                <p>选择下载平台</p>
                <p>若下载失效 可使用免费节点 前往Github下载</p>
            </div>
            <div class="download-grid">
                ${['windows', 'mac', 'linux', 'android', 'ios', 'github'].map(platform => `
                    <div class="download-item ${!links[platform] ? 'disabled' : ''}" 
                         data-platform="${platform}"
                         data-url="${links[platform] || ''}">
                        <div class="download-icon">
                            ${platform === 'github' ? githubIcon : platformIcons[platform]}
                        </div>
                        <div class="download-name">${getPlatformName(platform)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.innerHTML = content;
    document.body.appendChild(modal);

    // 禁用背景滚动
    document.body.style.overflow = 'hidden';

    setTimeout(() => modal.classList.add('active'), 10);

    // 关闭按钮事件
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
        // 恢复背景滚动
        document.body.style.overflow = '';
        setTimeout(() => modal.remove(), 300);
    });

    // 点击外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            // 恢复背景滚动
            document.body.style.overflow = '';
            setTimeout(() => modal.remove(), 300);
        }
    });

    // 修改下载项点击事件
    modal.querySelectorAll('.download-item').forEach(item => {
        if (!item.classList.contains('disabled')) {
            item.addEventListener('click', () => {
                const url = item.dataset.url;
                if (url) {
                    window.open(url, '_blank');
                }
            });
        }
    });
}