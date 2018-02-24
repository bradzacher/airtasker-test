import ParseTemplate from '../ParseTemplate'

describe('ParseTemplate', () => {
    describe('handle valid templates', () => {
        it('filler only', () => {
            // ASSEMBLE
            const template = 'All i have is filler'

            // ACT
            const res = ParseTemplate(template)

            // ASSERT
            expect(res).toEqual([
                {
                    kind: 'filler',
                    content: 'All i have is filler',
                },
            ])
        })
        it('link only', () => {
            // ASSEMBLE
            const template = '{ task:1 }'

            // ACT
            const res = ParseTemplate(template)

            // ASSERT
            expect(res).toEqual([
                {
                    kind: 'softlink',
                    type: 'task',
                    id: 1,
                },
            ])
        })
        it('filler then link', () => {
            // ASSEMBLE
            const template = 'filler here { task:1 }'

            // ACT
            const res = ParseTemplate(template)

            // ASSERT
            expect(res).toEqual([
                {
                    kind: 'filler',
                    content: 'filler here ',
                },
                {
                    kind: 'softlink',
                    type: 'task',
                    id: 1,
                },
            ])
        })
        it('link then filler', () => {
            // ASSEMBLE
            const template = '{ task:1 } filler here'

            // ACT
            const res = ParseTemplate(template)

            // ASSERT
            expect(res).toEqual([
                {
                    kind: 'softlink',
                    type: 'task',
                    id: 1,
                },
                {
                    kind: 'filler',
                    content: ' filler here',
                },
            ])
        })
        it('link then filler then link', () => {
            // ASSEMBLE
            const template = '{ task:1 } filler here { profiles:2 }'

            // ACT
            const res = ParseTemplate(template)

            // ASSERT
            expect(res).toEqual([
                {
                    kind: 'softlink',
                    type: 'task',
                    id: 1,
                },
                {
                    kind: 'filler',
                    content: ' filler here ',
                },
                {
                    kind: 'softlink',
                    type: 'profiles',
                    id: 2,
                },
            ])
        })
        it('filler then link then filler', () => {
            // ASSEMBLE
            const template = 'start filler { task:1 } filler here'

            // ACT
            const res = ParseTemplate(template)

            // ASSERT
            expect(res).toEqual([
                {
                    kind: 'filler',
                    content: 'start filler ',
                },
                {
                    kind: 'softlink',
                    type: 'task',
                    id: 1,
                },
                {
                    kind: 'filler',
                    content: ' filler here',
                },
            ])
        })

        it('filler with one open bracket', () => {
            // ASSEMBLE
            const template = '{ task:1'

            // ACT
            const res = ParseTemplate(template)

            // ASSERT
            expect(res).toEqual([
                {
                    kind: 'filler',
                    content: '{ task:1',
                },
            ])
        })
        it('filler with two open brackets', () => {
            // ASSEMBLE
            const template = '{ task:1 {'

            // ACT
            const res = ParseTemplate(template)

            // ASSERT
            expect(res).toEqual([
                {
                    kind: 'filler',
                    content: '{ task:1 {',
                },
            ])
        })
        it('filler with three open brackets', () => {
            // ASSEMBLE
            const template = '{ task:1 { {'

            // ACT
            const res = ParseTemplate(template)

            // ASSERT
            expect(res).toEqual([
                {
                    kind: 'filler',
                    content: '{ task:1 { {',
                },
            ])
        })
        it('filler with one close bracket', () => {
            // ASSEMBLE
            const template = 'filler }'

            // ACT
            const res = ParseTemplate(template)

            // ASSERT
            expect(res).toEqual([
                {
                    kind: 'filler',
                    content: 'filler }',
                },
            ])
        })
    })

    describe('throw on malformed template', () => {
        it('invalid link structure', () => {
            // ASSEMBLE
            const template = '{ task1 }'

            // ACT & ASSERT
            expect(() => ParseTemplate(template)).toThrow()
        })

        it('invalid link type', () => {
            // ASSEMBLE
            const template = '{ foo:1 }'

            // ACT & ASSERT
            expect(() => ParseTemplate(template)).toThrow()
        })

        it('invalid link id', () => {
            // ASSEMBLE
            const template = '{ task:aa }'

            // ACT & ASSERT
            expect(() => ParseTemplate(template)).toThrow()
        })
    })
})
