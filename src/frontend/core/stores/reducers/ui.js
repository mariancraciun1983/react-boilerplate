import { createAction } from 'redux-actions';

export const UI_LANGUAGE = 'UI_LANGUAGE';
export const UI_LANGUAGE_LOADED = 'UI_LANGUAGE_LOADED';
export const UI_THEME = 'UI_THEME';
export const UI_THEME_LOADED = 'UI_THEME_LOADED';
export const UI_REDIRECT = 'UI_REDIRECT';
export const UI_REPLACE = 'UI_REPLACE';
export const UI_LOAD = 'UI_LOAD';
export const UI_LOADED = 'UI_LOADED';

export const initialState = {
  language: 'en',
  version: 0,
  theme: 'light',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UI_LANGUAGE: {
      const language = action.payload;
      return { ...state, language };
    }

    case UI_LANGUAGE_LOADED: {
      const { version } = state;
      return { ...state, version: version + 1 };
    }

    case UI_THEME: {
      const theme = action.payload;
      return { ...state, theme };
    }

    case UI_THEME_LOADED: {
      const { version } = state;
      return { ...state, version: version + 1 };
    }

    default:
      return state;
  }
}
export const uiSetLanguage = createAction(UI_LANGUAGE, (language) => language);
export const uiSetTheme = createAction(UI_THEME, (theme) => theme);
