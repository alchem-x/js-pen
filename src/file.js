export function readAsText(blob) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {

        reader.addEventListener('load', () => {
            resolve(reader.result)
        })

        reader.addEventListener('error', () => {
            reject(reader.error)
        })

        reader.readAsText(blob)
    })
}