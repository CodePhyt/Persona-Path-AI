import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
import enCommon from './locales/en/common.json';
import enPersonas from './locales/en/personas.json';
import enQuestions from './locales/en/questions.json';
import esCommon from './locales/es/common.json';
import esPersonas from './locales/es/personas.json';
import esQuestions from './locales/es/questions.json';
import frCommon from './locales/fr/common.json';
import frPersonas from './locales/fr/personas.json';
import frQuestions from './locales/fr/questions.json';
import deCommon from './locales/de/common.json';
import dePersonas from './locales/de/personas.json';
import deQuestions from './locales/de/questions.json';
import itCommon from './locales/it/common.json';
import itPersonas from './locales/it/personas.json';
import itQuestions from './locales/it/questions.json';
import ptCommon from './locales/pt/common.json';
import ptPersonas from './locales/pt/personas.json';
import ptQuestions from './locales/pt/questions.json';
import jaCommon from './locales/ja/common.json';
import jaPersonas from './locales/ja/personas.json';
import jaQuestions from './locales/ja/questions.json';
import trCommon from './locales/tr/common.json';
import trPersonas from './locales/tr/personas.json';
import trQuestions from './locales/tr/questions.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { common: enCommon, personas: enPersonas, questions: enQuestions },
            es: { common: esCommon, personas: esPersonas, questions: esQuestions },
            fr: { common: frCommon, personas: frPersonas, questions: frQuestions },
            de: { common: deCommon, personas: dePersonas, questions: deQuestions },
            it: { common: itCommon, personas: itPersonas, questions: itQuestions },
            pt: { common: ptCommon, personas: ptPersonas, questions: ptQuestions },
            ja: { common: jaCommon, personas: jaPersonas, questions: jaQuestions },
            tr: { common: trCommon, personas: trPersonas, questions: trQuestions }
        },
        fallbackLng: 'en',
        defaultNS: 'common',
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    });

export default i18n;
