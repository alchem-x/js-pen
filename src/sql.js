export async function querySql(url, sql) {
    if (!url) {
        throw new Error('请输入SQL查询URL')
    }
    if (!sql) {
        throw new Error('请输入SQL')
    }
    let errorMessage
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: sql,
        })
        if (!response.ok) {
            errorMessage = response.statusText
        } else {
            const result = await response.json()
            if (result.error) {
                errorMessage = result.error
            } else {
                return result.payload
            }
        }
    } catch (err) {
        errorMessage = err.message
    }
    if (errorMessage) {
        throw new Error(errorMessage)
    }
}

const SQL_QUERY_URL = 'SQL_QUERY_URL'
const storage = localStorage

export function getSqlQueryUrl() {
    return storage.getItem(SQL_QUERY_URL) || ''
}

export function saveSqlQueryUrl(url) {
    storage.setItem(SQL_QUERY_URL, url)
}
