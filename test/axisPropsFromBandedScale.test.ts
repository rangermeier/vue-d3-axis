import { scaleBand } from 'd3-scale'
import axisPropsFromBandedScale from '@/axisPropsFromBandedScale'

test('Works with bandwidth scales', () => {
  const scale = scaleBand()
    .domain(['foo', 'bar', 'baz'])
    .range([0, 500])
    .padding(1)

  const props = axisPropsFromBandedScale(scale)
  expect(props).toMatchSnapshot()

  expect(props.position('foo')).toEqual(125)
  expect(props.position('bar')).toEqual(250)
  expect(props.position('baz')).toEqual(375)

  expect(props.format('foo')).toEqual('foo')
})
