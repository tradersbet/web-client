const routes = {
  dashboard: '/',
  game: '/game',
  history: '/history',
  news: '/news',
  signIn: '/sign-in',
  signUp: '/sign-up',
}

const navItems = [
  {
    label: 'Dashboard',
    to: routes.dashboard,
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

const ip = 'http://192.168.1.112:8000'
const api = {
  register: `${ip}/api/register`,
  login: `${ip}/api/login`,
  dashboard: `${ip}/api/dashboard`,
  joinGame: `${ip}/api/joingame`,
  ws: 'ws://192.168.1.112:8080',
  ws2: 'http://192.168.1.112:3000',
  buy: `${ip}/api/transaction`,
  create: `${ip}/api/create-game1x1`,
}

const config = {
  api,
  routes,
  navItems,
}

export default config
