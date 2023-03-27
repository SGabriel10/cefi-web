import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class Menu extends Component {
  render() {
    return (
    
      <div>
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="index3.html" className="brand-link">
              <img src="fiuni.png" alt="FIUNI Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
              <span className="brand-text font-weight-light">CEFI</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">

              {/* Sidebar Menu */}
              <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                  <li className="nav-item">
                  <Link  className="nav-link" to="/usuarios">
                      <i className="fas fa-user-alt"></i>
                      <p> Usuarios</p>
                    </Link>
                  </li>

                </ul>
              </nav>
              {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
          </aside>
        </div>
        
    )
  }
}