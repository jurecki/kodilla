import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import Container from '../Container/Contianer';
import Icon from '../Icon/Icon';
import styles from './Header.scss';


class Header extends React.Component {
  render() {
    return(
      <header className={styles.component}>
        <Container>
          <div className={styles.wrapper}>
            <Link className={styles.logo} to='/'>
              <Icon name='book'/>
			    </Link>
            <nav>
              <NavLink exact to="/" activeClassName='active'>Home</NavLink>
              <NavLink exact to='/info' activeClassName='active'>Info</NavLink>
			  <NavLink exact to='/faq' activeClassName='active'>FAQ</NavLink>
            </nav>
          
          </div>
        </Container>
      </header>
    );
  }
}

export default Header;