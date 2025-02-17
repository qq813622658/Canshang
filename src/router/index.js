import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import {
  getToken,
  canTurnTo
} from '@/libs/util'
import config from '@/config'
const {
  homeName
} = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'hash'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else {
    next({
      replace: true,
      name: 'error_401'
    })
  } // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (to.name === 'index') {
    // 页面是首页。不需要进行TOKEN验证
    next() // 跳转
  } else if (to.name === 'investment-results') {
    // 页面是招商成果页。不需要进行TOKEN验证
    next() // 跳转
  } else if (to.name === 'test_page') {
    next() // 跳转
  } else if (to.name === 'construction-results') {
    // 建设成果页。
    next() // 跳转
  } else if (to.name === 'company') {
    // 公司logo页。
    next() // 跳转
  } else if (to.name === 'exponent') {
    // 指标树页面
    next() // 跳转
  } else if (to.name === 'ten-target') {
    // 十大目标
    next() // 跳转
  } else if (to.name === 'company-logo') {
    // 公司LOGO
    next() // 跳转
  }
  // else if (to.name === 'CangshanEconomy') {
  //   // 仓山经济详情
  //   next() // 跳转
  // }
  else if (to.name === 'corporate') {
    // 公司企业信息
    next() // 跳转
  } else if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, user.access, next)
      }).catch(() => {
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
