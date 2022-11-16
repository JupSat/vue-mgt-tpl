

import Mock from 'mockjs'
// 设置拦截请求的响应参数；
Mock.setup({
  timeout: '200-600'
})

Mock.mock('/menu/getMenu', 'post', () => ({
  status: 0,
  data: {
    menuList: [{
      id: "ECommerce",
      name: "E-commerce",
      icon: 'ShoppingCart'
    }, {
      id: "Dashboard",
      name: "IoT Dashboard",
      icon: 'HomeFilled'
    }],
    subMenuList: [
      {
        id: "1",
        name: "Layout",
        icon: 'Film',
        menuItemGroup: [
          {
            id: "1",
            title: "Group1",
            menuItem: [
              { name: "Stepper", index: "1" },
              { name: "List", index: "2" },
              { name: "Infinite List", index: "3" },
              { name: "Accordion", index: "4" },
              { name: "Tabs", index: "5" },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Forms",
        icon: 'EditPen',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { name: "Form Inputs", index: "1" },
              { name: "Form Layouts", index: "2" },
              { name: "Form Inputs", index: "3" },
              { name: "Buttons", index: "4" },
              { name: "Datepicker", index: "5" },
            ],
          },
        ],
      },
      {
        id: "3",
        name: "UI Features",
        icon: 'Grid',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { name: "Grid", index: "1" },
              { name: "Icons", index: "2" },
              { name: "Typography", index: "3" },
              { name: "Animated", index: "4" },
            ],
          },
        ],
      },
      {
        id: "4",
        name: "Modal & Overlays",
        icon: 'Notebook',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { name: "Dialog", index: "1" },
              { name: "Window", index: "2" },
              { name: "Popover", index: "3" },
              { name: "Toastr", index: "4" },
              { name: "Tooltip", index: "5" },
            ],
          },
        ],
      },
      {
        id: "5",
        name: "Extra Components",
        icon: 'ChatDotRound',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { name: "Calendar", index: "1" },
              { name: "Progress Bar", index: "2" },
              { name: "Spinner", index: "3" },
              { name: "Alert", index: "4" },
              { name: "Calendar Kit", index: "5" },
              { name: "Chat", index: "6" },
            ],
          },
        ],
      },
      {
        id: "6",
        name: "Maps",
        icon: 'ZoomIn',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { name: "Google Maps", index: "1" },
              { name: "Leaflet Maps", index: "2" },
              { name: "Bubble Maps", index: "3" },
              { name: "Alert", index: "4" },
              { name: "Search Maps", index: "5" },
            ],
          },
        ],
      },
      {
        id: "7",
        name: "Charts",
        icon: 'PieChart',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { name: "Echarts", index: "1" },
              { name: "Chart.js", index: "2" },
              { name: "D3", index: "3" },
            ],
          },
        ],
      },
      {
        id: "8",
        name: "Editors",
        icon: 'Edit',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { name: "TinyMCE", index: "1" },
              { name: "CKEditor", index: "2" },
            ],
          },
        ],
      },
      {
        id: "9",
        name: "Tables & Data",
        icon: 'Menu',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { name: "Smart Table", index: "1" },
              { name: "Tree Grid", index: "2" },
            ],
          },
        ],
      },
      {
        id: "10",
        name: "Miscellaneous",
        icon: 'Switch',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { name: "404", index: "1" },
              { name: "Tree Grid", index: "2" },
            ],
          },
        ],
      },
      {
        id: "11",
        name: "Auth",
        icon: 'Lock',
        menuItemGroup: [
          {
            id: "1",
            title: "Group 1",
            menuItem: [
              { name: "Login", index: "1" },
              { name: "Register", index: "2" },
              { name: "Request Password", index: "3" },
              { name: "Reset Password", index: "4" },
            ],
          },
        ],
      },
    ],
  },
  success: true,
  message: '成功'
}))
