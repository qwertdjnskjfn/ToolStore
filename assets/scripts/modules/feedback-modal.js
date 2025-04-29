class FeedbackModal {
    constructor() {
        this.modal = document.createElement('div');
        this.modal.className = 'feedback-modal';
        this.modal.innerHTML = `
      <div class="feedback-content">
        <div class="feedback-header">
          <h3>邮箱反馈（暂时无法使用）</h3>
          <button class="close-feedback">&times;</button>
        </div>
        <form id="feedback-form">
          <div class="form-group">
            <label for="feedback-email" class="required">您的邮箱</label>
            <div class="email-input-container">
              <input type="email" id="feedback-email" required placeholder="请输入邮箱">
              <div class="email-suffix-wrapper">
                <select class="email-suffix-select">
                  <option value="@gmail.com">@gmail.com</option>
                  <option value="@qq.com">@qq.com</option>
                  <option value="@163.com">@163.com</option>
                  <option value="@126.com">@126.com</option>
                  <option value="@outlook.com">@outlook.com</option>
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
        
        // 创建一个隐藏的输入框存储完整邮箱
        const hiddenEmailInput = document.createElement('input');
        hiddenEmailInput.type = 'email';
        hiddenEmailInput.id = 'full-email-hidden';
        hiddenEmailInput.name = 'email';
        hiddenEmailInput.required = true;
        hiddenEmailInput.style.display = 'none';
        
        // 将隐藏输入框添加到表单
        emailForm.appendChild(hiddenEmailInput);
        
        // 移除原始邮箱输入框的email类型和required属性
        emailInput.type = 'text';
        emailInput.removeAttribute('required');
        
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
            
            // 验证所有字段
            const isEmailValid = this.validateField(emailInput, '请输入有效的邮箱地址');
            const isSubjectValid = this.validateField(subjectInput, '请输入标题内容');
            const isMessageValid = this.validateField(messageInput, '请输入反馈内容');
            
            // 如果所有字段都有效，提交表单
            if (isEmailValid && isSubjectValid && isMessageValid) {
                this.handleSubmit(e);
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
    }
    
    handleSubmit(e) {
        e.preventDefault();

        // 获取完整邮箱地址
        const fullEmail = document.getElementById('full-email-hidden').value;
        const subject = document.getElementById('feedback-subject').value;
        const message = document.getElementById('feedback-message').value;

        // 模拟发送邮件
        console.log(`邮件已发送到: toolstore@awafuns.cn\n发件人: ${fullEmail}\n标题: ${subject}\n内容: ${message}`);

        // 隐藏表单，显示成功提示
        this.showSuccessMessage();
    }
    
    // 显示成功提示消息
    showSuccessMessage() {
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
            // 关闭反馈表单
            this.close();
        });
        
        // 自动关闭（3秒后）
        setTimeout(() => {
            if (document.body.contains(successMessage)) {
                document.body.removeChild(successMessage);
                this.close();
            }
        }, 3000);
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
            const hiddenEmail = document.getElementById('full-email-hidden');
            // 验证隐藏的完整邮箱
            const isValid = hiddenEmail.value.length > 0 && 
                            hiddenEmail.value.includes('@') && 
                            field.value.trim().length > 0;
            
            if (!isValid) {
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

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeedbackModal;
} else {
    window.FeedbackModal = FeedbackModal;
}