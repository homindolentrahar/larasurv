import {createRouter, createWebHistory} from 'vue-router'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import Dashboard from '../views/Dashboard.vue'
import Surveys from '../views/Surveys.vue'
import {useStore} from "../store";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: {requiresAuth: true},
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "/surveys",
        name: "Surveys",
        component: Surveys
      }
    ]
  },
  {
    path: "/auth",
    redirect: "/login",
    component: AuthLayout,
    meta: {isGuest: true},
    name: "Auth",
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login
      },
      {
        path: "/register",
        name: "Register",
        component: Register
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  if (to.meta.requiresAuth && !store.user.token) {
    next({name: 'Login'})
  } else if (store.user.token && to.meta.isGuest) {
    next({name: 'Dashboard'})
  } else {
    next()
  }
})

export default router
