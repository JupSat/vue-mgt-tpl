

import Mock from 'mockjs'
// 设置拦截请求的响应参数；
Mock.setup({
  timeout: '200-600'
})

Mock.mock('/menu/getMenu', 'post', () => ({
  status: 0,
  data: {
    menuList: [{
      id: "eCommerce",
      name: "E-commerce",
      icon: 'ShoppingCart'
    }, {
      id: "dashboard",
      name: "IoT Dashboard",
      icon: 'HomeFilled'
    }],
    subMenuList: [
      {
        seq: 1,
        id: "layout",
        name: "Layout",
        icon: 'Film',
        menuItemGroup: [
          {
            id: "1",
            title: "Group1",
            menuItem: [
              { id: "stepper", name: "Stepper", index: "1" },
              { id: "list", name: "List", index: "2" },
              { id: "infiniteList", name: "Infinite List", index: "3" },
              { id: "accordion", name: "Accordion", index: "4" },
              { id: "tabs", name: "Tabs", index: "5" },
            ],
          },
        ],
      },
      {
        seq: 2,
        id: "forms",
        name: "Forms",
        icon: 'EditPen',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { id: 'formInputs', name: "Form Inputs", index: "1" },
              { id: 'formLayouts', name: "Form Layouts", index: "2" },
              { id: 'buttons', name: "Buttons", index: "3" },
              { id: 'datepicker', name: "Datepicker", index: "4" },
            ],
          },
        ],
      },
      {
        seq: 3,
        id: "uiFeatures",
        name: "UI Features",
        icon: 'Grid',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { id: 'grid', name: "Grid", index: "1" },
              { id: 'icons', name: "Icons", index: "2" },
              { id: 'typography', name: "Typography", index: "3" },
              { id: 'animated', name: "Animated", index: "4" },
            ],
          },
        ],
      },
      {
        seq: 4,
        id: "modalOverlays",
        name: "Modal & Overlays",
        icon: 'Notebook',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { id: 'dialog', name: "Dialog", index: "1" },
              { id: 'window', name: "Window", index: "2" },
              { id: 'popover', name: "Popover", index: "3" },
              { id: 'toastr', name: "Toastr", index: "4" },
              { id: 'tooltip', name: "Tooltip", index: "5" },
            ],
          },
        ],
      },
      {
        seq: 5,
        id: "extraComponents",
        name: "Extra Components",
        icon: 'ChatDotRound',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { id: 'calendar', name: "Calendar", index: "1" },
              { id: 'progressBar', name: "Progress Bar", index: "2" },
              { id: 'spinner', name: "Spinner", index: "3" },
              { id: 'alert', name: "Alert", index: "4" },
              { id: 'calendarKit', name: "Calendar Kit", index: "5" },
              { id: 'chat', name: "Chat", index: "6" },
            ],
          },
        ],
      },
      {
        seq: 6,
        id: "maps",
        name: "Maps",
        icon: 'ZoomIn',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { id: 'googleMaps', name: "Google Maps", index: "1" },
              { id: 'leafletMaps', name: "Leaflet Maps", index: "2" },
              { id: 'bubbleMaps', name: "Bubble Maps", index: "3" },
              { id: 'searchMaps', name: "Search Maps", index: "5" },
            ],
          },
        ],
      },
      {
        seq: 7,
        id: "charts",
        name: "Charts",
        icon: 'PieChart',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { id: 'echarts', name: "Echarts", index: "1" },
              { id: 'chartJs', name: "Chart.js", index: "2" },
              { id: 'd3', name: "D3", index: "3" },
            ],
          },
        ],
      },
      {
        seq: 8,
        id: "editors",
        name: "Editors",
        icon: 'Edit',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { id: 'tinyMCE', name: "TinyMCE", index: "1" },
              { id: 'ckEditor', name: "CKEditor", index: "2" },
            ],
          },
        ],
      },
      {
        seq: 9,
        id: "tablesData",
        name: "Tables & Data",
        icon: 'Menu',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { id: 'smartTable', name: "Smart Table", index: "1" },
              { id: 'treeGrid', name: "Tree Grid", index: "2" },
            ],
          },
        ],
      },
      {
        seq: 10,
        id: "miscellaneous",
        name: "Miscellaneous",
        icon: 'Switch',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { id: '401', name: "401", index: "1" },
              { id: '404', name: "404", index: "2" },
            ],
          },
        ],
      },
      {
        seq: 11,
        id: "auth",
        name: "Auth",
        icon: 'Lock',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { id: 'signIn', name: "Login", index: "1" },
              { id: 'signUp', name: "Register", index: "2" },
              { id: 'requestPassword', name: "Request Password", index: "3" },
              { id: 'forgotPassword', name: "Reset Password", index: "4" },
            ],
          },
        ],
      },
    ],
  },
  success: true,
  message: '成功'
}))
