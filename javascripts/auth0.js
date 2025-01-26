async function checkAuthStatus() {
  try {
    const user = await guard.getUser();
    const links = document.querySelectorAll('a.icon'); // 选择所有 .icon 的 <a> 标签

    // 如果用户没有登录
    if (!user) {
      console.warn("User not authenticated, redirecting to login...");
      
      // 禁用所有链接
      links.forEach(link => {
        link.setAttribute('data-href', link.getAttribute('href')); // 保存原始 href
        link.removeAttribute('href'); // 移除 href 使其无法跳转
        link.style.pointerEvents = 'none'; // 禁用点击事件
        link.classList.add('disabled'); // 添加禁用样式
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
      link.style.pointerEvents = ''; // 恢复点击事件
      link.classList.remove('disabled'); // 移除禁用样式
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
    console.error("Authentication process error:", error);
    alert("身份验证出错，请刷新页面或联系管理员");
  }
}

// 执行身份验证检查
checkAuthStatus().catch((error) => {
  console.error("Failed to check authentication status: ", error);
});
