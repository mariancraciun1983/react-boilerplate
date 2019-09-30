/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import * as UI from '../stores/reducers/ui';
import lazyStyles from '../../styles';
import lazyLang from '../../lang';
import { updateLang } from '../utils/trans';


let store;
let lastStyle = null;

export const loadTheme = async (_theme) => {
  const newStye = await lazyStyles(_theme);
  newStye.use();
  if (lastStyle) lastStyle.unuse();
  lastStyle = newStye;
  store.dispatch({ type: UI.UI_THEME_LOADED });
};

export const loadLanguage = async (_lang) => {
  const newlang = await lazyLang(_lang);
  updateLang(_lang, newlang.default);
  store.dispatch({ type: UI.UI_LANGUAGE_LOADED });
};

export const middleware = () => (next) => (action) => {
  const result = next(action);
  /* istanbul ignore else  */
  if (action.type === UI.UI_THEME) {
    const theme = action.payload;
    loadTheme(theme);
  } else if (action.type === UI.UI_LANGUAGE) {
    const theme = action.payload;
    loadLanguage(theme);
  }
  return result;
};
middleware.register = (_store) => { store = _store; };

export default middleware;
