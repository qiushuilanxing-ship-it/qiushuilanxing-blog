import { UserPlugins } from 'vuepress/config'

export default <UserPlugins>[
    [
        {
            name: 'custom-plugins',
            globalUIComponents: ['PageInfo'],
        },
    ],
    ['vuepress-plugin-code-copy', true],
    ['fulltext-search'],
    ['reading-progress'],
    [
        'cursor-effects',
        {
            size: 2,
            shape: 'star',
            zIndex: 999999999,
        },
    ],
    [
        'dynamic-title',
        {
            showText: '欢迎回来，继续探索 AI 技术吧！',
            hideText: '稍后见，记得常回来看看！',
            recoverTime: 2000,
        },
    ],
    [
        'sakura',
        {
            num: 20,
            show: true,
            zIndex: -1,
            img: {
                replace: false,
                httpUrl: '',
            },
        },
    ],
]
