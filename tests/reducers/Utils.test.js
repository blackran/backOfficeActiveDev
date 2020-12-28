import * as Utils from '../../reducers/Utils'
import { expect } from 'chai'

/** @test {Title Component} */
describe('reducers/Utils.js', () => {
    it('init', () => {
        const state = {
            datas: []
        }
        const newState = {
            datas: [
                {
                    one: [1],
                    two: [2]
                }
            ]
        }
        const stock = Utils.initReducers(state, 'datas', [{ one: [1], two: [2] }])
        expect(stock).to.deep.equal(newState)
    })

    it('add', () => {
        const state = {
            datas: [
                { one: [1], two: [2] }
            ]
        }
        const newState = {
            datas: [
                {
                    one: [1],
                    two: [2]
                },
                {
                    one: [1],
                    two: [2]
                }
            ]
        }
        const stock = Utils.addReducers(state, 'datas', [{ one: [1], two: [2] }])
        const stock1 = Utils.addReducers(state, 'datas', { one: [1], two: [2] })
        expect(stock).to.deep.equal(newState)
        expect(stock1).to.deep.equal(newState)
    })
    it('delete', () => {
        const state = {
            datas: [
                { id: 1, one: [1], two: [2] },
                { id: 2, one: [1], two: [2] }
            ]
        }
        const newState = {
            datas: [
                {
                    id: 2,
                    one: [1],
                    two: [2]
                }
            ]
        }
        const stock = Utils.deleteReducers(state, 'datas', { id: 1 })
        expect(stock).to.deep.equal(newState)
    })
    it('put', () => {
        const state = {
            datas: [
                { id: 1, one: [1], two: [2] },
                { id: 2, one: [1], two: [2] }
            ]
        }
        const newState = {
            datas: [
                { id: 1, one: [1], two: [2] },
                { id: 2, one: [1], two: [2, 3] }
            ]
        }
        const stock = Utils.putReducers(state, 'datas', { id: 2 }, { id: 2, one: [1], two: [2, 3] })
        expect(stock).to.deep.equal(newState)
    })
})
