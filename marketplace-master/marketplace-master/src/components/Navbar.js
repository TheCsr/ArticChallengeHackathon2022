import React, { Component } from 'react';
import { Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark-blue fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blockchain Portal
        </a>
        { 
         this.props.account === "0x1E19D63986C8307bE06dB63CF5D95ea7fE138df9" ?
         (
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">
                <Label as='a' color='blue' >
                  Verifier
                </Label>
              </span></small>
            </li>
          </ul>
         ) :
         (
          <div></div>
         )
        }
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
