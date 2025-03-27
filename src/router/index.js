import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/Folderform.vue';

const routes = [
  {
    path: '/a',
    redirect: '/tabs/tab1'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/playground',
    name: 'playground',
    component: () => import('@/views/Playground.vue')
  },
  {
    path: '/folder',
    name: 'folder',
    component: () => import('@/views/Folder.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/todolistform',
    name: 'todolistform',
    component: () => import('@/views/Todolistform.vue')
  },
  {
    path: '/folderform',
    name: 'folderform',
    component: () => import('@/views/Folderform.vue')
  },
  {
    path: '/folder',
    name: 'folder',
    component: () => import('@/views/Folder.vue')
  },
  {
    path: '/reminder',
    name: 'reminder',
    component: () => import('@/views/Reminder.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('@/views/Tasks.vue')
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('@/views/Todo.vue')
  },
  {
    path: '/editprofile',
    name: 'editprofile',
    component: () => import('@/views/Editprofile.vue')
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
        component: () => import('@/views/Todolistform.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check login status

  // Public routes that don't require authentication (e.g., login, signup)
  const publicRoutes = ['login', 'signup']; 

  // Check if the user is trying to access a public route
  if (!isLoggedIn && !publicRoutes.includes(to?.name)) {
    // Redirect to login if the user is not authenticated and trying to access a protected route
    next({ name: 'login' });
  } else if (isLoggedIn && to.name === 'login') {
    // If the user is logged in and trying to access the login page, redirect them to home
    next({ name: 'home' });
  } else {
    // Continue to the requested route
    next();
  }
});

export default router
