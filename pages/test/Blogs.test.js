import { mount } from 'enzyme'
import sinon from 'sinon'
import Projects from '../Projects'

/** @test {Projects Component} */
describe('Projects Component', () => {
    it.skip('simulates click events', () => {
        const deleteUser = sinon.spy()

        const wrapper = mount((
            <Projects deleteUser={deleteUser} />
        ))
        wrapper.find('.btnDelete').simulate('click')
        expect(deleteUser).to.have.property('callCount', 1)
    })
})
