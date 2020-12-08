import { mount } from 'enzyme'

import NavBar from '../../components/NavBar'

/** @test {Title Component} */
describe('Title Component', () => {
    it('should render without crashing', () => {
        const wrapper = mount(<NavBar label="test" />)

        expect(wrapper.find('.logo')).toHaveLength(1)
    })
})
