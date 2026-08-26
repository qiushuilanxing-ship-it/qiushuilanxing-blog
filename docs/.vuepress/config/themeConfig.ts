import { VdoingThemeConfig } from "vuepress-theme-vdoing/types";
import nav from '../common/nav';
import sidebar from '../common/sidebar';
import { readEachFileWords } from '../webSiteInfo/readFile';

export default <VdoingThemeConfig>{
    nav,
    // 导航与侧边栏共用一份链接数据，避免目录迁移后出现路径漂移。
    sidebar,
    catalogTitle: '本页目录',
    logo: '/img/avatar.jpg',
    searchPlaceholder: '搜索文章',
    lastUpdated: '最后更新',

    // 保留原博客的沉浸式首页：透明导航、全屏背景、动态文案和下滑箭头。
    indexImg: {
        navColor: 2,
        switchNavColor: true,
        bgTimeColor: false,
        bgTimeColorArray: [
            'transparent',
            'rgba(255, 148, 48, .2)',
            'rgba(0, 0, 0, .3)',
            'rgba(0, 0, 0, .5)',
        ],
        descFade: true,
        desc: [
            '记录 Agent、RAG、MCP 与 Prompt 的工程实践。',
            '让 AI 从技术能力走向真实业务价值。',
            '持续构建可靠、可落地的企业 AI 应用。',
        ],
        descFontSize: '1.4rem',
        descFadeInTime: 85,
        descFadeOutTime: 50,
        descNextTime: 1200,
        bubble: false,
        bubblePosition: 0,
        bubbleNum: 200,
    },

    bodyBgImg: [
        'https://image.atridea.com/banner0.png',
        'https://image.atridea.com/banner1.png',
        'https://image.atridea.com/banner2.png',
        'https://image.atridea.com/banner3.png',
        'https://image.atridea.com/banner4.png',
        'https://image.atridea.com/banner5.png',
        'https://image.atridea.com/banner6.png',
        'https://image.atridea.com/banner7.png',
    ],
    bodyBgImgOpacity: 1.0,
    bodyBgImgInterval: 25,

    blogger: {
        avatar: '/img/avatar.jpg',
        name: 'qiushuilanxing',
        slogan: 'AI工程师 / AI应用开发方向',
    },

    blogInfo: {
        blogCreate: '2026-08-25',
        indexView: true,
        pageView: true,
        readingTime: true,
        eachFileWords: readEachFileWords([''], 300, 160),
        mdFileCountType: 'archives',
        totalWords: 'archives',
        moutedEvent: '.tags-wrapper',
        indexIteration: 2500,
        pageIteration: 2500,
    },

    social: {
        icons: [
            {
                iconClass: 'icon-github',
                title: 'GitHub',
                link: 'https://github.com/qiushuilanxing-ship-it',
            },
            {
                iconClass: 'icon-QQ',
                title: 'QQ：1932439891',
                link: 'https://tool.gljlw.com/qq/?qq=1932439891',
            },
            {
                iconClass: 'icon-youjian',
                title: 'Email',
                link: 'mailto:qiushuilanxing@gmail.com',
            },
        ],
    },

    author: {
        name: 'qiushuilanxing',
        link: 'https://github.com/qiushuilanxing-ship-it',
    },

    footer: {
        createYear: 2026,
        copyrightInfo: 'qiushuilanxing | AI技术博客',
    },

    // 暂未使用私密文章；保留原有能力，但不保留旧站点凭据。
    privatePage: {
        openPrivate: false,
    },
}
