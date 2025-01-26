async function checkAuthStatus() {
  try {
    // 找到并显示“加载中”元素
    const loadingElement = document.getElementById('loading-spinner');
    if (loadingElement) {
      loadingElement.style.display = 'block'; // 显示加载中
    }

    const user = await guard.getUser();

    // 隐藏“加载中”元素
    if (loadingElement) {
      loadingElement.style.display = 'none'; // 登录完成后隐藏加载中
    }

    const links = document.querySelectorAll('a.icon'); // 选中所有导航链接

    if (!user) {
      // 用户未登录时，禁用所有导航链接
      links.forEach(link => {
        link.setAttribute('data-href', link.getAttribute('href')); // 保存原始 href
        link.removeAttribute('href'); // 移除 href 使其无法跳转
        link.classList.add('disabled'); // 添加禁用样式
      });

      // 保存当前页面的 URL，跳转到登录页面
      localStorage.setItem('redirectUrl', 'https://console.authing.cn/console/get-started/67961a84f5c2d03466d8f05f'); // 使用指定的重定向链接
      guard.loginWithRedirect();
      return; // 跳转后代码不会继续执行
    }

    // 用户已登录时，恢复所有链接
    links.forEach(link => {
      if (link.hasAttribute('data-href')) {
        link.setAttribute('href', link.getAttribute('data-href')); // 还原 href
        link.removeAttribute('data-href');
      }
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

    // 隐藏“加载中”元素
    const loadingElement = document.getElementById('loading-spinner');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }

    // 确保在认证失败时不会弹出错误提示并跳转
    alert("身份验证出错，请刷新页面或联系客服");
  }
}

// 执行身份验证检查
checkAuthStatus().catch((error) => {
  console.error("Failed to check authentication status: ", error);
});
