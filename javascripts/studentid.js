document.addEventListener('DOMContentLoaded', async function () {
    const studentIdInput = document.getElementById('student-id-input');
    const pasteAndGoButton = document.getElementById('paste-and-go');
    const processModal = document.getElementById('process-modal');
    const processModalClose = document.getElementById('process-modal-close');
    const processSpinner = document.getElementById('process-spinner');
    const processSteps = document.getElementById('process-steps');
    const processSubtitle = document.getElementById('process-subtitle');
    const processTimer = document.getElementById('process-timer');

    let timerInterval;
    let elapsedSeconds = 0;

    function startTimer() {
        elapsedSeconds = 0;
        processTimer.textContent = `已用 ${elapsedSeconds} 秒`;
        timerInterval = setInterval(() => {
            elapsedSeconds++;
            processTimer.textContent = `已用 ${elapsedSeconds} 秒`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    async function updateSubtitle(text) {
        processSubtitle.style.opacity = 0;
        await new Promise(resolve => setTimeout(resolve, 200)); // 等待淡出动画完成
        processSubtitle.textContent = text;
        processSubtitle.style.opacity = 1;
    }

    function updateProcessStep(stepElement, text, isSuccess) {
        stepElement.innerHTML = `<i class="fa-solid ${isSuccess ? 'fa-check' : 'fa-times'}"></i> ${text}`;
        stepElement.classList.add('visible', isSuccess ? 'completed' : 'failed');
    }

    async function handlePasteAndGo() {
        processModal.classList.add('show');
        processModal.style.display = 'flex';
        processSteps.innerHTML = ''; // 清空之前的步骤
        await updateSubtitle('准备中...'); // 初始化小标题
        startTimer();

        // 动态添加进程步骤
        const steps = [
            { subtitle: '检查输入内容', text: '正在检查输入内容...', action: async () => {
                const inputValue = studentIdInput.value.trim();
                return inputValue ? { success: true, message: `输入内容合法：${inputValue}` } : { success: false, message: '输入内容为空' };
            }},
            { subtitle: '检测 Student ID', text: '正在检测 Student ID...', action: async () => {
                const input = studentIdInput.value.trim();
                // 处理完整URL的情况
                if (input.includes('student_id-')) {
                    const matches = input.match(/student_id-(\d+)/);
                    const studentId = matches ? matches[1] : null;
                    return studentId ? { success: true, message: `从URL中提取到 Student ID：${studentId}` } : { success: false, message: '未找到有效的 Student ID' };
                }
                // 处理纯数字的情况
                const matches = input.match(/\d+/g);
                const studentId = matches ? matches[0] : null;
                return studentId ? { success: true, message: `检测到 Student ID：${studentId}` } : { success: false, message: '未找到有效的 Student ID' };
            }},
            { subtitle: '初始化', text: '正在初始化...', action: async () => {
                return { success: true, message: '初始化完成' };
            }},
            { subtitle: '跳转中', text: '正在跳转...', action: async () => {
                const input = studentIdInput.value.trim();
                let studentId;
                
                if (input.includes('student_id-')) {
                    const matches = input.match(/student_id-(\d+)/);
                    studentId = matches ? matches[1] : input;
                } else {
                    const matches = input.match(/\d+/g);
                    studentId = matches ? matches[0] : input;
                }
                
                const url = `https://paxy.xiaoaitong.com/mb-device:phone_book/student_id-${studentId}`;
                window.location.href = url;
                return { success: true, message: '跳转完成！' };
            }}
        ];

        for (const step of steps) {
            await updateSubtitle(step.subtitle); // 更新小标题
            const stepElement = document.createElement('li');
            stepElement.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${step.text}`;
            processSteps.appendChild(stepElement);

            await new Promise(resolve => setTimeout(resolve, 500)); // 模拟延迟
            const result = await step.action();
            updateProcessStep(stepElement, result.message, result.success);

            if (!result.success) {
                await updateSubtitle('进程失败');
                stopTimer();
                return; // 终止进程
            }
        }

        await updateSubtitle('进程完成');
        stopTimer();
    }

    pasteAndGoButton.addEventListener('click', handlePasteAndGo);

    processModalClose.addEventListener('click', () => {
        processModal.classList.remove('show');
        processModal.style.display = 'none';
        stopTimer();
    });
});
