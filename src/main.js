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
// Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

let router = new VueRouter({
  mode: 'history',

  routes: [
    {
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
      name: '导航一',
      iconCls: 'el-icon-message',//图标样式class
      children: [
          { path: '/main', component: LoginPage, name: '主页', hidden: true },
          { path: '/table', component: LoginPage, name: 'Table' },
          { path: '/form', component: LoginPage, name: 'Form' },
          { path: '/user', component: LoginPage, name: '列表' },
      ]
  },
  {
      path: '/index',
      component: HomePage,
      name: '导航二',
      iconCls: 'fa fa-id-card-o',
      children: [
          { path: '/page4', component: LoginPage, name: '页面4' },
          { path: '/page5', component: LoginPage, name: '页面5' }
      ]
  },
  {
      path: '/index',
      component: HomePage,
      name: '',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
          { path: '/page6', component: LoginPage, name: '导航三' }
      ]
  }  
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
