/**
 * Run JS script
 *
 * @param {string} text JS script text
 * @param {boolean} module ES module
 */
export default function runJs(text, module = false) {
    const scriptRef = document.createElement('script')
    scriptRef.innerHTML = text
    if (module) {
        scriptRef.type = 'module'
    }
    document.body.appendChild(scriptRef)
}