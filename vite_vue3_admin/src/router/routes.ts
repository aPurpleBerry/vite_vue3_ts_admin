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
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled'
        }
      }
    ]
  },
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
        path: '/acl/permission',
        component: ()=>import('@/views/acl/permission/index.vue'),
        name: 'Permission', //命名路由
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'List'
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
        path: '/acl/user',
        component: ()=>import('@/views/acl/user/index.vue'),
        name: 'User', //命名路由
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'Avatar',
        }
      },
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
  {
    path: '/404',
    component: ()=>import('@/views/404/index.vue'),
    name: '404', //命名路由
    meta: {
      title: '404',
      hidden: true,
      icon: 'SetUp'
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any', //命名路由
    meta: {
      title: 'any',
      hidden: true,
      icon: 'DataLine'
    }
  }
]