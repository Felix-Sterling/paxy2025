const guard = new GuardFactory.Guard({
  appId: "67961a84f5c2d03466d8f05f", // 替换为你在 Authing 中的 appId
  redirectUri: window.location.origin + "/callback", // 设置回调 URL
  scope: "openid profile email" // 需要的权限
});

// 启动 Authing Guard
guard.start("#authing-guard-container");

// 检查用户的认证状态
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

    if (!user) {
      // 如果用户没有登录，禁用所有按钮
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.disabled = true; // 禁用按钮
      });

      // 保存当前页面的 URL，跳转到登录页面
      localStorage.setItem('redirectUrl', 'https://console.authing.cn/console/get-started/67961a84f5c2d03466d8f05f'); // 使用指定的重定向链接
      guard.loginWithRedirect();
      return; // 跳转后代码不会继续执行
    }

    // 登录成功，启用所有按钮
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.disabled = false; // 启用按钮
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
    alert("身份验证出错，请刷新页面或联系客服");

    // 隐藏“加载中”元素
    const loadingElement = document.getElementById('loading-spinner');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }
}

// 执行身份验证检查
checkAuthStatus().catch((error) => {
  console.error("Failed to check authentication status: ", error);
});
