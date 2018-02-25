import { shallow } from 'enzyme'
import * as React from 'react'

import { seedParsedTask } from '~/parser/__tests__/fixtures'

import TaskElement from '../TaskElement'
import LinkElement from '../LinkElement'

describe('TaskElement', () => {
    // ASSEMBLE
    const task = seedParsedTask(1)
    const onMouseOut = jest.fn()
    const onMouseOver = jest.fn()

    // ACT
    const wrapper = shallow(
        <TaskElement
            task={task}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
        />,
    ).dive()

    // ASSERT
    it('should render a LinkElement', () => {
        expect(wrapper.find(LinkElement).length).toBe(1)
    })
    it('should pass the task name as content', () => {
        const link = wrapper.find(LinkElement).first()
        expect(link.prop('content')).toBe(task.name)
    })
    it('should compose the slug', () => {
        const link = wrapper.find(LinkElement).first()
        expect(link.prop('slug')).toBe(`/task/${task.slug}`)
    })
    it('should pass the handlers unchanged', () => {
        const link = wrapper.find(LinkElement).first()
        expect(link.prop('onMouseOut')).toBe(onMouseOut)
        expect(link.prop('onMouseOver')).toBe(onMouseOver)
    })
})
