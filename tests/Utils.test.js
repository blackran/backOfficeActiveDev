import {
    login
} from '../pages/utils/Utils'

/** @test {Utils groupe fonction} */
describe('Utils', () => {
    it.skip('pour le login', async () => {
        const data = {
            email: 'andrianantenainarasolondraibe@gmail.com',
            password: 'iloveyou'
        }
        const response = await login(data)
        console.log(response.data)
        expect(typeof response.data).toEqual('String')
    })
})
