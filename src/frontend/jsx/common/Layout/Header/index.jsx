import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import Tools from './Tools';
import Menu from './Menu';
import Search from './Search';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { toggled: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((state) =>{
      const { toggled } = state;
      return { toggled: !toggled };
    });
  }

  render() {
    const { toggled } = this.state;
    const classes = classnames({ 'navbar-collapse': true, collapse: !toggled });
    return (
      <>
        <nav className="navbar navbar-expand-lg mb-3">
          <Link to="/" className="navbar-brand">
            ReactJS
          </Link>
          <button className="navbar-toggler" type="button" onClick={this.toggle}>
            <span className="navbar-toggler-icon" />
          </button>
          <Search />
          <div className={classes}>
            <div className="mr-auto mt-2 mt-lg-0">
              <Tools />
            </div>
            <Menu />
          </div>
        </nav>
      </>
    );
  }
}

export const Component = Header;
export default Header;
