import renderNav from "./component/nav/nav.js";
import Home from "./component/page/home/home.js"
import Sign_In from "./component/page/sign_in/sign_in.js"
import Sign_Up from "./component/page/sign_up/sign_up.js"
import Create_Post from "./component/page/create_post/create_post.js";
import { Log_out } from "./api/Authorization/auth.js";
import { check_auth } from "./api/Authorization/check_user.js"
import Post_page from "./component/page/post/post.js"
import Chat_Page from "./component/page/chat/chat.js"
import { ws } from "./ws/ws.js"

const socket = ws();

const appDiv = document.getElementById("app");
const navigation = document.getElementById("navigation");

var usrObj = null;
const router = async() => {
    try {
        usrObj = await check_auth();
    } catch (error) {
        console.log(error);
        appDiv.innerHTML = "<h1>Error: " + error.message + "</h1>";
        return;
    }

    const routes = [
        { path: "/", pathName: "Home", show: usrObj !== null, view: Home },
        { path: "/sign_in", pathName: "Sign in", show: usrObj === null, view: Sign_In },
        { path: "/sign_up", pathName: "Sign up", show: usrObj === null, view: Sign_Up },
        { path: "/create_post", pathName: "Create post", show: usrObj !== null, view: Create_Post },
        { path: "/logout", pathName: "Log out", show: usrObj !== null, view: Log_out },
        { path: "/profile", pathName: "username", show: usrObj !== null, view: Log_out },
        { path: "/chat", pathName: "Chat", show: usrObj !== null, view: Chat_Page },
        { path: "/post/", pathName: "Post", show: false, view: Post_page }, // Dynamic route
    ];

    renderNav(routes, navigation, usrObj);

    const defaultRoute = usrObj === null ? routes[1] : null;

    const matchingRoute = routes.find((route) => {
        if (route.path.startsWith('/post/') && window.location.pathname.startsWith('/post/')) {
            const id = window.location.pathname.substring(6);
            return true;
        } else if (route.path === window.location.pathname && route.show) {
            return true;
        }
        return false;
    }) || defaultRoute;
    if (!matchingRoute) {
        appDiv.innerHTML = "<h1>Page not found</h1>";
    } else {
        matchingRoute.view(appDiv, usrObj, socket);
    }

};

socket.addEventListener("open", () => {
    console.log("WebSocket connection established.");
});

window.addEventListener("popstate", router);


document.addEventListener("DOMContentLoaded", async() => {
    document.body.addEventListener("click", function(e) {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            history.pushState(null, null, url)
            router()
        }
    });
    router()
});
socket.onopen = function() {
    socket.send(JSON.stringify({ type: "token", body: "Hello" }))
}