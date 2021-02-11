import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import style from './stylesNavMenu.module.css'

export default function NavMenu(){

    return(
        <Navbar 
        bg="dark" variant="dark">
        <Nav className="mr-auto">

        <NavLink 
        to='/' 
        activeClassName={style.active}
        exact
        className={style.text}
        >
        Home
        </NavLink>
        <NavLink
         to='/about'
         activeClassName={style.active}
         exact
         className={style.text}
          >
          About us
          </NavLink>
        <NavLink
         to='/contact'
         activeClassName={style.active}
         exact
         className={style.text}
         >
         Contact us
         </NavLink>

        </Nav>
      </Navbar>
    );
};