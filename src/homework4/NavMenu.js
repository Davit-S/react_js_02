import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './Pages/naveMenuStyle.module.css'

export default function NavMenu(){

    return(
        <Navbar 
        
        bg="dark" variant="dark">
        <Nav className="mr-auto">

        <NavLink 
        to='/' 
        activeClassName={styles.active}
        exact
        >
        Home
        </NavLink>
        <NavLink
         to='/about'
         activeClassName={styles.active}
         exact
          >
          About us
          </NavLink>
        <NavLink
         to='/contact'
         activeClassName={styles.active}
         exact
         >
         Contact us
         </NavLink>

        </Nav>
      </Navbar>
    );
};