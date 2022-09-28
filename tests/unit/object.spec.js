import { sortListOfObjectsBy } from '@/services/util/object.js'

const list = [{balance: -150},{balance: -30}, {balance: 0}, {balance: 30}]
describe('object util function test', () => {

  test('sort from minus to plus balance', () => {
    const first = sortListOfObjectsBy(list,'balance', false, false)[0]
    expect(first).toStrictEqual(list[0])
  })
  test('sort from plus to minus balance', () => {
    const first = sortListOfObjectsBy(list,'balance', true, false)[0]
    expect(first).toStrictEqual(list[3])
  })
})