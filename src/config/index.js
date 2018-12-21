const routes = {
  home: '/',
}

const navItems = [
  {
    label: 'Home',
    to: routes.home,
    exact: true,
    icon: 'inbox',
  },
  {
    label: 'Starred',
    to: '/starred',
    icon: 'star',
  },
  {
    label: 'Send mail',
    to: '/send-mail',
    icon: 'send',
  },
  {
    label: 'Drafts',
    to: '/drafts',
    icon: 'drafts',
  }
]

const config = {
  routes,
  navItems,
}

export default config
