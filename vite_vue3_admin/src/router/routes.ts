export const constantRoute = [
  {
    path: '/login',
    component: ()=>import('@/views/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      title: '登录',
      hidden: true,
      icon: 'Avatar'
    }
  },
  { //登陆成功后展示的路由
    path: '/',
    component: ()=>import('@/layout/index.vue'),
    name: '', //命名路由
    meta: {
      title: '',
      hidden: true,
      icon: 'Edit'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: ()=>import('@/views/home/index.vue'),
        name:'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled'
        }
      }
    ]
  },
  { //登陆成功后展示的路由
    path: '/',
    component: ()=>import('@/layout/index.vue'),
    name: '', //命名路由
    meta: {
      title: '',
      hidden: true,
      icon: 'Edit'
    },
    redirect: '/personalcenter',
    children: [
      {
        path: '/personalcenter',
        component: ()=>import('@/views/acl/personalcenter/index.vue'),
        name: 'PersonalCenter', //命名路由
        meta: {
          title: '个人中心',
          hidden: false,
          icon: 'Location',
        }
      },
    ]
  },
  
  {
    path: '/404',
    component: ()=>import('@/views/404/index.vue'),
    name: '404', //命名路由
    meta: {
      title: '404',
      hidden: true,
      icon: 'SetUp'
    },
  }
]


//异步路由
//权限管理、新闻管理、组件
export const asyncRoute = [
  {
    path: '/acl',
    component: ()=>import('@/layout/index.vue'),
    name: 'Acl', //命名路由
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock'
    },
    redirect: '/acl/permission',
    children: [
      {
        path: '/acl/user',
        component: ()=>import('@/views/acl/user/index.vue'),
        name: 'User', //命名路由
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'Avatar',
        }
      },
      {
        path: '/acl/role',
        component: ()=>import('@/views/acl/role/index.vue'),
        name: 'Role', //命名路由
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'HelpFilled',
        }
      },
      {
        path: '/acl/permission',
        component: ()=>import('@/views/acl/permission/index.vue'),
        name: 'Permission', //命名路由
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'List'
        }
      }
    ]
  },
  {
    path: '/news',
    component: ()=>import('@/layout/index.vue'),
    name: 'News',
    meta: {
      title: '新闻管理',
      hidden: false,
      icon: 'Files'
    },
    redirect: '/news/newsadd',
    children: [
      {
        path: '/news/newsadd',
        component: ()=>import('@/views/news-manage/NewsAdd.vue'),
        name: 'NewsAdd', //命名路由
        meta: {
          title: '添加新闻',
          hidden: false,
          icon: 'DocumentAdd',
        }
      },
      {
        path: '/news/newsedit/:id',
        //@ts-ignore
        component: ()=>import('@/views/news-manage/NewsEdit.vue'),
        name: 'NewsEdit', //命名路由
        meta: {
          title: '编辑新闻',
          hidden: false,
          // icon: 'DocumentAdd',
        }
      },
      {
        path: '/news/newslist',
        //@ts-ignore
        component: ()=>import('@/views/news-manage/NewsList.vue'),
        name: 'NewsList', //命名路由
        meta: {
          title: '新闻列表',
          hidden: false,
          icon: 'Tickets',
        }
      }
    ]
  },
  {
    //组件
    path: '/vcomponent',
    component: ()=>import('@/layout/index.vue'),
    name: 'Vcomponent', //命名路由
    meta: {
      title: '组件',
      hidden: false,
      icon: 'Tools'
    },
    redirect: '/vcomponent/vform',
    children: [
      {
        path: '/vcomponent/vform',
        component: ()=>import('@/views/vcomponent/vform/index.vue'),
        name: 'Vform', //命名路由
        meta: {
          title: '表单',
          hidden: false,
          icon: 'Monitor'
        }
      },
      {
        path: '/vcomponent/vicon',
        component: ()=>import('@/views/vcomponent/vicon/index.vue'),
        name: 'Vicon', //命名路由
        meta: {
          title: '图标',
          hidden: false,
          icon: 'Monitor'
        }
      },
      {
        path: '/vcomponent/vlist',
        component: ()=>import('@/views/vcomponent/vlist/index.vue'),
        name: 'Vlist', //命名路由
        meta: {
          title: '列表',
          hidden: false,
          icon: 'Monitor'
        }
      },
      {
        path: '/vcomponent/vtable',
        component: ()=>import('@/views/vcomponent/vtable/index.vue'),
        name: 'Vtable', //命名路由
        meta: {
          title: '表格',
          hidden: false,
          icon: 'Monitor'
        }
      }
    ]
  },
]

export const anyRoute ={
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'any', //命名路由
  meta: {
    title: 'any',
    hidden: true,
    icon: 'DataLine'
  }
}


