<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录</title>
    <script src="https://cdn.auth0.com/js/auth0-spa-js/1.24/auth0-spa-js.production.js"></script>
</head>
<body>
    <h2>请先登录</h2>
    <button id="login-btn">登录</button>
    <button id="logout-btn">退出登录</button>

    <script>
        const auth0Domain = "dev-fny3v3cp2k7jlczw.us.auth0.com";  // 你的 Auth0 域名
        const auth0ClientId = "ChLVFB0oVZzZscQoOVlUY5usHXpBtXzA";  // 你的客户端 ID

        async function login() {
            const auth0Client = await createAuth0Client({
                domain: auth0Domain,
                client_id: auth0ClientId,
                redirect_uri: localStorage.getItem('redirectUrl') || window.location.origin
            });
            
            await auth0Client.loginWithRedirect();
        }

        document.getElementById("login-btn").addEventListener("click", login);
        async function handleAuthCallback() {
        const auth0Client = await createAuth0Client({
            domain: auth0Domain,
            client_id: auth0ClientId,
            cacheLocation: 'localstorage'
        });

        if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    handleAuthCallback();
    document.getElementById("logout-btn").addEventListener("click", async () => {
        const auth0Client = await createAuth0Client({
            domain: auth0Domain,
            client_id: auth0ClientId
        });

        auth0Client.logout({
            returnTo: window.location.origin
        });
    });
    </script>

    
</body>
</html>
