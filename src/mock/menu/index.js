import Mock from "mockjs";
// 设置拦截请求的响应参数；
Mock.setup({
  timeout: "200-600",
});

Mock.mock("/menu/getMenu", "post", () => ({
  status: 0,
  data: {
    menuList: [
      {
        id: "eCommerce",
        name: "ECommerce",
        icon: "Monitor",
        children: [
          {
            id: "overview",
            name: "Overview",
            icon: "",
            hidden: true,
          },
        ],
      },
      {
        id: "dashboard",
        name: "Dashboard",
        icon: "HomeFilled",
        children: [
          {
            id: "workplace",
            name: "Workplace",
            icon: "",
          },
          {
            id: "workflow",
            name: "Workflow",
            icon: "",
          },
        ],
      },
      {
        seq: 1,
        id: "layout",
        name: "Layout",
        icon: "Film",
        children: [
          { id: "stepper", name: "Stepper", icon: "" },
          { id: "list", name: "List", index: "2" },
          { id: "infiniteList", name: "Infinite List", icon: "" },
          { id: "accordion", name: "Accordion", icon: "" },
          { id: "tabs", name: "Tabs", icon: "" },
        ],
      },
      {
        seq: 2,
        id: "forms",
        name: "Forms",
        icon: "EditPen",
        children: [
          { id: "formInputs", name: "Form Inputs", icon: "" },
          { id: "formLayouts", name: "Form Layouts", icon: "" },
          { id: "buttons", name: "Buttons", index: "3" },
          { id: "datepicker", name: "Datepicker", icon: "" },
        ],
      },
      {
        seq: 3,
        id: "uiFeatures",
        name: "UI Features",
        icon: "Grid",
        children: [
          { id: "grid", name: "Grid", icon: "" },
          { id: "icons", name: "Icons", icon: "" },
          { id: "typography", name: "Typography", icon: "" },
          { id: "animated", name: "Animated", icon: "" },
        ],
      },
      {
        seq: 4,
        id: "modalOverlays",
        name: "Modal & Overlays",
        icon: "Notebook",
        children: [
          { id: "dialog", name: "Dialog", icon: "" },
          { id: "window", name: "Window", icon: "" },
          { id: "popover", name: "Popover", icon: "" },
          { id: "toastr", name: "Toastr", icon: "" },
          { id: "tooltip", name: "Tooltip", icon: "" },
        ],
      },
      {
        seq: 5,
        id: "extraComponents",
        name: "Extra Components",
        icon: "ChatDotRound",
        children: [
          { id: "calendar", name: "Calendar", icon: "" },
          { id: "progressBar", name: "Progress Bar", icon: "" },
          { id: "spinner", name: "Spinner", icon: "" },
          { id: "alert", name: "Alert", icon: "" },
          { id: "calendarKit", name: "Calendar Kit", icon: "" },
          { id: "chat", name: "Chat", icon: "" },
        ],
      },
      {
        seq: 6,
        id: "maps",
        name: "Maps",
        icon: "ZoomIn",
        children: [
          { id: "googleMaps", name: "Google Maps", icon: "" },
          { id: "leafletMaps", name: "Leaflet Maps", icon: "" },
          { id: "bubbleMaps", name: "Bubble Maps", icon: "" },
          { id: "searchMaps", name: "Search Maps", icon: "" },
        ],
      },
      {
        seq: 7,
        id: "charts",
        name: "Charts",
        icon: "PieChart",
        children: [
          { id: "echarts", name: "Echarts", icon: "" },
          { id: "chartJs", name: "Chart.js", icon: "" },
          { id: "d3", name: "D3", icon: "" },
        ],
      },
      {
        seq: 8,
        id: "editors",
        name: "Editors",
        icon: "Edit",
        children: [
          { id: "tinyMCE", name: "TinyMCE", icon: "" },
          { id: "ckEditor", name: "CKEditor", icon: "" },
        ],
      },
      {
        seq: 9,
        id: "tablesData",
        name: "Tables & Data",
        icon: "Menu",
        children: [
          { id: "smartTable", name: "Smart Table", icon: "" },
          { id: "treeGrid", name: "Tree Grid", icon: "" },
        ],
      },
      {
        seq: 10,
        id: "miscellaneous",
        name: "Miscellaneous",
        icon: "Switch",
        children: [
          { id: "page401", name: "401", icon: "" },
          { id: "page404", name: "404", icon: "" },
        ],
      },
      {
        seq: 11,
        id: "auth",
        name: "Auth",
        icon: "Lock",
        children: [
          { id: "signIn", name: "Login", icon: "" },
          { id: "signUp", name: "Register", icon: "" },
          { id: "requestPassword", name: "Request Password", icon: "" },
          { id: "forgotPassword", name: "Reset Password", icon: "" },
        ],
      },
    ],
  },
  success: true,
  message: "成功",
}));
