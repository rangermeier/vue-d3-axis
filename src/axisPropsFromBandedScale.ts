import { BandedScale, PropsForAxis } from './types'

export function axisPropsFromBandedScale<T>(
  scale: BandedScale<T>,
): PropsForAxis<T> {
  const range = scale.range()
  const values = scale.domain()
  const format = (d: T): string => String(d)

  let offset = scale.bandwidth() / 2
  const scaleCopy = scale.copy()
  if (scaleCopy.round()) offset = Math.round(offset)
  const position = (d: T): number => scaleCopy(d) + offset

  return { range, values, format, position }
}
