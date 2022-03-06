export function encode(s) {
    return btoa(encodeURIComponent(s))
}

export function decode(s) {
    return decodeURIComponent(atob(s))
}