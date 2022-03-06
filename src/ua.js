const userAgent = navigator.userAgent

export function isMobile(ua = userAgent) {
    if (!ua) {
        return false
    }
    return (ua.includes('Android') && ua.includes('Mobile'))
        || ua.includes('iPhone')
        || ua.includes('iPod')
}