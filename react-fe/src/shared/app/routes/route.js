//import Home from "../components/home/home.jsx";
import SuperAdminDash from "../components/super-admin-dash/super-admin-dash.jsx";
export default {
  routes: [
    
  ],
  redirects: [
    {
      from: "/404",
      to: "/",
      status: 301
    }
  ],
  private: [
    {
      path: "/admin",
      component: SuperAdminDash,
      exact: false
    }
  ]
};