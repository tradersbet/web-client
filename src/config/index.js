import apiConfig from './api'

const routes = {
  dashboard: '/',
  game: '/game',
  history: '/history',
  news: '/news',
  signIn: '/sign-in',
  signUp: '/sign-up',
  userRating: '/user-rating',
  referalProgram: '/referal-program',
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

const ip = 'https://cryptoservice24.com'
const api = {
  register: `${ip}/api/register`,
  login: `${ip}/api/login`,
  dashboard: `${ip}/api/dashboard`,
  joinGame: `${ip}/api/joingame`,
  ws: 'ws://192.168.1.112:8080',
  buy: `${ip}/api/transaction`,
  create: `${ip}/api/create-game1x1`,
}

const config = {
  api,
  apiConfig,
  routes,
  navItems,
}

export default config
