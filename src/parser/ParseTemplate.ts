/* eslint-disable no-continue */
import { ParsingToken, SoftToken, SoftLinkToken } from '~/interfaces/TemplateTokens'

// eslint-disable-next-line complexity
export function parseTemplate(template : string) {
    const tokens = [] as SoftToken[]

    let currentToken : ParsingToken | null = null
    let i = 0
    while (i < template.length) {
        const currentChar = template[i]

        if (currentChar === '{') {
            if (currentToken !== null) {
                if (currentToken.kind !== 'filler') {
                    throw new Error('Malformed template')
                }

                // end current filler token
                tokens.push(currentToken)
                currentToken = null
            }

            // start new link token
            currentToken = {
                kind: 'incompletelink',
                content: '',
            }
        } else if (currentChar === '}') {
            if (currentToken !== null) {
                if (currentToken.kind !== 'incompletelink') {
                    throw new Error('Malformed template')
                }

                // end current link token

                // first parse into parts
                const matches = currentToken.content.match(/ (profiles|task):(\d+) /)
                if (!matches) {
                    throw new Error(`Malformed link, received: "{${currentToken.content}}"`)
                }

                const [
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

                currentToken = null
            }

            // start a new filler token
            currentToken = {
                kind: 'filler',
                content: '',
            }
        } else {
            if (currentToken === null) {
                throw new Error('Malformed template')
            }

            currentToken.content += currentChar
        }

        i += 1
    }

    return tokens
}
export default parseTemplate
