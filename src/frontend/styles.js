/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* istanbul ignore file */
const styles = {
  light() {
    return import(
      /* webpackChunkName: "style-light-theme" */
      /* webpackMode: "lazy" */
      './styles/light-theme.lazy'
    );
  },
  dark() {
    return import(
      /* webpackChunkName: "style-dark-theme" */
      /* webpackMode: "lazy" */
      './styles/dark-theme.lazy'
    );
  },
};

export default (theme) => {
  if (Object.prototype.hasOwnProperty.call(styles, theme)) {
    return styles[theme]();
  }
  return styles.light();
};
