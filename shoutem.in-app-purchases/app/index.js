import { SubscriptionsScreen } from './screens';
import { subscribtionMiddleware } from './redux';
import enTranslations from './translations/en.json';

export { appDidMount } from './app';
export { reducer, actions, selectors } from './redux';

export const screens = { SubscriptionsScreen };
export const middleware = [subscribtionMiddleware];

export const shoutem = {
  i18n: {
    translations: {
      en: enTranslations,
    },
  },
};
