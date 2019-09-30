import React from 'react';

import Nav from './components/Nav';
import Movies from './components/Movies';

class Index extends React.PureComponent {
  render() {
    return (
      <div className="d-flex">
        <div className="left-nav">
          <Nav />
        </div>
        <div className="flex-grow-1">
          <Movies />
        </div>
      </div>
    );
  }
}

export const Component = Index;
export default Index;
