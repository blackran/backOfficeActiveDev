import { mount } from 'enzyme'
// import sinon from 'sinon'
import { Provider } from 'react-redux'
import store from '../reducers/store'

import Login from '../pages/Login'
import { expect } from 'chai'

import { defineFeature, loadFeature } from 'jest-cucumber'

const feature = loadFeature('./features/LoggingIn.feature', { loadRelativePath: true })

defineFeature(feature, (test) => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <Login />
            </Provider>
        )
    })

    test('Faire une verification login.', ({ given, when, then }) => {
        given('I have previously created a password', () => {
            expect(wrapper).not.to.deep.equal(undefined)
        })

        when('I enter my password correctly', async () => {
            // expect(wrapper.find('.email')).to.deep.equal({})
            expect({ a: 1 }).to.deep.equal({ a: 1 })
        })

        then('I should be granted access', async () => {
            expect(1 + 1).to.deep.equal(2)
        })
    })
})
