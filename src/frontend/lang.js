/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* istanbul ignore file */
const langs = {
  es() {
    return import(
      /* webpackChunkName: "lang-es" */
      /* webpackMode: "lazy" */
      './lang/es.lazy'
    );
  }
};
export default (lang) => {
  if (Object.prototype.hasOwnProperty.call(langs, lang)) {
    return langs[lang]();
  }
  return { default: {} };
};
