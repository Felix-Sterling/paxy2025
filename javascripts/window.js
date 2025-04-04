// 封装获取元素的函数，减少重复代码
function getElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`未找到 ID 为 ${id} 的元素`);
        return null;
    }
    return element;
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // 检查 localStorage 是否可用
        if (typeof localStorage !== 'undefined') {
            // 检查是否是第一次使用
            const isFirstUse = localStorage.getItem('isFirstUse') === null;

            if (isFirstUse) {
                // 显示弹窗
                const welcomeModal = getElementById('welcome-modal');
                if (welcomeModal) {
                    welcomeModal.style.display = 'flex';
                }

                const mainContent = getElementById('main-content');
                if (mainContent) {
                    mainContent.style.display = 'none';
                }

                // 不同意并退出按钮
                const disagreeButton = getElementById('disagree-button');
                if (disagreeButton) {
                    disagreeButton.addEventListener('click', function () {
                        // 关闭弹窗并退出页面
                        if (welcomeModal) {
                            welcomeModal.style.display = 'none';
                        }
                        window.close();
                    });
                }

                // 同意并学习如何使用按钮
                const agreeButton = getElementById('agree-button');
                if (agreeButton) {
                    agreeButton.addEventListener('click', function () {
                        try {
                            // 关闭弹窗并显示主内容
                            if (welcomeModal) {
                                welcomeModal.style.display = 'none';
                            }
                            if (mainContent) {
                                mainContent.style.display = 'block';
                            }
                            // 标记为不是第一次使用
                            localStorage.setItem('isFirstUse', 'false');

                            const targetUrl = 'textbook.html';
                            console.log('即将跳转的地址:', targetUrl);
                            window.location.href = targetUrl;
                        } catch (error) {
                            console.error('点击同意按钮跳转时出错:', error);
                        }
                    });
                }
            }
        } else {
            console.error('localStorage 不可用');
        }

        // 处理更新日志项的点击展开/收缩逻辑，使用事件委托优化性能
        const updateLogContainer = document.querySelector('.update-log-container');
        if (updateLogContainer) {
            updateLogContainer.addEventListener('click', function (event) {
                if (event.target.classList.contains('update-log-header')) {
                    const item = event.target.closest('.update-log-item');
                    item.classList.toggle('active');
                }
            });
        }

    } catch (error) {
        console.error('DOMContentLoaded 事件处理过程中出现错误:', error);
    }
});