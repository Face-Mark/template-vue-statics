
export default [
  {
    path: '/userInfo/my01',
    name: 'my01',
    component: () => import(/* webpackChunkName: "userInfo" */ '@/views/userInfo/my01')
  },
  {
    path: '/userInfo/my02',
    name: 'my02',
    component: () => import(/* webpackChunkName: "userInfo" */ '@/views/userInfo/my02')
  }
]
