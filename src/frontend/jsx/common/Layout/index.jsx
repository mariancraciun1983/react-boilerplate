import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

class Layout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <>
        <div className="holder">
          <Header />
          <div className="container-fluid">
            {children}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const Component = Layout;
export default Layout;
