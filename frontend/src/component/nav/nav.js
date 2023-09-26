export default function renderNav(routes, navContainer, usrObj) {
    routes.forEach(route => {
        if (!route.show) {
            return
        }
        const link = document.createElement("a");
        link.href = route.path;
        link.textContent = route.pathName;
        navContainer.appendChild(link);
    });
}