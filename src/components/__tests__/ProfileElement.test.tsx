import { shallow } from 'enzyme'
import * as React from 'react'

import { seedParsedProfile } from '~/parser/__tests__/fixtures'

import ProfileElement from '../ProfileElement'
import LinkElement from '../LinkElement'

describe('ProfileElement', () => {
    // ASSEMBLE
    const profile = seedParsedProfile(1)
    const onMouseOut = jest.fn()
    const onMouseOver = jest.fn()

    // ACT
    const wrapper = shallow(
        <ProfileElement
            profile={profile}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
        />,
    ).dive()

    // ASSERT
    it('should render a LinkElement', () => {
        expect(wrapper.find(LinkElement).length).toBe(1)
    })
    it('should pass the profile name as content', () => {
        const link = wrapper.find(LinkElement).first()
        expect(link.prop('content')).toBe(profile.abbreviated_name)
    })
    it('should compose the slug', () => {
        const link = wrapper.find(LinkElement).first()
        expect(link.prop('slug')).toBe(`/users/${profile.slug}`)
    })
    it('should pass the handlers unchanged', () => {
        const link = wrapper.find(LinkElement).first()
        expect(link.prop('onMouseOut')).toBe(onMouseOut)
        expect(link.prop('onMouseOver')).toBe(onMouseOver)
    })
})
