async function initializeAuth0() {
    if (window.createAuth0Client) {
        console.log("Auth0 library loaded successfully!");
        try {
            auth0Client = await createAuth0Client({
                domain: "dev-fny3v3cp2k7jlczw.us.auth0.com",
                client_id: "ChLVFB0oVZzZscQoOVlUY5usHXpBtXzA",
                cacheLocation: 'localstorage',
                useRefreshTokens: true
            });
            console.log("Auth0 client initialized successfully!");
        } catch (error) {
            console.error("Failed to initialize Auth0 client:", error);
            alert("初始化身份验证失败，请稍后再试");
            return;
        }
    } else {
        console.error("Auth0 library not loaded!");
        document.body.innerHTML = `<h1>加载 Auth0 库失败，请稍后再试。</h1>`;
        return;
    }

    try {
        // 处理 Auth0 重定向回调
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        const isAuthenticated = await auth0Client.isAuthenticated();
        if (!isAuthenticated) {
            console.warn("User not authenticated, redirecting to login...");
            // 用户未认证，保存当前页面的 URL，跳转到登录界面
            localStorage.setItem('redirectUrl', window.location.href);
            await auth0Client.loginWithRedirect({
                redirect_uri: window.location.origin
            });
            return; // 跳转后，代码不会继续执行
        } else {
            const user = await auth0Client.getUser();
            document.getElementById("user-info").innerHTML = `欢迎, ${user.name}`;
            document.getElementById("profile-username").innerText = user.nickname || user.name || '未命名用户';

            // 登录后跳转回用户之前的页面
            const redirectUrl = localStorage.getItem('redirectUrl');
            if (redirectUrl) {
                window.location.href = redirectUrl;
                localStorage.removeItem('redirectUrl');
            }
        }
    } catch (error) {
        console.error("Authentication process error:", error);
        alert("身份验证出错，请刷新页面或联系客服");
    }
}

// 初始化 Auth0
initializeAuth0().catch((error) => {
    console.error("Failed to initialize Auth0: ", error);
});
