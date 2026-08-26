import nav from './nav'

type NavItem = {
    text: string
    link?: string
    items?: NavItem[]
}

type SidebarGroup = {
    title: string
    collapsable: boolean
    children: string[]
}

const commonPathPrefix = (links: string[]) => {
    if (!links.length) return ''

    const segments = links.map((link) => link.split('/').filter(Boolean))
    const shared: string[] = []
    const shortestLength = Math.min(...segments.map((item) => item.length))

    for (let index = 0; index < shortestLength; index += 1) {
        const segment = segments[0][index]
        if (segments.every((item) => item[index] === segment)) {
            shared.push(segment)
        } else {
            break
        }
    }

    return shared.length ? `/${shared.join('/')}/` : '/'
}

const createSidebar = (items: NavItem[]) => {
    return items.reduce<Record<string, SidebarGroup[]>>((sidebar, item) => {
        if (!item.items || !item.items.length) return sidebar

        const childLinks = item.items
            .map((child) => child.link)
            .filter((link): link is string => Boolean(link))
        const root = commonPathPrefix(childLinks)
        if (root === '/') return sidebar

        sidebar[root] = [
            {
                title: item.text,
                collapsable: true,
                children: [
                    '',
                    ...childLinks.map((link) => link.slice(root.length)),
                ],
            },
        ]
        return sidebar
    }, {})
}

export default createSidebar(nav)
