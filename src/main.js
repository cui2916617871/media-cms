// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import LoginPage from './page/login'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// Register
import RegisterIndexPage from './page/registerpage/index'
import RegisterStep1 from './page/registerpage/step1'
import RegisterStep2 from './page/registerpage/step2'
import RegisterStep3_1 from './page/registerpage/step3-1'
import RegisterStep3_2 from './page/registerpage/step3-2'
import RegisterStep3_3 from './page/registerpage/step3-3'
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
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

let router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegisterIndexPage,
      redirect: '/register/step1',
      children: [{
          path: 'step1',
          component: RegisterStep1
        },
        {
          path: 'step2',
          component: RegisterStep2
        },
        {
          path: 'step3-1',
          component: RegisterStep3_1
        },
        {
          path: 'step3-2',
          component: RegisterStep3_2
        },
        {
          path: 'step3-3',
          component: RegisterStep3_3
        }
      ]
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
Vue.http.headers.common['sid'] = '3e0c5488951b4071a0b3e7c78843cbe4';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
})
console.log(router)
