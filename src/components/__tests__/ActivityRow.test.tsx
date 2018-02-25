import { shallow } from 'enzyme'
import * as React from 'react'

import { ParsedActivity } from '~/interfaces/ParsedFeed'
import FillerElement from '~/components/FillerElement'
import ProfileElement from '~/components/ProfileElement'
import TaskElement from '~/components/TaskElement'
import { seedParsedProfile, seedParsedTask } from '~/parser/__tests__/fixtures'

import ActivityRow from '../ActivityRow'

describe('LinkElement', () => {
    const activityBase : ParsedActivity = {
        created_at: new Date(),
        event: 'event',
        template: [],
    }
    const onMouseOut = jest.fn()
    const onMouseOver = jest.fn()

    it('should render render a filler element if the template contains it', () => {
        // ASSEMBLE
        const content = 'foo'
        const activity : ParsedActivity = {
            ...activityBase,
            template: [
                {
                    kind: 'filler',
                    content,
                },
            ],
        }

        // ACT
        const wrapper = shallow(
            <ActivityRow
                activity={activity}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            />,
        ).dive()

        // ASSERT
        const filler = wrapper.find(FillerElement)
        expect(filler.length).toBe(1)
        expect(filler.prop('content')).toBe(content)
    })

    it('should render render a profile element if the template contains it', () => {
        // ASSEMBLE
        const entity = seedParsedProfile(1)
        const activity : ParsedActivity = {
            ...activityBase,
            template: [
                {
                    kind: 'hardlink',
                    type: 'profiles',
                    entity,
                },
            ],
        }

        // ACT
        const wrapper = shallow(
            <ActivityRow
                activity={activity}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            />,
        ).dive()

        // ASSERT
        const filler = wrapper.find(ProfileElement)
        expect(filler.length).toBe(1)
        expect(filler.prop('profile')).toBe(entity)
    })

    it('should render render a profile element if the template contains it', () => {
        // ASSEMBLE
        const entity = seedParsedTask(1)
        const activity : ParsedActivity = {
            ...activityBase,
            template: [
                {
                    kind: 'hardlink',
                    type: 'task',
                    entity,
                },
            ],
        }

        // ACT
        const wrapper = shallow(
            <ActivityRow
                activity={activity}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            />,
        ).dive()

        // ASSERT
        const filler = wrapper.find(TaskElement)
        expect(filler.length).toBe(1)
        expect(filler.prop('task')).toBe(entity)
    })
})
