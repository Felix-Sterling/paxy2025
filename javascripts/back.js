document.addEventListener('DOMContentLoaded', function () {
    const updateLogItems = document.querySelectorAll('.update-log-item');
    updateLogItems.forEach(item => {
        const header = item.querySelector('.update-log-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function (event) {
            event.preventDefault();
            
            // 创建过渡动画层
            const transitionLayer = document.createElement('div');
            transitionLayer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.95);
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 9999;
            `;
            
            document.body.appendChild(transitionLayer);
            
            // 触发过渡动画
            requestAnimationFrame(() => {
                transitionLayer.style.opacity = '1';
            });

            // 返回上一页
            setTimeout(() => {
                window.history.back();
            }, 300);
        });
    }
});
