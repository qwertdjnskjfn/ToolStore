// 控制台爱心和信息
export class LoveMessage {
    constructor() {
        this.loveArt = `
%c
    永远爱你
`;

        // 基础样式
        this.styles = [
            'color: #ff6b6b;',
            'font-size: 14px;',
            'line-height: 1.2;',
            'font-weight: bold;',
            'text-shadow: 0 0 2px rgba(255,107,107,0.3);',
            'padding: 20px;'
        ].join('');

        // 颜色配置
        this.colors = {
            love: '#ff6b6b',      // 爱心红
            soft: '#ff9f9f',      // 柔和粉
            light: '#ffd3d3',     // 浅粉色
            deep: '#ff8787',      // 深粉色
            pale: '#ffb5b5'       // 淡粉色
        };

        // 消息配置
        this.messages = [
            {
                text: '我们的恋爱开始于: 2023年10月04日',
                style: `
                    color: ${this.colors.love}; 
                    font-size: 20px; 
                    font-weight: bold;
                    text-shadow: 0 0 3px rgba(255,135,135,0.4);
                `
            },
            {
                text: '我的恋人 唐小姐',
                style: `
                    color: ${this.colors.love}; 
                    font-size: 20px; 
                    font-weight: bold;
                    text-shadow: 0 0 3px rgba(255,135,135,0.4);
                `
            },
            {
                text: '她是一个美丽的娃娃',
                style: `
                    color: ${this.colors.love}; 
                    font-size: 20px; 
                    font-style: bold;
                    text-shadow: 0 0 3px rgba(255,135,135,0.4);
                `
            },
            {
                text: '我爱她！超级超级爱她！',
                style: `
                    color: ${this.colors.love}; 
                    font-size: 20px; 
                    font-weight: bold;
                    text-shadow: 0 0 3px rgba(255,135,135,0.4);
                `
            },
            {
                text: '人生目标搞钱搞钱，去把她娶回家，她当老大我当小弟！嘿嘿',
                style: `
                    color: ${this.colors.love}; 
                    font-size: 20px; 
                    font-style: bold;
                    text-shadow: 0 0 3px rgba(255,135,135,0.4);
                `
            },
            {
                text: '2024.8.15',
                style: `
                    color: ${this.colors.love}; 
                    font-size: 20px; 
                    font-weight: bold;
                    text-shadow: 0 0 3px rgba(255,135,135,0.4);
                `
            },
            {
                text: '我的宝宝! 女神大人！😭',
                style: `
                    color: ${this.colors.love}; 
                    font-size: 20px; 
                    font-weight: bold;
                    text-shadow: 0 0 3px rgba(255,135,135,0.4);
                `
            }
        ];
    }

    async show() {
        try {
            // 保存原始的 console.warn
            const originalWarn = console.warn;

            // 临时禁用 console.warn
            console.warn = function () { };

            // 清空控制台并显示内容
            console.clear();
            console.log(this.loveArt, this.styles);

            // 显示标题
            console.log('%c❤ Love Story ❤', `
                color: ${this.colors.love};
                font-size: 20px;
                font-weight: bold;
                text-shadow: 0 0 3px rgba(255,107,107,0.4);
                padding: 10px 0;
                border-bottom: 2px solid ${this.colors.love};
            `);

            // 显示消息
            for (const msg of this.messages) {
                await this.delay(600);
                console.log(`%c${msg.text}`, msg.style);
            }

            // 恢复原始的 console.warn
            console.warn = originalWarn;

        } catch (error) {
            // 静默处理错误
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
} 