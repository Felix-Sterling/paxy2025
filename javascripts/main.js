fetch('footer.txt')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-content').innerText = data;
    })
    .catch(error => console.error('Error loading footer:', error));

document.addEventListener('DOMContentLoaded', function() {
    var headers = document.querySelectorAll('.update-log-header');
    headers.forEach(function(header) {
        header.addEventListener('click', function() {
            var item = this.parentElement;
            var content = item.querySelector('.update-log-content');
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                content.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            const isBackButton = this.classList.contains('back-button');
            
            if (href) {
                const newPage = document.createElement('div');
                newPage.classList.add(isBackButton ? 'page-transition-back-enter' : 'page-transition-enter');
                document.body.appendChild(newPage);
                
                requestAnimationFrame(() => {
                    newPage.classList.add(isBackButton ? 'page-transition-back-enter-active' : 'page-transition-enter-active');
                });

                setTimeout(() => {
                    window.location.href = href;
                }, 350);
            }
        });
    });

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            const newPage = document.createElement('div');
            newPage.classList.add('page-transition-return');
            document.body.appendChild(newPage);
            setTimeout(() => {
                newPage.classList.add('page-transition-return-active');
            }, 10);

            setTimeout(() => {
                newPage.remove();
            }, 300); // 与CSS中的transition时间相同
        }
    });

    const loadingScreen = document.getElementById('loading-screen');
    const updateModal = document.getElementById('update-modal');
    const closeModalButton = document.getElementById('update-modal-close');

    // 阶段性加载内容
    const loadingSteps = [
        { text: '加载用户数据', completed: false },
        { text: '加载配置文件', completed: false },
        { text: '加载资源文件', completed: false }
    ];

    const loadingList = document.createElement('ul');
    const loadingContent = document.querySelector('.loading-content');
    loadingContent.appendChild(loadingList);

    loadingSteps.forEach((step, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${step.text}`;
        loadingList.appendChild(listItem);

        setTimeout(() => {
            listItem.classList.add('visible'); // 渐入动画
            setTimeout(() => {
                step.completed = true;
                listItem.classList.add('completed');
                listItem.innerHTML = `<i class="fa-solid fa-check"></i> ${step.text}`;

                // 隐藏加载屏幕
                if (index === loadingSteps.length - 1) {
                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                    }, 500); // 延迟隐藏加载屏幕
                }
            }, 1000); // 每步完成后延迟 1 秒
        }, index * 1000); // 每步间隔 1 秒
    });

    // 关闭更新弹窗并记录状态
    closeModalButton.addEventListener('click', () => {
        updateModal.classList.remove('show');
        updateModal.style.display = 'none';
        localStorage.setItem('updateConfirmed', 'true');
    });

    const pasteAndGoButton = document.getElementById('paste-and-go');
    const processModal = document.getElementById('process-modal');
    const processSteps = document.getElementById('process-steps');

    pasteAndGoButton.addEventListener('click', () => {
        // 显示代码进程弹窗
        processModal.classList.add('show');
        processModal.style.display = 'flex';

        // 模拟代码进程步骤
        const steps = [
            { text: '检测到输入链接：xxxx', completed: false },
            { text: '检测到 studentID：xxxx', completed: false },
            { text: '检查跳转器状态：正常', completed: false },
            { text: '完成！', completed: false }
        ];

        processSteps.innerHTML = ''; // 清空之前的步骤
        steps.forEach((step, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${step.text}`;
            processSteps.appendChild(listItem);

            setTimeout(() => {
                listItem.classList.add('visible'); // 渐入动画
                setTimeout(() => {
                    step.completed = true;
                    listItem.classList.add('completed');
                    listItem.innerHTML = `<i class="fa-solid fa-check"></i> ${step.text}`;

                    // 关闭弹窗
                    if (index === steps.length - 1) {
                        setTimeout(() => {
                            processModal.classList.remove('show');
                            processModal.style.display = 'none';
                        }, 500); // 延迟关闭弹窗
                    }
                }, 1000); // 每步完成后延迟 1 秒
            }, index * 1000); // 每步间隔 1 秒
        });
    });

});
