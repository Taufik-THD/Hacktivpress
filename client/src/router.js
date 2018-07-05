import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddArticle from './views/AddArticle.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add',
      name: 'add',
      component: AddArticle
    }
  ]
})
