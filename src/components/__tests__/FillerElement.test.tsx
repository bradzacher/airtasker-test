import { shallow } from 'enzyme'
import * as React from 'react'

import FillerElement from '../FillerElement'

describe('LinkElement', () => {
    // ASSEMBLE
    const content = 'foo'

    // ACT
    const wrapper = shallow(
        <FillerElement
            content={content}
        />,
    ).dive()

    // ASSERT
    it('should render a span', () => {
        expect(wrapper.find('span').length).toBe(1)
    })

    it('should render the content', () => {
        const children = wrapper.find('span').children()
        expect(children.length).toBe(1)
        expect(children.text()).toBe(content)
    })
})
