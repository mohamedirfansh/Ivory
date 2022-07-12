/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
// import Note from "views/Note";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import DashboardPersonnal from "views/DashboardPersonnal";
import OfficeState from "views/OfficeState";
// import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin"
  // },
  {
    path: "/dashboard",
    name: "Work",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/personalDashboard",
    name: "Personal",
    icon: "nc-icon nc-circle-09",
    component: DashboardPersonnal,
    layout: "/admin"
  },
  // {
  //   path: "/notes",
  //   name: "Notes",
  //   icon: "nc-icon nc-notes",
  //   component: Note,
  //   layout: "/admin"
  // },
  {
    path: "/office",
    name: "Office",
    icon: "nc-icon nc-bag",
    component: OfficeState,
    layout: "/admin"
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
