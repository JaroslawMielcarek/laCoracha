import { shallowMount } from '@vue/test-utils'
import { getDayOfWeek } from '@/services/util/time.js'

describe('time util function test', () => {

  test('get day of the week', () => {
    expect(getDayOfWeek(new Date())).toBe('Sabado')
  })
})