// .vuepress/enhanceApp.js
export default ({
                    Vue,         // VuePress 正在使用的 Vue 构造函数
                    options,     // 附加到根实例的一些选项
                    router,      // 当前应用的路由实例
                    siteData,    // 站点元数据
                    isServer     // 当前应用配置是处于 服务端渲染 或 客户端
                }) => {
    /**
     * ========= 第一段代码：私密文章验证逻辑 =========
     */
    if (!isServer) {
        // 如果开启了私密文章验证
        if (
            siteData.themeConfig.privatePage &&
            siteData.themeConfig.privatePage.openPrivate
        ) {
            router.beforeEach((to, from, next) => {
                try {
                    let {
                        username,
                        password,
                        loginPath,
                        loginKey,
                        loginSession,
                        loginInfo,
                        firstLogin,
                        firstLoginKey,
                    } = siteData.themeConfig.privatePage;

                    !loginKey && (loginKey = "vdoing_manager"); // 默认为 vdoing_manager
                    !firstLoginKey && (firstLoginKey = "vdoing_first_login"); // 默认为 vdoing_first_login

                    // 网站关闭或者刷新后，清除登录状态
                    if (loginSession) {
                        window.addEventListener("unload", function () {
                            localStorage.removeItem(loginKey);
                            localStorage.removeItem(firstLoginKey);
                        });
                    }

                    // 如果是登录页面，不需要验证
                    if (loginPath == to.path || !loginPath) {
                        throw new Error("无需验证");
                    }

                    // 尝试获取管理员曾经登录的用户信息
                    let globalInfo = JSON.parse(localStorage.getItem(loginKey));
                    // 管理员用户名密码验证
                    if (
                        globalInfo &&
                        globalInfo.username == username &&
                        globalInfo.password == password
                    ) {
                        // 存在曾经登录信息，如果登录状态过期
                        if (new Date() - globalInfo.time > globalInfo.expire) {
                            localStorage.removeItem(loginKey);
                        } else {
                            throw new Error("Success!");
                        }
                    }

                    // 整个网站进入前需要验证
                    let isAgainLogin = true;
                    if (parseInt(firstLogin) == 1 || parseInt(firstLogin) == 2) {
                        parseInt(firstLogin) == 2 && (isAgainLogin = false);
                        // 尝试获取第一次访问网站曾经登录的用户信息
                        let firstLoginInfo = JSON.parse(
                            localStorage.getItem(firstLoginKey)
                        );
                        !firstLoginInfo && jumpToLogin(loginPath, to.path, "first");
                        if (firstLoginInfo) {
                            // 先判断 loginInfo 是否存在，然后判断 loginInfo 是否对象，最后判断 loginInfo 是否有 firstLoginKey
                            if (loginInfo && loginInfo.hasOwnProperty(firstLoginKey)) {
                                // 进行 loginInfo 验证
                                checkLoginInfo(loginInfo[firstLoginKey], firstLoginInfo) &&
                                jumpToLogin(loginPath, to.path, "first");
                            } else {
                                jumpToLogin(loginPath, to.path, "first");
                            }
                        }
                    }
                    if (to.path == "/") {
                        throw new Error("首页不需要验证！");
                    }

                    // 如果 firstLogin 不等于 2
                    if (isAgainLogin) {
                        siteData.pages.forEach((item) => {
                            // 找出带有 private 的文章
                            if (item.path == to.path) {
                                if (
                                    item.frontmatter.private &&
                                    item.frontmatter.private == true
                                ) {
                                    // 网站关闭或者刷新后，清除登录状态
                                    if (loginSession) {
                                        window.addEventListener("unload", function () {
                                            localStorage.removeItem(item.frontmatter.permalink);
                                        });
                                    }
                                    // 尝试获取该私密文章曾经登录的用户信息
                                    let singleInfo = JSON.parse(
                                        localStorage.getItem(item.frontmatter.permalink)
                                    );
                                    // 都不存在登录信息
                                    !singleInfo &&
                                    jumpToLogin(
                                        loginPath,
                                        to.path,
                                        item.frontmatter.loginInfo ||
                                        item.frontmatter.username ||
                                        item.frontmatter.password ||
                                        item.frontmatter.expire
                                            ? "single"
                                            : "all"
                                    );

                                    // 单个文章私密验证
                                    if (
                                        (item.frontmatter.username && item.frontmatter.password) ||
                                        item.frontmatter.loginInfo
                                    ) {
                                        // 不存在登录信息，则跳转到登录页面
                                        !singleInfo && jumpToLogin(loginPath, to.path, "single");
                                        // 存在曾经登录信息，如果登录状态过期
                                        if (new Date() - singleInfo.time > singleInfo.expire) {
                                            localStorage.removeItem(item.frontmatter.permalink);
                                            jumpToLogin(loginPath, to.path, "single");
                                        }
                                        // 是否需要登录
                                        let isLogin = true;
                                        // 对 loginInfo 进行验证
                                        if (Array.isArray(item.frontmatter.loginInfo)) {
                                            isLogin = checkLoginInfo(
                                                item.frontmatter.loginInfo,
                                                singleInfo
                                            );
                                        }
                                        // 如果 loginInfo 不存在，则进行单文章的用户名密码验证
                                        if (
                                            isLogin &&
                                            singleInfo.username !== item.frontmatter.username &&
                                            singleInfo.password !== item.frontmatter.password
                                        ) {
                                            jumpToLogin(loginPath, to.path, "single");
                                        }
                                    } else {
                                        // 全局私密验证
                                        let isLogin = true;
                                        // 先判断 loginInfo 是否存在，然后判断 loginInfo 是否对象，最后判断 loginInfo 是否有该文章的 permalink
                                        if (loginInfo && loginInfo.hasOwnProperty(to.path)) {
                                            isLogin = checkLoginInfo(loginInfo[to.path], singleInfo);
                                        }
                                        // 如果 loginInfo 验证失败
                                        isLogin && jumpToLogin(loginPath, to.path, "all");
                                    }
                                }
                            }
                        });
                    }
                } catch (e) {}
                next();
            });
        }
    }

    // 检查 loginInfo 里的用户名和密码，userInfo 为曾经登录的信息
    // 匹配成功返回 false，失败返回 true
    function checkLoginInfo(loginInfo, userInfo) {
        try {
            loginInfo.forEach((info) => {
                if (
                    userInfo.username == info.username &&
                    userInfo.password == info.password
                ) {
                    // 利用异常机制跳出 forEach 循环
                    throw new Error();
                }
            });
        } catch (error) {
            return false;
        }
        return true;
    }

    // 跳转到登录页面
    function jumpToLogin(loginPath, toPath, verifyMode) {
        router.push({
            path: loginPath,
            query: {
                toPath: toPath,
                verifyMode: verifyMode, // single、all 或 first
            },
        });
        throw new Error("请先登录！");
    }

    /**
     * ========= 第二段代码：文本替换逻辑 =========
     */
    if (typeof window !== "undefined") {
        // 封装文本替换逻辑到一个函数 replaceText
        function replaceText() {
            // 在 Vue 的下一次 DOM 更新后再延时一点点执行
            Vue.nextTick(() => {
                setTimeout(() => {
                    const cate = document.querySelector(".title.iconfont.icon-wenjianjia");
                    if (cate) cate.textContent = "文章分类";

                    const tags = document.querySelector(".title.iconfont.icon-biaoqian1");
                    if (tags) tags.textContent = "文章标签";

                    const el = document.querySelector(".catalogue-title");
                    if (el && el.textContent.includes("目录")) {
                        el.textContent = "本页目录";
                    }

                    const el1 = document.querySelector(".right-menu-title");
                    if (el1 && el1.textContent.includes("目录")) {
                        el1.textContent = "本页目录";
                    }

                    const updated = document.querySelector(".iconfont.icon-bi");
                    if (updated) {
                        updated.textContent = "最近更新";
                    }

                    const more = document.querySelector(".more");
                    if (more) {
                        more.textContent = "更多文章";
                    }

                    const allCate = document.querySelector(".title.iconfont.icon-wenjianjia.router-link-exact-active.router-link-active");
                    if (allCate) {
                        allCate.setAttribute("title", "全部分类");
                    }

                    const modeItems = document.querySelectorAll('.select-box li');

                    // 依次替换成英文
                    const translations = [
                        '跟随系统',
                        '浅色模式',
                        '深色模式',
                        '阅读模式'
                    ];

                    // 遍历替换
                    modeItems.forEach((li, index) => {
                        li.textContent = translations[index];
                    });

                    const foreMoreEls = document.querySelectorAll(
                        ".readmore.iconfont.icon-jiantou-you"
                    );
                    foreMoreEls.forEach((el) => {
                        if (el.textContent.includes("阅读全文")) {
                            el.textContent = "阅读全文";
                        }
                    });
                }, 100); // 延时 100ms 可以酌情调节
            });
        }

        // 页面首次加载完成后执行一次
        router.onReady(() => {
            replaceText();
        });

        // 每次完成路由切换后再执行一次
        router.afterEach(() => {
            replaceText();
        });
    }
};
