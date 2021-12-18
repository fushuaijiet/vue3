import { createRouter, createWebHashHistory } from 'vue-router'
import UserSettings from '@/views/detail/detail.vue';
import User from '@/views/user/index.vue';
import UserDay from '@/views/user/user-day.vue';
import UserMonth from '@/views/user/user-month.vue';


import Home from '@/views/home.vue'
// import First from '@/views/first.vue'
import Second from '@/views/second.vue'
import DetailOne from '@/views/detail/detail-one.vue'
import DetailTwo from '@/views/detail/detail-two.vue'


// import UserEmailsSubscriptions from './views/UserEmailsSubscriptions.vue'
// import UserProfile from './views/UserProfile.vue'
// import UserProfilePreview from './views/UserProfilePreview.vue'
const routes = [
  {
    path:'/home',
    alias:'/',
    component:Home,
    meta:{
      title:'首页'
    },
    children:[
      {
        path:'second',
        component:Second,
      }
    ]
  },
  {
    path: '/detail',
    component: UserSettings,
    children:[
      {
        path:'detailOne',
        component:DetailOne,
        meta:{
         title:'引导页1'
        }
      },
        {
        path:'detailTwo',
        component:DetailTwo,
        meta:{
         title:'引导页2'
        }
      },
    ]
  },
  {
    path:'/user',
    component:User,
    children:[
      {
        path:'userday',
        component:UserDay,
        meta:{
         title:'天数信息'
        }
      },
      {
        path:'usermonth',
        component:UserMonth,
        meta:{
         title:'月数信息'
        }
      }
    ]
  }
  
];
export const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
})