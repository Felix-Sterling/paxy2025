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
            const newPage = document.createElement('div');
            newPage.classList.add('page-transition-back-enter');
            document.body.appendChild(newPage);
            
            requestAnimationFrame(() => {
                newPage.classList.add('page-transition-back-enter-active');
            });

            setTimeout(() => {
                window.history.back();
            }, 350);
        });
    }
});