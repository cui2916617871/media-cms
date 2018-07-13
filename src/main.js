// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import LoginPage from './page/login'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import RegisterStep1 from './page/registerpage/index.vue'
import HomePage from './page/home.vue'
// navMenuPage
import ArticlePage from './page/navMenuPage/articleMenu/article'
import ContentPage from './page/navMenuPage/contentMenu/content'
import MaterialPage from './page/navMenuPage/contentMenu/material'
import DataCountPage from './page/navMenuPage/dataMenu/dataCount'
import AccountSetPage from './page/navMenuPage/setMenu/accountSet'
import LoginSetPage from './page/navMenuPage/setMenu/loginSet'
// Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

let router = new VueRouter({
  mode: 'history',

  routes: [{
      path: '/',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegisterStep1
    },
    {
      path: '/index',
      component: HomePage,
      children: [{
          path: 'article',
          component: ArticlePage,
        }, {
          path: 'my-content',
          component: ContentPage,
        },
        {
          path: 'my-material',
          component: MaterialPage,
          name:'rtejds'
        },
        {
          path: 'datacount',
          component: DataCountPage,
        },
        {
          path: 'accountset',
          component: AccountSetPage,
        }, {
          path: 'loginset',
          component: LoginSetPage,
        },
      ]
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
console.log(router)
