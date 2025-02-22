import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/Folder.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/a',
    redirect: '/tabs/tab1'
  },
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/playground',
    component: () => import('@/views/Playground.vue')
  },
  {
    path: '/signup',
    component: () => import('@/views/Signup.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/todolist',
    component: () => import('@/views/Todolist.vue')
  },
  {
    path: '/folder',
    component: () => import('@/views/Folder.vue')
  },

  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Signup.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Login.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Todolist.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
