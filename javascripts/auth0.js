async function checkAuthStatus() {
  try {
    const user = await guard.getUser();
    const links = document.querySelectorAll('a.icon'); // 选择所有 .icon 的 <a> 标签

    console.log("身份验证状态：", user); // 打印用户信息，查看是否成功获取用户

    // 如果用户没有登录
    if (!user) {
      console.warn("用户未认证，跳转到登录页面...");

      // 禁用所有链接
      links.forEach(link => {
        // 禁用链接
        link.setAttribute('data-href', link.getAttribute('href')); // 保存原始 href
        link.setAttribute('href', '#'); // 设置 href 为 #，避免跳转
        link.classList.add('disabled'); // 添加禁用样式
        link.addEventListener('click', (event) => event.preventDefault()); // 阻止点击事件
      });

      // 保存当前页面的 URL，跳转到登录页面
      localStorage.setItem('redirectUrl', window.location.href);
      await guard.loginWithRedirect(); // 使用 async/await 确保登录过程完成
      return; // 跳转后代码不会继续执行
    }

    // 用户已登录时，恢复所有链接
    links.forEach(link => {
      if (link.hasAttribute('data-href')) {
        link.setAttribute('href', link.getAttribute('data-href')); // 还原 href
        link.removeAttribute('data-href');
      }
      link.classList.remove('disabled'); // 移除禁用样式
      link.removeEventListener('click', (event) => event.preventDefault()); // 恢复点击事件
    });

    // 显示用户信息
    document.getElementById("user-info").innerHTML = `欢迎, ${user.name}`;
    document.getElementById("profile-username").innerText = user.nickname || user.name || '未命名用户';

    // 登录后跳转回指定的页面
    const redirectUrl = localStorage.getItem('redirectUrl');
    if (redirectUrl) {
      window.location.href = redirectUrl;
      localStorage.removeItem('redirectUrl');
    }

  } catch (error) {
    console.error("身份验证出错：", error);
    alert("身份验证出错，请刷新页面或联系管理员");
  }
}
