// auth0.js

let auth0Client = null;

async function initializeAuth0() {
    if (window.createAuth0Client) { // 确保 createAuth0Client 函数已加载
        console.log("Auth0 library loaded successfully!");
        auth0Client = await createAuth0Client({
            domain: "dev-fny3v3cp2k7jlczw.us.auth0.com",
            client_id: "ChLVFB0oVZzZscQoOVlUY5usHXpBtXzA",
            cacheLocation: 'localstorage',
            useRefreshTokens: true
        });
    } else {
        console.error("Auth0 library not loaded!");
        // 库未加载，处理 403 Forbidden 错误
        handleForbiddenError();
    }
}

function handleForbiddenError() {
    // 可以使用自定义的错误页面，也可以直接重定向到一个错误页面
    window.location.href = './emergency/403Forbidden.html'; // 你可以创建一个 403.html 页面，显示 403 错误消息
}

async function checkAuth() {
    if (!auth0Client) {
        console.error("Auth0 client is not initialized!");
        // 客户端未初始化时，返回 403 Forbidden 错误
        handleForbiddenError();
        return;
    }

    // 处理 Auth0 重定向回调
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) {
        // 未登录时，保存当前 URL 并跳转到 Auth0 登录
        localStorage.setItem('redirectUrl', window.location.href);
        await auth0Client.loginWithRedirect({
            redirect_uri: window.location.origin
        });
    } else {
        // 已登录，获取用户信息
        const user = await auth0Client.getUser();
        document.getElementById("user-info").innerHTML = `欢迎, ${user.name}`;
        
        // 替换用户名
        document.getElementById("profile-username").innerText = user.nickname || user.name || '未命名用户';

        // 登录后跳转回用户之前的页面
        const redirectUrl = localStorage.getItem('redirectUrl');
        if (redirectUrl) {
            window.location.href = redirectUrl;
            localStorage.removeItem('redirectUrl');
        }
    }
}

// 确保在页面加载时初始化 Auth0
initializeAuth0().then(() => {
    checkAuth();
}).catch((error) => {
    console.error("Failed to initialize Auth0: ", error);
    handleForbiddenError();
});

async function logout() {
    if (!auth0Client) {
        console.error("Auth0 client is not initialized!");
        handleForbiddenError();
        return;
    }
    
    auth0Client.logout({
        returnTo: window.location.origin  // 退出后返回主页
    });
}
