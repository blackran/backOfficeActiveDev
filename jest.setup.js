import chai from 'chai'
import dirtyChai from 'dirty-chai'
import chaiSubset from 'chai-subset'

console.error = jest.fn()

chai.use(dirtyChai).use(chaiSubset)
