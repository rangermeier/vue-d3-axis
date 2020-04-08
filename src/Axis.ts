import { PropType } from 'vue'
import type { Scaler, AxisStyle } from './types'

function translateX<T>(scale0: Scaler<T>, scale1: Scaler<T>, d: T): string {
  const x = scale0(d)
  return `translate(${isFinite(x) ? x : scale1(d)},0)`
}

function translateY<T>(scale0: Scaler<T>, scale1: Scaler<T>, d: T): string {
  const y = scale0(d)
  return `translate(0,${isFinite(y) ? y : scale1(d)})`
}

export const TOP = 'TOP'
export const RIGHT = 'RIGHT'
export const BOTTOM = 'BOTTOM'
export const LEFT = 'LEFT'

const defaultAxisStyle: AxisStyle = {
  orient: BOTTOM,
  tickSizeInner: 6,
  tickSizeOuter: 6,
  tickPadding: 3,
  strokeWidth: 1,
  strokeColor: 'currentColor',
  tickFont: 'sans-serif',
  tickFontSize: 10
}

export default {
  render: function (createElement) {
    const axisStyle = { ...defaultAxisStyle, ...this.styles }
    const {
      orient,
      tickSizeInner,
      tickPadding,
      tickSizeOuter,
      strokeWidth,
      strokeColor,
      tickFont,
      tickFontSize
    } = axisStyle

    const transform = orient === TOP || orient === BOTTOM
      ? translateX
      : translateY
    const tickTransformer = (d): string => transform(this.position, this.position, d)

    const k = orient === TOP || orient === LEFT ? -1 : 1
    const isRight = orient === RIGHT
    const isLeft = orient === LEFT
    const isTop = orient === TOP
    const isBottom = orient === BOTTOM
    const isHorizontal = isRight || isLeft
    const x = isHorizontal ? 'x' : 'y'
    const y = isHorizontal ? 'y' : 'x'

    const halfWidth = strokeWidth / 2
    const range0 = this.range[0] + halfWidth
    const range1 = this.range[this.range.length - 1] + halfWidth

    const spacing = Math.max(tickSizeInner, 0) + tickPadding

    return createElement(
      'g',
      {
        attrs: {
          fill: 'none',
          fontSize: tickFontSize,
          fontFamily: tickFont,
          textAnchor: isRight ? 'start' : isLeft ? 'end' : 'middle',
          strokeWidth: strokeWidth
        }
      },
      [
        createElement('path', {
          attrs: {
            stroke: strokeColor,
            d: isHorizontal
              ? `M${k * tickSizeOuter},${range0}H${halfWidth}V${range1}H${k * tickSizeOuter}`
              : `M${range0},${k * tickSizeOuter}V${halfWidth}H${range1}V${k * tickSizeOuter}`
          }
        }),
        this.values.map((v, idx) => {
          const lineProps = { stroke: strokeColor }
          lineProps[`${x}2`] = k * tickSizeInner
          lineProps[`${y}1`] = halfWidth
          lineProps[`${y}2`] = halfWidth

          const textProps = {
            fill: strokeColor,
            dy: isTop ? '0em' : isBottom ? '0.71em' : '0.32em'
          }
          textProps[`${x}`] = k * spacing
          textProps[`${y}`] = halfWidth
          return createElement('g', {
            attrs: {
              key: `tick-${idx}`,
              opacity: 1,
              transform: tickTransformer(v)
            },
          }, [
            createElement('line', {
              attrs: lineProps
            }),
            createElement('text', {
              attrs: textProps
            }, this.format(v)),
          ])
        })
      ]
    )
  },
  props: {
    styles: {
      type: Object,
      required: false
    },
    range: {
      type: Array as PropType<number[]>,
      required: false
    },
    values: {
      type: Array as PropType<number[]>,
      required: false
    },
    position: {
      type: Function as PropType<Scaler<number>>,
      required: false
    },
    format: {
      type: Function as PropType<(d: number) => string>,
      required: false
    }
  }
}
