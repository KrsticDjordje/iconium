import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import sr from './locales/sr.json';

export default createI18n({
    legacy: false,
    locale: localStorage.getItem('language') || 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        sr
    }
}); 