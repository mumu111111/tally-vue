import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import EdiitLabel from '@/views/EdiitLabel.vue';
import Bill from '@/views/Bill.vue';
import OutLabel from '@/views/OutLabel.vue';



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/bill'
  },
  {
    path: '/bill',
    component: Bill
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/labels/edit/:id',
    component: EdiitLabel
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/outlabel',
    component: OutLabel
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
