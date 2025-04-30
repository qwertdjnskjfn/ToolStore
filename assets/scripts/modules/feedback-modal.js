// 导入反馈发送器
import feedbackSender from './feedback-sender.js';

class FeedbackModal {
    constructor() {
        this.modal = document.createElement('div');
        this.modal.className = 'feedback-modal';
        this.modal.innerHTML = `
      <div class="feedback-content">
        <div class="feedback-header">
          <h3>邮箱反馈</h3>
          <button class="close-feedback">&times;</button>
        </div>
        <form id="feedback-form">
          <div class="form-group">
            <label for="feedback-email" class="required">您的邮箱</label>
            <div class="email-input-container">
              <input type="email" id="feedback-email" required placeholder="请输入邮箱">
              <div class="email-suffix-wrapper">
                <select class="email-suffix-select">
                    <!-- 国际通用邮箱后缀 -->
                    <option value="@gmail.com" selected>@gmail.com</option>
                    <option value="@outlook.com">@outlook.com</option>
                    <option value="@hotmail.com">@hotmail.com</option>

                    <!-- 中国常用邮箱后缀 -->
                    <option value="@qq.com">@qq.com</option>
                    <option value="@163.com">@163.com</option>
                    <option value="@126.com">@126.com</option>
                    <option value="@139.com">@139.com</option>

                    <!-- 国际通用邮箱后缀 -->
                    <option value="@yahoo.com">@yahoo.com</option>
                    <option value="@icloud.com">@icloud.com</option>

                    <!-- 美国常用邮箱后缀 -->
                    <option value="@aol.com">@aol.com</option>
                    <option value="@netzero.net">@netzero.net</option>
                    <option value="@comcast.net">@comcast.net</option>
                    <option value="@verizon.net">@verizon.net</option>

                    <!-- 其他国家和地区 -->
                    <option value="@t-online.de">@t-online.de</option> <!-- 德国 -->
                    <option value="@btinternet.com">@btinternet.com</option> <!-- 英国 -->
                    <option value="@yahoo.co.jp">@yahoo.co.jp</option> <!-- 日本 -->
                    <option value="@candel.co.jp">@candel.co.jp</option> <!-- 日本 -->
                    <option value="@rediffmail.com">@rediffmail.com</option> <!-- 印度 -->
                    <option value="@vsnl.com">@vsnl.com</option> <!-- 印度 -->
                    <option value="@yandex.ru">@yandex.ru</option> <!-- 俄罗斯 -->
                    <option value="@mail.ru">@mail.ru</option> <!-- 俄罗斯 -->
                    <option value="@wannado.fr">@wannado.fr</option> <!-- 法国 -->
                    <option value="@excite.com">@excite.com</option> <!-- 法国 -->
                    <option value="@bigpond.com">@bigpond.com</option> <!-- 澳大利亚 -->
                    <option value="@westnet.com.au">@westnet.com.au</option> <!-- 澳大利亚 -->
                    <option value="@ig.com.br">@ig.com.br</option> <!-- 巴西 -->
                    <option value="@uol.com.br">@uol.com.br</option> <!-- 巴西 -->
                    <option value="@amet.com.ar">@amet.com.ar</option> <!-- 阿根廷 -->
                    <option value="@infovia.com.ar">@infovia.com.ar</option> <!-- 阿根廷 -->
                    <option value="@naver.com">@naver.com</option> <!-- 韩国 -->
                    <option value="@daum.net">@daum.net</option> <!-- 韩国 -->
                    <option value="@emirates.net.ae">@emirates.net.ae</option> <!-- 阿联酋 -->
                    <option value="@zahav.net.il">@zahav.net.il</option> <!-- 以色列 -->
                    <option value="@pacific.net.sg">@pacific.net.sg</option> <!-- 新加坡 -->
                    <option value="@hn.vnn.vn">@hn.vnn.vn</option> <!-- 越南 -->
                </select>
              </div>
            </div>
            <div class="form-error-message">请输入有效的邮箱地址</div>
          </div>
          <div class="form-group">
            <label for="feedback-subject" class="required">标题</label>
            <input type="text" id="feedback-subject" required placeholder="请输入标题">
            <div class="form-error-message">请输入标题内容</div>
          </div>
          <div class="form-group">
            <label for="feedback-message" class="required">内容</label>
            <textarea id="feedback-message" rows="5" required placeholder="请输入内容..."></textarea>
            <div class="form-error-message">请输入反馈内容</div>
          </div>
          <div class="form-required-hint">
            <span>*</span>为必填项
          </div>
          <div class="feedback-actions">
            <button type="button" class="cancel-feedback">取消</button>
            <button type="submit" class="submit-feedback">发送</button>
          </div>
        </form>
      </div>
    `;

        document.body.appendChild(this.modal);

        // 初始状态下隐藏模态框
        this.modal.style.display = 'none';
        // 确保不自动显示
        this.close();

        this.setupEventListeners();
    }

    setupEventListeners() {
        const closeBtn = this.modal.querySelector('.close-feedback');
        const cancelBtn = this.modal.querySelector('.cancel-feedback');

        closeBtn.addEventListener('click', () => this.close());
        cancelBtn.addEventListener('click', () => this.close());

        // 邮箱输入处理
        const emailInput = this.modal.querySelector('#feedback-email');
        const suffixSelect = this.modal.querySelector('.email-suffix-select');
        const suffixWrapper = this.modal.querySelector('.email-suffix-wrapper');
        const emailForm = this.modal.querySelector('#feedback-form');
        const subjectInput = this.modal.querySelector('#feedback-subject');
        const messageInput = this.modal.querySelector('#feedback-message');
        const submitBtn = this.modal.querySelector('.submit-feedback');

        // 创建一个隐藏的输入框存储完整邮箱
        const hiddenEmailInput = document.createElement('input');
        hiddenEmailInput.type = 'hidden';
        hiddenEmailInput.id = 'full-email-hidden';
        hiddenEmailInput.name = 'email';

        // 将隐藏输入框添加到表单
        emailForm.appendChild(hiddenEmailInput);

        // 监听表单提交，确保原始邮箱输入框也有required属性，但类型改为text
        emailInput.type = 'text';
        emailInput.setAttribute('required', 'required');

        // 初始化显示默认后缀
        suffixWrapper.setAttribute('data-suffix', suffixSelect.options[suffixSelect.selectedIndex].text);
        this.updateFullEmail(emailInput, suffixSelect, hiddenEmailInput);

        // 实时验证
        emailInput.addEventListener('input', () => {
            this.updateFullEmail(emailInput, suffixSelect, hiddenEmailInput);
            this.validateField(emailInput, '请输入有效的邮箱地址');
        });

        emailInput.addEventListener('blur', () => {
            this.validateField(emailInput, '请输入有效的邮箱地址');
        });

        subjectInput.addEventListener('input', () => {
            this.validateField(subjectInput, '请输入标题内容');
        });

        subjectInput.addEventListener('blur', () => {
            this.validateField(subjectInput, '请输入标题内容');
        });

        messageInput.addEventListener('input', () => {
            this.validateField(messageInput, '请输入反馈内容');
        });

        messageInput.addEventListener('blur', () => {
            this.validateField(messageInput, '请输入反馈内容');
        });

        // 监听后缀选择变化
        suffixSelect.addEventListener('change', () => {
            // 更新显示的后缀文本
            const selectedOption = suffixSelect.options[suffixSelect.selectedIndex];
            suffixWrapper.setAttribute('data-suffix', selectedOption.text);

            // 从邮箱输入框中移除所有后缀部分
            if (emailInput.value.includes('@')) {
                emailInput.value = emailInput.value.split('@')[0];
            }

            this.updateFullEmail(emailInput, suffixSelect, hiddenEmailInput);
            this.validateField(emailInput, '请输入有效的邮箱地址');
        });

        // 表单提交验证
        emailForm.addEventListener('submit', (e) => {
            // 阻止默认提交行为
            e.preventDefault();

            // 显示加载状态
            this.setLoading(true);

            // 验证所有字段
            const isEmailValid = this.validateField(emailInput, '请输入有效的邮箱地址');
            const isSubjectValid = this.validateField(subjectInput, '请输入标题内容');
            const isMessageValid = this.validateField(messageInput, '请输入反馈内容');

            // 如果所有字段都有效，提交表单
            if (isEmailValid && isSubjectValid && isMessageValid) {
                this.handleSubmit(e);
            } else {
                this.setLoading(false);
            }
        });
    }

    // 更新完整邮箱的方法
    updateFullEmail(emailInput, suffixSelect, hiddenInput) {
        // 从原始输入框获取前缀
        let prefix = emailInput.value;

        // 移除可能存在的后缀部分
        if (prefix.includes('@')) {
            prefix = prefix.split('@')[0];
        }

        // 获取选中的后缀
        const selectedOption = suffixSelect.options[suffixSelect.selectedIndex];

        // 组合完整邮箱地址
        const fullEmail = prefix + selectedOption.value;

        // 更新隐藏输入框
        hiddenInput.value = fullEmail;

        // 实时验证邮箱格式
        this.validateField(emailInput, '请输入有效的邮箱地址');
    }

    // 设置加载状态
    setLoading(isLoading) {
        const submitBtn = this.modal.querySelector('.submit-feedback');
        if (isLoading) {
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
        } else {
            submitBtn.textContent = '发送';
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // 获取表单数据
        const emailInput = document.getElementById('feedback-email');
        const hiddenEmail = document.getElementById('full-email-hidden');
        const fullEmail = hiddenEmail.value; // 从隐藏字段获取完整邮箱
        const subject = document.getElementById('feedback-subject').value;
        const message = document.getElementById('feedback-message').value;

        try {
            // 使用反馈发送器发送邮件
            const result = await feedbackSender.sendFeedback({
                userEmail: fullEmail,
                subject: subject,
                content: message
            });
            
            // 打印日志
            console.log(`邮件发送结果:`, result);
            
            // 根据结果显示成功或失败提示
            if (result.success) {
                // 发送成功，关闭反馈弹窗，防止重复发送
                this.close();
                
                // 清除表单数据
                document.getElementById('feedback-email').value = '';
                document.getElementById('feedback-subject').value = '';
                document.getElementById('feedback-message').value = '';
                
                // 显示成功消息
                this.showSuccessMessage();
            } else {
                // 检查是否为频率限制错误
                if (result.error === 'rate_limit_exceeded') {
                    // 显示频率限制错误，但不关闭窗口以便用户了解情况
                    this.showRateLimitError(result.message);
                } else {
                    // 其他错误，关闭反馈弹窗
                    this.close();
                    
                    // 显示用户友好的错误提示
                    let errorMessage = result.message || '发送失败，请稍后重试';
                    
                    // 针对邮箱错误提供更友好的提示
                    if (errorMessage.includes('reply_to') || 
                        errorMessage.includes('邮箱') || 
                        errorMessage.toLowerCase().includes('email')) {
                        errorMessage = '邮箱格式填写不正确，请检查后重试';
                    }
                    
                    this.showErrorMessage(errorMessage);
                }
            }
        } catch (error) {
            console.error('邮件发送失败:', error);
            // 发送失败也关闭反馈弹窗
            this.close();
            
            // 处理错误提示
            let errorMessage = '发送失败，请稍后重试';
            if (error.message && (
                error.message.includes('reply_to') || 
                error.message.includes('邮箱') || 
                error.message.toLowerCase().includes('email'))) {
                errorMessage = '邮箱格式填写不正确，请检查后重试';
            }
            
            this.showErrorMessage(errorMessage);
        } finally {
            // 无论如何，都要移除加载状态
            this.setLoading(false);
        }
    }
    
    // 显示频率限制错误，在表单内显示
    showRateLimitError(message) {
        // 创建警告元素
        const warningElement = document.createElement('div');
        warningElement.className = 'rate-limit-warning';
        warningElement.innerHTML = `
            <div class="warning-icon">⚠️</div>
            <p>${message}</p>
        `;
        
        // 添加样式
        warningElement.style.backgroundColor = 'rgba(255, 193, 7, 0.1)';
        warningElement.style.border = '1px solid #ffc107';
        warningElement.style.borderRadius = '8px';
        warningElement.style.padding = '10px 15px';
        warningElement.style.marginBottom = '15px';
        warningElement.style.color = '#e6a700';
        warningElement.style.display = 'flex';
        warningElement.style.alignItems = 'center';
        
        // 给图标添加样式
        const warningIcon = warningElement.querySelector('.warning-icon');
        warningIcon.style.marginRight = '10px';
        warningIcon.style.fontSize = '20px';
        
        // 获取表单内容区域
        const formContent = this.modal.querySelector('.feedback-content');
        const form = this.modal.querySelector('#feedback-form');
        
        // 移除可能存在的旧警告
        const oldWarning = formContent.querySelector('.rate-limit-warning');
        if (oldWarning) {
            formContent.removeChild(oldWarning);
        }
        
        // 插入到表单前面
        formContent.insertBefore(warningElement, form);
        
        // 5秒后自动移除
        setTimeout(() => {
            if (formContent.contains(warningElement)) {
                formContent.removeChild(warningElement);
            }
        }, 5000);
    }

    // 显示错误消息
    showErrorMessage(message) {
        // 创建遮罩层
        this.createBackdrop();
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'feedback-error-message';
        errorMessage.innerHTML = `
            <div class="feedback-error-icon"></div>
            <h3 class="feedback-error-title">发送失败</h3>
            <p class="feedback-error-text">${message}</p>
            <button class="feedback-error-button">确定</button>
        `;

        // 添加到页面
        document.body.appendChild(errorMessage);

        // 处理确定按钮点击事件
        const confirmButton = errorMessage.querySelector('.feedback-error-button');
        confirmButton.addEventListener('click', () => {
            // 移除错误提示
            document.body.removeChild(errorMessage);
            // 移除遮罩层
            this.removeBackdrop();
        });

        // 自动关闭（5秒后）
        setTimeout(() => {
            if (document.body.contains(errorMessage)) {
                document.body.removeChild(errorMessage);
                // 移除遮罩层
                this.removeBackdrop();
            }
        }, 5000);
    }

    // 显示成功提示消息
    showSuccessMessage() {
        // 创建遮罩层
        this.createBackdrop();
        
        // 创建成功提示元素
        const successMessage = document.createElement('div');
        successMessage.className = 'feedback-success-message';
        successMessage.innerHTML = `
            <div class="feedback-success-icon"></div>
            <h3 class="feedback-success-title">发送成功</h3>
            <p class="feedback-success-text">感谢您的反馈，我们将尽快处理您的意见！</p>
            <button class="feedback-success-button">确定</button>
        `;

        // 添加到页面
        document.body.appendChild(successMessage);

        // 处理确定按钮点击事件
        const confirmButton = successMessage.querySelector('.feedback-success-button');
        confirmButton.addEventListener('click', () => {
            // 移除成功提示
            document.body.removeChild(successMessage);
            // 移除遮罩层
            this.removeBackdrop();
            // 不需要再次关闭反馈弹窗，因为在handleSubmit方法中已经关闭了
        });

        // 自动关闭（5秒后，与失败提示时间一致）
        setTimeout(() => {
            if (document.body.contains(successMessage)) {
                document.body.removeChild(successMessage);
                // 移除遮罩层
                this.removeBackdrop();
                // 不需要再次关闭反馈弹窗，因为在handleSubmit方法中已经关闭了
            }
        }, 5000);
    }
    
    // 创建背景遮罩层
    createBackdrop() {
        // 检查是否已存在遮罩层
        let backdrop = document.querySelector('.modal-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop';
            document.body.appendChild(backdrop);
        }
        
        // 显示遮罩层
        backdrop.style.display = 'block';
        
        // 禁用页面滚动
        document.body.style.overflow = 'hidden';
        
        // 强制回流后添加显示类
        setTimeout(() => {
            backdrop.classList.add('show');
        }, 10);
        
        return backdrop;
    }
    
    // 移除背景遮罩层
    removeBackdrop() {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            // 移除显示类，触发淡出效果
            backdrop.classList.remove('show');
            
            // 恢复页面滚动
            document.body.style.overflow = '';
            
            // 完全移除元素
            setTimeout(() => {
                if (document.body.contains(backdrop)) {
                    document.body.removeChild(backdrop);
                }
            }, 300);
        }
    }

    open() {
        this.modal.style.display = 'flex';
        this.modal.style.justifyContent = 'center';
        this.modal.style.alignItems = 'center';
    }

    close() {
        this.modal.style.display = 'none';
    }

    // 字段验证方法
    validateField(field, errorMessage) {
        // 获取字段所在的表单组
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error-message');

        // 邮箱特殊处理
        if (field.id === 'feedback-email') {
            // 获取完整邮箱（包含后缀）
            const hiddenEmail = document.getElementById('full-email-hidden');
            const fullEmail = hiddenEmail ? hiddenEmail.value : field.value;

            // 检查邮箱是否为空
            if (!field.value.trim().length) {
                formGroup.classList.add('has-error');
                formGroup.classList.remove('has-success');
                errorElement.textContent = '请输入邮箱地址';
                return false;
            }

            // 检查完整邮箱格式
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidFormat = emailRegex.test(fullEmail);

            if (!isValidFormat) {
                formGroup.classList.add('has-error');
                formGroup.classList.remove('has-success');
                errorElement.textContent = '邮箱格式不正确，请检查';
                return false;
            }

            // 邮箱格式正确
            formGroup.classList.remove('has-error');
            formGroup.classList.add('has-success');
            return true;
        }
        // 常规字段验证
        else {
            if (!field.value.trim()) {
                formGroup.classList.add('has-error');
                formGroup.classList.remove('has-success');
                errorElement.textContent = errorMessage;
                return false;
            } else {
                formGroup.classList.remove('has-error');
                formGroup.classList.add('has-success');
                return true;
            }
        }
    }
}

// 创建并导出反馈表单的单例实例
const feedbackModal = new FeedbackModal();
export default feedbackModal;