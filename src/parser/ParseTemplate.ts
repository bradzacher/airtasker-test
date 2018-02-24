/* eslint-disable no-continue */
import {
    ParsingToken,
    SoftToken,
    SoftLinkToken,
    FillerToken,
    IncompleteLinkToken,
} from '~/interfaces/TemplateTokens'

// eslint-disable-next-line complexity
export function parseTemplate(template : string) {
    const tokens = [] as SoftToken[]
    let currentToken : ParsingToken | null = null

    function finishFiller(token : FillerToken) {
        currentToken = null

        // don't save empty filler tokens
        if (token.content.length > 0) {
            if (tokens.length > 0) {
                // merge adjacent filler tokens
                const lastToken = tokens[tokens.length - 1]
                if (lastToken.kind === 'filler') {
                    lastToken.content += token.content

                    return
                }
            }
            tokens.push(token)
        }
    }
    function finishLink(token : IncompleteLinkToken) {
        currentToken = null

        // first parse into parts
        const matches = token.content.match(/\{ (profiles|task):(\d+) \}/)
        if (!matches) {
            throw new Error(`Malformed link, received: "{${token.content}}"`)
        }

        const [
            /* complete match */,
            type,
            rawId,
        ] = matches

        // ensure parts are of correct form
        if (type !== 'profiles' &&
            type !== 'task') {
            throw new Error(`Malformed link, received type: "${type}"`)
        }

        const id = parseInt(rawId, 10)
        if (isNaN(id)) {
            throw new Error(`Malformed link, recevied id: "${rawId}"`)
        }

        // save token
        const completeToken : SoftLinkToken = {
            kind: 'softlink',
            type,
            id,
        }
        tokens.push(completeToken)
    }


    let i = 0
    while (i < template.length) {
        const currentChar = template[i]

        if (currentChar === '{') {
            if (currentToken !== null) {
                if (currentToken.kind !== 'filler') {
                    // invalid link syntax so convert to a filler
                    currentToken = {
                        kind: 'filler',
                        content: currentToken.content,
                    }
                }
                finishFiller(currentToken)
            }

            // start new link token
            currentToken = {
                kind: 'incompletelink',
                content: '{',
            }
        } else if (currentChar === '}') {
            if (currentToken !== null) {
                currentToken.content += currentChar

                if (currentToken.kind === 'incompletelink') {
                    // end current link token
                    finishLink(currentToken)
                }
            }
        } else {
            if (currentToken === null) {
                // start a new filler token
                currentToken = {
                    kind: 'filler',
                    content: '',
                }
            }

            currentToken.content += currentChar
        }

        i += 1
    }

    // finish off any dangling tokens
    if (currentToken !== null) {
        if (currentToken.kind === 'filler') {
            finishFiller(currentToken)
        } else if (currentToken.kind === 'incompletelink' && currentToken.content.length > 0) {
            // convert unfinished link to filler
            currentToken = {
                kind: 'filler',
                content: currentToken.content,
            }
            finishFiller(currentToken)
        }
    }

    return tokens
}
export default parseTemplate
