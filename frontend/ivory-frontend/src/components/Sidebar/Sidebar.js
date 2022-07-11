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
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";

import NotInOffice from "views/NotInOffice";
import { CardFooter } from "reactstrap";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" style={{ "width": "15%", "display": "flex", padding: 0, margin: 0}} data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper" style={{padding: 0, margin: 0}}>
        <div className="logo d-flex align-items-center justify-content-start" style={{padding: 0, marginRight: 0}}>
          <a
            href="/admin/dashboard"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={require("assets/img/ivorylogo.png")} alt="..." />
            </div>
          </a>
          <div style={{paddingLeft: 10}}>
            <a className="simple-text" href="/admin/dashboard">
              GS Ivory
            </a>
          </div>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                    style={{"paddingRight": 0, "paddingLeft": 5, margin: 5, marginRight: 0, marginLeft: 0}}
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
        <div style={{"position": "absolute", "bottom": "0", "width": "100%"}}>
        <NotInOffice/>
        
        <CardFooter
          style={{
            fontSize: 12
          }}>
          <a target="_blank" href="https://icons8.com/icon/j27nHMUQL9v7/notes">Notes</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
        </CardFooter>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
