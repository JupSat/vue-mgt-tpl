import Mock from 'mockjs'
// 设置拦截请求的响应参数；
Mock.setup({
  timeout: '200-600'
})

Mock.mock(/\/api\/menu\/getMenu/, 'post', () => ({
  status: 0,
  data: {
    menuList: [
      {
        key: 'overview',
        id: 'overview',
        path: '/overview',
        name: 'Overview',
        icon: 'Monitor',
        component: '',
        componentName: 'Overview',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/overview/summary',
        children: [
          {
            key: 'summary',
            id: 'summary',
            path: '/overview/summary',
            name: 'Summary',
            icon: '',
            component: 'Overview/Summary',
            componentName: 'Summary',
            hidden: true,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'programGraph',
        id: 'programGraph',
        path: '/programGraph',
        name: 'ProgramGraph',
        icon: 'TrendCharts',
        component: '',
        componentName: 'ProgramGraph',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/programGraph/tenLine',
        children: [
          {
            key: 'tenLine',
            id: 'tenLine',
            path: '/programGraph/tenLine',
            name: 'TenLine',
            icon: '',
            component: 'ProgramGraph/TenLine',
            componentName: 'TenLine',
            hidden: true,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'eCommerce',
        id: 'analytics',
        path: '/eCommerce',
        name: 'ECommerce',
        icon: 'TrendCharts',
        component: '',
        componentName: 'ECommerce',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/eCommerce/analytics',
        children: [
          {
            key: 'overview',
            id: 'overview',
            path: '/eCommerce/analytics',
            name: 'Analytics',
            icon: '',
            component: 'ECommerce/Analytics',
            componentName: 'Analytics',
            hidden: true,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'purchase',
        id: 'purchase',
        path: '/purchase',
        name: 'Purchase',
        icon: 'ShoppingCartFull',
        component: '',
        componentName: 'Purchase',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/purchase/ingredientClassification',
        children: [
          {
            key: 'ingredientClassification',
            id: 'ingredientClassification',
            path: '/purchase/ingredientClassification',
            name: 'IngredientClassification',
            icon: '',
            component: 'Purchase/IngredientClassification',
            componentName: 'IngredientClassification',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'ingredientList',
            id: 'ingredientList',
            path: '/purchase/ingredientList',
            name: 'IngredientList',
            icon: '',
            component: 'Purchase/IngredientList',
            componentName: 'IngredientList',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'sku',
            id: 'sku',
            path: '/purchase/sku',
            name: 'SKU',
            icon: '',
            component: 'Purchase/SKU',
            componentName: 'SKU',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'vendor',
            id: 'vendor',
            path: '/purchase/Vendor',
            name: 'Vendor',
            icon: '',
            component: 'Purchase/Vendor',
            componentName: 'Vendor',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'purchaseRecords',
            id: 'purchaseRecords',
            path: '/purchase/purchaseRecords',
            name: 'PurchaseRecords',
            icon: '',
            component: 'Purchase/PurchaseRecords',
            componentName: 'PurchaseRecords',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'dashboard',
        id: 'dashboard',
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'HomeFilled',
        component: '',
        componentName: 'Dashboard',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/dashboard/workplace',
        children: [
          {
            key: 'workplace',
            id: 'workplace',
            path: '/dashboard/workplace',
            name: 'Workplace',
            icon: '',
            component: 'Dashboard/Workplace',
            componentName: 'Workplace',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'workflow',
            id: 'workflow',
            path: '/dashboard/workflow',
            name: 'Workflow',
            icon: '',
            component: 'Dashboard/Workflow',
            componentName: 'Workflow',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'layout',
        id: 'layout',
        path: '/layout',
        name: 'Layout',
        icon: 'Film',
        component: '',
        componentName: 'Layout',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/layout/stepper',
        children: [
          {
            key: 'stepper',
            id: 'stepper',
            path: '/layout/stepper',
            name: 'Stepper',
            icon: '',
            component: 'Layout/Stepper',
            componentName: 'Stepper',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'list',
            id: 'list',
            path: '/layout/list',
            name: 'List',
            component: 'Layout/List',
            componentName: 'List',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'infiniteList',
            id: 'infiniteList',
            path: '/layout/infiniteList',
            name: 'InfiniteList',
            icon: '',
            component: 'Layout/Infinite List',
            componentName: 'Infinite List',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'accordion',
            id: 'accordion',
            path: '/layout/accordion',
            name: 'Accordion',
            icon: '',
            component: 'Layout/Accordion',
            componentName: 'Accordion',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'tabs',
            id: 'tabs',
            path: '/layout/tabs',
            name: 'Tabs',
            icon: '',
            component: 'Layout/Tabs',
            componentName: 'Tabs',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'forms',
        id: 'forms',
        path: '/forms',
        name: 'Forms',
        icon: 'EditPen',
        component: '',
        componentName: 'Forms',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/forms/formInputs',
        children: [
          {
            key: 'formInputs',
            id: 'formInputs',
            path: '/forms/formInputs',
            name: 'FormInputs',
            icon: '',
            component: 'Forms/Form Inputs',
            componentName: 'Form Inputs',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'formLayouts',
            id: 'formLayouts',
            path: '/forms/formLayouts',
            name: 'FormLayouts',
            icon: '',
            component: 'Forms/Form Layouts',
            componentName: 'Form Layouts',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'buttons',
            id: 'buttons',
            path: '/forms/buttons',
            name: 'Buttons',
            component: 'Forms/Buttons',
            componentName: 'Buttons',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'datepicker',
            id: 'datepicker',
            path: '/forms/datepicker',
            name: 'Datepicker',
            icon: '',
            component: 'Forms/Datepicker',
            componentName: 'Datepicker',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'uiFeatures',
        id: 'uiFeatures',
        path: '/uiFeatures',
        name: 'UIFeatures',
        icon: 'Grid',
        component: '',
        componentName: 'UIFeatures',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/uiFeatures/grid',
        children: [
          {
            key: 'grid',
            id: 'grid',
            path: '/uiFeatures/grid',
            name: 'Grid',
            icon: '',
            component: 'UI Features/Grid',
            componentName: 'Grid',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'icons',
            id: 'icons',
            path: '/uiFeatures/icons',
            name: 'Icons',
            icon: '',
            component: 'UIFeatures/Icons',
            componentName: 'Icons',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'typography',
            id: 'typography',
            path: '/uiFeatures/typography',
            name: 'Typography',
            icon: '',
            component: 'UIFeatures/Typography',
            componentName: 'Typography',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'animated',
            id: 'animated',
            path: '/uiFeatures/animated',
            name: 'Animated',
            icon: '',
            component: 'UIFeatures/Animated',
            componentName: 'Animated',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'modalOverlays',
        id: 'modalOverlays',
        path: '/modalOverlays',
        name: 'ModalOverlays',
        icon: 'Notebook',
        component: '',
        componentName: 'Modal&Overlays',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/modalOverlays/dialog',
        children: [
          {
            key: 'dialog',
            id: 'dialog',
            path: '/modalOverlays/dialog',
            name: 'Dialog',
            icon: '',
            component: 'Modal&Overlays/Dialog',
            componentName: 'Dialog',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'window',
            id: 'window',
            path: '/modalOverlays/window',
            name: 'Window',
            icon: '',
            component: 'Modal & Overlays/Window',
            componentName: 'Window',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'popover',
            id: 'popover',
            path: '/modalOverlays/popover',
            name: 'Popover',
            icon: '',
            component: 'Modal & Overlays/Popover',
            componentName: 'Popover',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'toastr',
            id: 'toastr',
            path: '/modalOverlays/toastr',
            name: 'Toastr',
            icon: '',
            component: 'Modal & Overlays/Toastr',
            componentName: 'Toastr',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'tooltip',
            id: 'tooltip',
            path: '/modalOverlays/tooltip',
            name: 'Tooltip',
            icon: '',
            component: 'Modal & Overlays/Tooltip',
            componentName: 'Tooltip',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'extraComponents',
        id: 'extraComponents',
        path: '/extraComponents',
        name: 'ExtraComponents',
        icon: 'ChatDotRound',
        component: '',
        componentName: 'Extra Components',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/extraComponents/calendar',
        children: [
          {
            key: 'calendar',
            id: 'calendar',
            path: '/extraComponents/calendar',
            name: 'Calendar',
            icon: '',
            component: 'Extra Components/Calendar',
            componentName: 'Calendar',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'progressBar',
            id: 'progressBar',
            path: '/extraComponents/progressBar',
            name: 'ProgressBar',
            icon: '',
            component: 'Extra Components/Progress Bar',
            componentName: 'Progress Bar',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'spinner',
            id: 'spinner',
            path: '/extraComponents/spinner',
            name: 'Spinner',
            icon: '',
            component: 'Extra Components/Spinner',
            componentName: 'Spinner',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'alert',
            id: 'alert',
            path: '/extraComponents/alert',
            name: 'Alert',
            icon: '',
            component: 'Extra Components/Alert',
            componentName: 'Alert',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'calendarKit',
            id: 'calendarKit',
            path: '/extraComponents/calendarKit',
            name: 'CalendarKit',
            icon: '',
            component: 'Extra Components/Calendar Kit',
            componentName: 'Calendar Kit',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'chat',
            id: 'chat',
            path: '/extraComponents/chat',
            name: 'Chat',
            icon: '',
            component: 'Extra Components/Chat',
            componentName: 'Chat',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'maps',
        id: 'maps',
        path: '/maps',
        name: 'Maps',
        icon: 'ZoomIn',
        component: '',
        componentName: 'Maps',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/maps/googleMaps',
        children: [
          {
            key: 'googleMaps',
            id: 'googleMaps',
            path: '/maps/googleMaps',
            name: 'GoogleMaps',
            icon: '',
            component: 'Maps/Google Maps',
            componentName: 'Google Maps',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'leafletMaps',
            id: 'leafletMaps',
            path: '/maps/leafletMaps',
            name: 'LeafletMaps',
            icon: '',
            component: 'Maps/Leaflet Maps',
            componentName: 'Leaflet Maps',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'bubbleMaps',
            id: 'bubbleMaps',
            path: '/maps/bubbleMaps',
            name: 'BubbleMaps',
            icon: '',
            component: 'Maps/Bubble Maps',
            componentName: 'Bubble Maps',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'searchMaps',
            id: 'searchMaps',
            path: '/maps/searchMaps',
            name: 'SearchMaps',
            icon: '',
            component: 'Maps/Search Maps',
            componentName: 'Search Maps',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'charts',
        id: 'charts',
        path: '/charts',
        name: 'Charts',
        icon: 'PieChart',
        component: '',
        componentName: 'Charts',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/charts/echarts',
        children: [
          {
            key: 'echarts',
            id: 'echarts',
            path: '/charts/echarts',
            name: 'Echarts',
            icon: '',
            component: 'Charts/Echarts',
            componentName: 'Echarts',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'chartJs',
            id: 'chartJs',
            path: '/charts/chartJs',
            name: 'ChartJs',
            icon: '',
            component: 'Charts/Chart.js',
            componentName: 'Chart.js',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'd3',
            id: 'd3',
            path: '/charts/d3',
            name: 'D3',
            icon: '',
            component: 'Charts/D3',
            componentName: 'D3',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'editors',
        id: 'editors',
        path: '/editors',
        name: 'Editors',
        icon: 'Edit',
        component: '',
        componentName: 'Editors',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/editors/tinyMCE',
        children: [
          {
            key: 'tinyMCE',
            id: 'tinyMCE',
            path: '/editors/tinyMCE',
            name: 'TinyMCE',
            icon: '',
            component: 'Editors/TinyMCE',
            componentName: 'TinyMCE',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'ckEditor',
            id: 'ckEditor',
            path: '/editors/ckEditor',
            name: 'CKEditor',
            icon: '',
            component: 'Editors/CKEditor',
            componentName: 'CKEditor',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'tablesData',
        id: 'tablesData',
        path: '/tablesData',
        name: 'Tables & Data',
        icon: 'Menu',
        component: '',
        componentName: 'Tables & Data',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/tablesData/smartTable',
        children: [
          {
            key: 'smartTable',
            id: 'smartTable',
            path: '/tablesData/smartTable',
            name: 'SmartTable',
            icon: '',
            component: 'Tables & Data/Smart Table',
            componentName: 'Smart Table',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'treeGrid',
            id: 'treeGrid',
            path: '/tablesData/treeGrid',
            name: 'TreeGrid',
            icon: '',
            component: 'Tables & Data/Tree Grid',
            componentName: 'Tree Grid',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'miscellaneous',
        id: 'miscellaneous',
        path: '/miscellaneous',
        name: 'Miscellaneous',
        icon: 'Switch',
        component: '',
        componentName: 'Miscellaneous',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/miscellaneous/page401',
        children: [
          {
            key: 'page401',
            id: 'page401',
            path: '/miscellaneous/page401',
            name: '401',
            icon: '',
            component: 'Miscellaneous/401',
            componentName: '401',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'page404',
            id: 'page404',
            path: '/miscellaneous/page404',
            name: 'page404',
            icon: '',
            component: 'Miscellaneous/page404',
            componentName: 'page404',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      },
      {
        key: 'auth',
        id: 'auth',
        path: '/auth',
        name: 'Auth',
        icon: 'Lock',
        component: '',
        componentName: 'Auth',
        hidden: false,
        breadcrumb: false,
        keepAlive: false,
        fixed: false,
        redirect: '/auth/roleAuth',
        children: [
          {
            key: 'roleAuth',
            id: 'roleAuth',
            path: '/auth/roleAuth',
            name: 'RoleAuth',
            icon: '',
            component: 'Auth/RoleAuth',
            componentName: 'RoleAuth',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'signIn',
            id: 'signIn',
            path: '/auth/signIn',
            name: 'Login',
            icon: '',
            component: 'Auth/Login',
            componentName: 'Login',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'signUp',
            id: 'signUp',
            path: '/auth/signUp',
            name: 'Register',
            icon: '',
            component: 'Auth/Register',
            componentName: 'Register',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'requestPassword',
            id: 'requestPassword',
            path: '/auth/requestPassword',
            name: 'Request Password',
            icon: '',
            component: 'Auth/Request Password',
            componentName: 'Request Password',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          },
          {
            key: 'forgotPassword',
            id: 'forgotPassword',
            path: '/auth/forgotPassword',
            name: 'ResetPassword',
            icon: '',
            component: 'Auth/Reset Password',
            componentName: 'Reset Password',
            hidden: false,
            breadcrumb: false,
            keepAlive: false,
            fixed: false
          }
        ]
      }
    ]
  },
  success: true,
  message: '成功'
}))
