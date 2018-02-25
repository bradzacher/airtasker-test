import { shallow } from 'enzyme'
import * as React from 'react'

import LinkElement from '../LinkElement'

describe('LinkElement', () => {
    // ASSEMBLE
    const content = 'foo'
    const slug = 'bar'
    const onMouseOut = jest.fn()
    const onMouseOver = jest.fn()

    // ACT
    const wrapper = shallow(
        <LinkElement
            content={content}
            slug={slug}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
        />,
    ).dive()

    // ASSERT
    it('should render an anchor', () => {
        expect(wrapper.find('a').length).toBe(1)
    })

    it('should render the content', () => {
        const children = wrapper.find('a').children()
        expect(children.length).toBe(1)
        expect(children.text()).toBe(content)
    })

    it('should render the slug as the href', () => {
        const anchor = wrapper.find('a')
        expect(anchor.prop('href')).toBe(slug)
    })

    it('should call the over handler with the slug', () => {
        wrapper.simulate('mouseover')
        expect(onMouseOver).toHaveBeenCalledWith(slug)
    })

    it('should call the out handler with nothing', () => {
        wrapper.simulate('mouseout')
        expect(onMouseOut).toHaveBeenCalledWith()
    })
})
