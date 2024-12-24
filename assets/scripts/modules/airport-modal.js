// 导入机场配置
import { airportDetails } from '../configs/config.js';

// 创建机场详情弹窗
function createAirportModal(airportName) {
    const details = airportDetails[airportName];
    if (!details) return;

    const existingModal = document.querySelector('.airport-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'airport-modal';

    const content = `
        <div class="airport-content">
            <button class="close-modal" aria-label="关闭">×</button>
            <div class="airport-header">
                <h3>${airportName}</h3>
                <div class="airport-tags">
                    ${details.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="airport-price">${details.price}</div>
            </div>
            <div class="airport-body">
                <div class="description-section">
                    <div class="section-title">
                        <svg viewBox="0 0 24 24">
                            <path fill="#7c8aff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        详细说明
                    </div>
                    <div class="airport-description">${details.description}</div>
                </div>
                <div class="features-section">
                    <div class="section-title">
                        <svg viewBox="0 0 24 24">
                            <path fill="#7c8aff" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                        </svg>
                        特色功能
                    </div>
                    <div class="features-grid">
                        ${details.features.map(feature => `
                            <div class="feature-item">
                                <div class="feature-header">
                                    <div class="feature-icon">${feature.icon}</div>
                                    <h5>${feature.title}</h5>
                                </div>
                                <p>${feature.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="airport-actions">
                <button class="action-button cancel-button">取消</button>
                <button class="action-button visit-button">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/>
                    </svg>
                    访问官网
                </button>
            </div>
        </div>
    `;

    modal.innerHTML = content;
    document.body.appendChild(modal);

    setTimeout(() => modal.classList.add('active'), 10);

    // 事件处理
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };

    // 关闭按钮事件
    modal.querySelector('.close-modal').addEventListener('click', closeModal);

    // 点击外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // 访问官网按钮事件
    modal.querySelector('.visit-button').addEventListener('click', () => {
        window.open(details.link, '_blank');
    });

    // 取消按钮事件
    modal.querySelector('.cancel-button').addEventListener('click', closeModal);
}

// 添加机场卡片点击事件处理
function initAirportCards() {
    const proxySection = document.querySelector('#proxy');
    if (!proxySection) return;

    const cards = proxySection.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const airportName = card.querySelector('.card-title').textContent;
            createAirportModal(airportName);
        });
    });
}

// 出函数
export { initAirportCards }; 