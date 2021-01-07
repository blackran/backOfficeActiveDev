import {
    login,
    filterIsExist
} from '../pages/utils/Utils'

/** @test {Utils groupe fonction} */
describe('Utils', () => {
    it.skip('pour le login', async () => {
        const data = {
            email: 'andrianantenainarasolondraibe@gmail.com',
            password: 'iloveyou'
        }
        const response = await login(data)
        expect(typeof response.data).toEqual('String')
    })
    it('pour savoir le diferent between two object', async () => {
        const dataAll = [
            {
                id: 0,
                email: 'andrianantenainarasolondraibe@gmail.com'
            },
            {
                id: 1,
                email: 'test'
            },
            {
                id: 2,
                email: 'test'
            }
        ]
        const dataExist = [
            {
                id: 1,
                email: 'test'
            }
        ]
        const dataResp = [
            {
                id: 0,
                email: 'andrianantenainarasolondraibe@gmail.com'
            },
            {
                id: 2,
                email: 'test'
            }
        ]
        const response = await filterIsExist(dataAll, dataExist)
        const response1 = await filterIsExist(dataAll, [])
        expect(response).toEqual(dataResp)
        expect(response1).toEqual(dataAll)
    })
})
