import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { uiTheme, uiLanguage } from '../../../../core/selectors';
import { uiSetTheme, uiSetLanguage } from '../../../../core/stores/reducers/ui';


const stateToProps = (state) => ({
  theme: uiTheme(state),
  language: uiLanguage(state),
});
const actionsToProps = (dispatch) => ({
  setTheme: (theme) => dispatch(uiSetTheme(theme)),
  setLanguage: (theme) => dispatch(uiSetLanguage(theme)),
});
class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onToggleTheme = this.onToggleTheme.bind(this);
    this.onToggleLang = this.onToggleLang.bind(this);
  }

  onToggleTheme() {
    const { setTheme, theme } = this.props;
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  }

  onToggleLang() {
    const { setLanguage, language } = this.props;
    if (language === 'en') setLanguage('es');
    else setLanguage('en');
  }

  renderColor() {
    const { theme } = this.props;
    if (theme === 'dark') {
      return (
        <button className="btn mr-2 btn-outline-dark" type="button" onClick={this.onToggleTheme}>
          <i className="fas fa-paint-roller" />
          Light Version
        </button>
      );
    }

    return (
      <button className="btn mr-2 btn-outline-light" type="button" onClick={this.onToggleTheme}>
        <i className="fas fa-paint-roller" />
        Dark Version
      </button>
    );
  }

  renderLanguage() {
    const { language } = this.props;
    if (language === 'en') {
      return (
        <button className="btn mr-2 btn-danger" type="button" onClick={this.onToggleLang}>
          <i className="fas fa-globe-americas" />
          ES
        </button>
      );
    }
    return (
      <button className="btn mr-2 btn-danger" type="button" onClick={this.onToggleLang}>
        <i className="fas fa-globe-americas" />
        EN
      </button>
    );
  }

  render() {
    return (
      <nav className="d-flex flex-column flex-md-row float-right">
        {this.renderColor()}
        {this.renderLanguage()}
      </nav>
    );
  }
}

Menu.propTypes = {
  theme: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default connect(
  stateToProps,
  actionsToProps,
)(Menu);
export const Component = Menu;
