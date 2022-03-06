import { languageList } from './language.js'
import { decode, encode } from './encoding.js'

export function getLanguage() {
    const l = new URLSearchParams(location.search).get('l')
    return languageList.includes(l) ? l : languageList[0]
}

export function changeLanguage(language) {
    const url = new URL(location.href)
    const searchParams = new URLSearchParams()
    searchParams.append('l', language)
    searchParams.append('s', encode(getContentValue()))
    url.search = searchParams.toString()
    window.location = url.toString()
}

export function getContentValue() {
    const q = new URLSearchParams(location.search).get('s')
    if (!q) {
        return ''
    }
    try {
        return decode(q)
    } catch (err) {
        return ''
    }
}

export function updateContentValue(s) {
    const searchParams = new URLSearchParams()
    searchParams.append('l', getLanguage())
    searchParams.append('s', encode(s))
    history.pushState('', '', '?' + searchParams.toString())
}