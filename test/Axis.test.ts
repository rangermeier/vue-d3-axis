import { shallowMount } from '@vue/test-utils'
import Axis, {TOP, RIGHT, BOTTOM, LEFT} from '@/Axis'


test('Renders bottom-oriented', () => {
  const wrapper = shallowMount(Axis, {
    propsData: {
      styles: {orient: BOTTOM},
      range: [0, 1000],
      values: [0, 250, 500],
      position: d => d * 2,
      format: d => `${d}`
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders top-oriented', () => {
  const wrapper = shallowMount(Axis, {
    propsData: {
      styles: {orient: TOP},
      range: [0, 1000],
      values: [0, 250, 500],
      position: d => d * 2,
      format: d => `${d}`
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders left-oriented', () => {
  const wrapper = shallowMount(Axis, {
    propsData: {
      styles: {orient: LEFT},
      range: [0, 1000],
      values: [0, 250, 500],
      position: d => d * 2,
      format: d => `${d}`
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('Renders right-oriented', () => {
  const wrapper = shallowMount(Axis, {
    propsData: {
      styles: {orient: RIGHT},
      range: [0, 1000],
      values: [0, 250, 500],
      position: d => d * 2,
      format: d => `${d}`
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})
