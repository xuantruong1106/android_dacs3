import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/tabs/tab1'
  // },
  // {
  //   path: '/tabs/',
  //   component: TabsPage,
  //   children: [
  //     {
  //       path: '',
  //       redirect: '/tabs/tab1'
  //     },
  //     {
  //       path: 'tab1',
  //       component: () => import('@/views/Tab1Page.vue')
  //     },
  //     {
  //       path: 'tab2',
  //       component: () => import('@/views/Tab2Page.vue')
  //     },
  //     {
  //       path: 'tab3',
  //       component: () => import('@/views/Tab3Page.vue')
  //     }
  //   ]
  // }
  {
    path: '',
    name: '',
    component: () => import('../views/LogIn_LogOut_Create-Account/LogIn.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/LogIn_LogOut_Create-Account/LogIn.vue')
  },
  {
    path: '/LognOut',
    name: 'LognOut',
    component: () => import('../views/LogIn_LogOut_Create-Account/LognOut.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/LogIn_LogOut_Create-Account/Register.vue')
  },
  {
    path: '/ForgotPass',
    name: 'ForgotPass',
    component: () => import('../views/LogIn_LogOut_Create-Account/ForgotPass.vue')
  },
  {
    path: '/tab4',
    name: 'tab4',
    component: () => import('@/views/Tab4Page.vue')
  },
   {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        name: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        name: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        name: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'EditProduct/:IDProduct',
        name: 'EditProduct',
        component: () => import('../views/EditProduct.vue')
      },
      {
        path: 'DeleteProduct/:IDProduct',
        name: 'DeleteProduct',
        component: () => import('../views/DeleteProduct.vue')
      },
      {
        path: 'AddProduct',
        component: () => import('@/views/AddProduct.vue')
      },
      {
        path: 'AddOrder',
        component: () => import('@/views/AddOrder.vue')
      },

    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
