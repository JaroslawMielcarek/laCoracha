import { shallowMount } from '@vue/test-utils'
import CustomNotification from '@/components/CustomNotification.vue'

const props = {
  text: ['jaja'],
  typeOfNotification: 'success'
}
let wrapper 
beforeEach(() => {
  wrapper = shallowMount(CustomNotification, {
    propsData: {
       value: props
    }
  })
})
// afterEach(() => { wrapper.destroy() })

describe('CustomNotification unit test', () => {
  test('is mounted', ()=> {
    expect(wrapper).toBeTruthy()
    })

  test('props has text', () => {
    expect(wrapper.props().value).toStrictEqual(props)
  })

  test('displays text', () => {
    expect(wrapper.html()).toContain('jaja')
  })
  it('display correct color', async () => {
    const wr = await wrapper.find('.success')
    expect(wr.exists()).toBe(true)
  })

})
