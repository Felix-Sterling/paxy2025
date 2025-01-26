document.addEventListener('DOMContentLoaded', function () {
                const updateLogItems = document.querySelectorAll('.update-log-item');
                updateLogItems.forEach(item => {
                    const header = item.querySelector('.update-log-header');
                    header.addEventListener('click', () => {
                        item.classList.toggle('active');
                    });
                });
    
                const backButton = document.querySelector('.back-button');
                backButton.addEventListener('click', function () {
                    // 这里可以添加具体的返回逻辑，例如返回上一页
                    window.history.back();
                });
            });