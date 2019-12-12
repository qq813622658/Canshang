import Main from "@/components/main";
import parentView from "@/components/parent-view";

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
  path: "/index",
  name: "index",
  meta: {
    title: "首页",
    hideInMenu: true
  },
  component: () => import("@/view/index/index.vue")
},
{
  path: "/investment-results",
  name: "investment-results",
  meta: {
    title: "招商成果",
    hideInMenu: true
  },
  component: () => import("@/view/investment-results/investment-results")
},
{
  path: "/construction-results",
  name: "construction-results",
  meta: {
    title: "建设成果",
    hideInMenu: true
  },
  component: () => import("@/view/construction-results/construction-results")
},
{
  path: "/company",
  name: "company",
  meta: {
    title: "龙头企业汇总表",
    hideInMenu: true
  },
  component: () => import("@/view/company/company")
},
  {
    path: "/corporate",
    name: "corporate",
    meta: {
      title: "公司企业信息",
      hideInMenu: true
    },
    component: () => import("@/view/corporate/corporate")
  },
{
  path: "/company-logo",
  name: "company-logo",
  meta: {
    title: "各大公司logO",
    hideInMenu: true
  },
  component: () => import("@/view/company-logo/company-logo")
},
// {
//   path: "/CangshanEconomy",
//   name: "CangshanEconomy",
//   meta: {
//     title: "仓山经济详情",
//     hideInMenu: true
//   },
//   component: () => import("@/view/CangshanEconomy/CangshanEconomy")
// },
{
  path: "/exponent",
  name: "exponent",
  meta: {
    title: "指标树",
    hideInMenu: true
  },
  component: () => import("@/view/exponent/exponent")
},
{
  path: "/ten-target",
  name: "ten-target",
  meta: {
    title: "十大目标",
    hideInMenu: true
  },
  component: () => import("@/view/ten-target/ten-target")
},
{
  path: "/login",
  name: "login",
  meta: {
    title: "Login - 登录",
    hideInMenu: true
  },
  component: () => import("@/view/login/login.vue")
},
{
  path: "/",
  name: "_home",
  redirect: "/home",
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true
  },
  children: [{
    path: "/home",
    name: "home",
    meta: {
      hideInMenu: true,
      title: "首页",
      notCache: true,
      icon: "md-home"
    },
    component: () => import("@/view/user-management/user-department/user-department.vue")
  }]
},
{
  path: "/user-management",
  name: "user_mangement",
  component: Main,
  meta: {
    title: "系统管理",
    icon: "md-person-add",
    access: ["10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.8"]
  },
  children: [{
    path: "/unit-classification",
    name: "unit_classification",
    meta: {
      icon: "ios-construct",
      title: "单位分类",
      // access: ["10.1"],
      access: ["hide"],
    },
    component: () =>
          import("@/view/user-management/unit-classification/unit-classification")
  }, {
    path: "/user-department",
    name: "user_department",
    meta: {
      icon: "ios-construct",
      title: "单位管理",
      // access: ["10.2"]
      access: ["hide"]
    },
    component: () =>
          import("@/view/user-management/user-department/user-department.vue")
  }, {
    path: "/user-account",
    name: "user_account",
    meta: {
      icon: "md-person-add",
      title: "用户管理",
      access: ["10.3"]
    },
    component: () =>
          import("@/view/user-management/user-account/user-account.vue")
  },
  {
    path: "/user-role",
    name: "user_role",
    meta: {
      icon: "md-person-add",
      title: "角色管理",
      // access: ["10.4"]
      access : ['hide']
    },
    component: () =>
          import("@/view/user-management/user-role/user-role.vue")
  },
  {
    path: "/user-diyset",
    name: "user_diyset",
    meta: {
      icon: "md-person-add",
      title: "自定义设置",
      // access: ["10.5"],
      access: ["hide"],
    },
    component: () =>
          import("@/view/user-management/user-diyset/user-diyset.vue")
  },
  {
    path: "/rights-management",
    name: "rights_management",
    meta: {
      icon: "ios-construct",
      title: "权限管理",
      access: ["hide"]
    },
    component: () =>
          import("@/view/user-management/rights-management/rights-management.vue")
  }
  ]
},
  {
    path: "/user-management",
    name: "project_mangement",
    component: Main,
    meta: {
      title: "项目管理",
      icon: "md-person-add",
      access: ["10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.8"]
    },
    children: [ {
      path: "/build-result",
      name: "build_result",
      meta: {
        icon: "ios-construct",
        title: "建设成果",
        access: ["10.2"]
      },
      component: () =>
        import("@/view/user-management/user-department/user-department.vue")
    }, {
      path: "/investment-result",
      name: "investment_result",
      meta: {
        icon: "md-person-add",
        title: "招商成果",
        access: ["10.3"]
      },
      component: () =>
        import("@/view/user-management/user-investment/investment.vue")
    }
    ]
  },
  {
    path: "/business-management",
    name: "business_management",
    component: Main,
    meta: {
      title: "企业管理",
      icon: "md-person-add",
      access: ["10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.8"]
    },
    children: [ {
      path: "/nterprise-result",
      name: "enterprise_result",
      meta: {
        icon: "md-person-add",
        title: "纳统企业库",
        access: ["10.3"]
      },
      component: () =>
        import("@/view/business-management/user-enterprise/enterprise_result.vue")
    },{
      path: "/user-leading",
      name: "user_leading",
      meta: {
        icon: "md-person-add",
        title: "龙头企业汇总",
        access: ["10.3"]
      },
      component: () =>
        import("@/view/business-management/user-leading/user-leading.vue")
    },
      {
        path: "/classification",
        name: "classification",
        meta: {
          icon: "md-person-add",
          title: "龙头企业汇总",
          access: ["10.3"]
        },
        component: () =>
          import("@/view/business-management/classification/classification.vue")
      },
    ]
  },

  {
    path: "/park-management",
    name: "park_management",
    component: Main,
    meta: {
      title: "园区管理",
      icon: "md-person-add",
      access: ["10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.8"]
    },
    children: [ {
      path: "/Jinshan-park",
      name: "Jinshan_park",
      meta: {
        icon: "md-person-add",
        title: "金山工业园区",
        access: ["10.3"]
      },
      component: () =>
        import("@/view/park-management/Jinshan-park/Jinshan-park.vue")
    },{
      path: "/new-park",
      name: "new_park",
      meta: {
        icon: "md-person-add",
        title: "新区工业区",
        access: ["10.3"]
      },
      component: () =>
        import("@/view/park-management/new-park/new-park.vue")
    },{
      path: "/OrangePark",
      name: "Orange_Park",
      meta: {
        icon: "md-person-add",
        title: "橘园工业区",
        access: ["10.3"]
      },
      component: () =>
        import("@/view/park-management/OrangePark/OrangePark.vue")
    },
    ]
  },



  {
    path: "/monitor",
    name: "monitor",
    component: Main,
    meta: {
      title: "智能产业监测管理",
      icon: "md-person-add",
      access: ["10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.8"]
    },
    children: [ {
      path: "/user-monitor",
      name: "user_monitor",
      meta: {
        icon: "md-person-add",
        title: "智能产业监测平台",
        access: ["10.3"]
      },
      component: () =>
        import("@/view/monitor/user-monitor/user-monitor.vue")
    },
      {
        path: "/industry-management",
        name: "industry_management",
        meta: {
          icon: "md-person-add",
          title: "智能产业制造",
          access: ["10.3"]
        },
        component: () =>
          import("@/view/monitor/industry-management/industry-management.vue")
      }
    ]
  },
  {
    path: "/investment-policy",
    name: "investment_policy",
    component: Main,
    meta: {
      title: "招商政策管理",
      icon: "md-person-add",
      access: ["10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.8"]
    },
    children: [
      {
        path: "/user-policy",
        name: "user_policy",
        meta: {
          icon: "md-person-add",
          title: "智能产业制造",
          access: ["10.3"]
          // access : ['hide']
        },
        component: () =>
          import("@/view/investment-policy/user-policy/user-policy.vue")
      }, {
        path: "/District-Intelligen",
        name: "District_Intelligen",
        meta: {
          icon: "md-person-add",
          title: "仓山区智能产业规模",
          access: ["10.3"]
          // access : ['hide']
        },
        component: () =>
          import("@/view/investment-policy/District-Intelligen/District-Intelligen.vue")
      }, {
        path: "/kinetic-energy",
        name: "kinetic_energy",
        meta: {
          icon: "md-person-add",
          title: "培育新动能-升级旧产业",
          access: ["10.3"]
          // access : ['hide']
        },
        component: () =>
          import("@/view/investment-policy/kinetic_energy/kinetic_energy.vue")
      }
    ]
  },

{
  path: "/zdemos1",
  name: "zdemos1",
  meta: {
    title: "测试",
    hideInMenu: true
  },
  component: () =>
      import("@/view/zdemo/zdemo.vue")
},
{
  path: "/401",
  name: "error_401",
  meta: {
    hideInMenu: true
  },
  component: () => import("@/view/error-page/401.vue")
},
{
  path: "/500",
  name: "error_500",
  meta: {
    hideInMenu: true
  },
  component: () => import("@/view/error-page/500.vue")
},
{
  path: "*",
  name: "error_404",
  meta: {
    hideInMenu: true
  },
  component: () => import("@/view/error-page/404.vue")
}
];
