
import type { Locale } from '@/i18n.config'

const dictionaries = {
    en: (name: any) => import(`./locales/en/${name}.json`).then((module) => module.default),
    pt: (name: any) => import(`./locales/pt/${name}.json`).then((module) => module.default),
    es: (name: any) => import(`./locales/es/${name}.json`).then((module) => module.default),
}

console.log(dictionaries)

export const getDictionary = async (locale: Locale, name: any) => dictionaries[locale](name);