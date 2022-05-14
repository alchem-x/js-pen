export const LANGUAGE_TYPE = {
    JAVASCRIPT: 'javascript',
    JSON: 'json',
    HTML: 'html',
    CSS: 'css',
    SQL: 'sql',
    XML: 'xml',
    JAVA: 'java',
    C: 'c',
    MARKDOWN: 'markdown',
    PLAINTEXT: 'plaintext',
}

const languageLabel = {
    [LANGUAGE_TYPE.JAVASCRIPT]: 'JavaScript',
    [LANGUAGE_TYPE.JSON]: 'JSON',
    [LANGUAGE_TYPE.HTML]: 'HTML',
    [LANGUAGE_TYPE.CSS]: 'CSS',
    [LANGUAGE_TYPE.SQL]: 'SQL',
    [LANGUAGE_TYPE.XML]: 'XML',
    [LANGUAGE_TYPE.JAVA]: 'Java',
    [LANGUAGE_TYPE.C]: 'C',
    [LANGUAGE_TYPE.MARKDOWN]: 'Markdown',
    [LANGUAGE_TYPE.PLAINTEXT]: '纯文本',
}

export const languageOptions = Object.keys(LANGUAGE_TYPE).map((it) => {
    const value = LANGUAGE_TYPE[it]
    return {
        value,
        label: languageLabel[value],
    }
})

export const languageList = Object.keys(LANGUAGE_TYPE).map((it) => LANGUAGE_TYPE[it])

export function getFileExtension(language) {
    switch (language) {
        case LANGUAGE_TYPE.JAVASCRIPT:
            return 'js'
        case LANGUAGE_TYPE.MARKDOWN:
            return 'md'
        case LANGUAGE_TYPE.PLAINTEXT:
            return 'txt'
        default:
            return language
    }
}
