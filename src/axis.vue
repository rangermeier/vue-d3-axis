domainFrom<script setup lang="ts" generic="T">
import { computed, nextTick, useTemplateRef, watch } from 'vue'
import { TOP, RIGHT, BOTTOM, LEFT } from './orientation'

export interface PropsForAxis<T> {
  range: number[]
  values: T[]
  position: Scaler<T>
  format: (d: T) => string
  styles?: Partial<AxisStyle>
}

const props = defineProps<PropsForAxis<T>>()

const defaultAxisStyle: AxisStyle = {
  orient: 'BOTTOM',
  tickSizeInner: 6,
  tickSizeOuter: 6,
  tickPadding: 3,
  strokeWidth: 1,
  strokeColor: 'currentColor',
  tickFont: 'sans-serif',
  tickFontSize: 10,
  hideOverlappingTicks: false
}

function translateX<T>(scale0: Scaler<T>, scale1: Scaler<T>, d: T): string {
  const x = scale0(d)
  return `translate(${isFinite(x) ? x : scale1(d)},0)`
}

function translateY<T>(scale0: Scaler<T>, scale1: Scaler<T>, d: T): string {
  const y = scale0(d)
  return `translate(0,${isFinite(y) ? y : scale1(d)})`
}

const axisStyle = computed<AxisStyle>(() => ({ ...defaultAxisStyle, ...props.styles }))

const orient = computed(() => axisStyle.value.orient)
const tickSizeInner = computed(() => axisStyle.value.tickSizeInner)
const tickPadding = computed(() => axisStyle.value.tickPadding)
const tickSizeOuter = computed(() => axisStyle.value.tickSizeOuter)
const strokeWidth = computed(() => axisStyle.value.strokeWidth)
const strokeColor = computed(() => axisStyle.value.strokeColor)
const tickFont = computed(() => axisStyle.value.tickFont)
const tickFontSize = computed(() => axisStyle.value.tickFontSize)

const k = computed(() => orient.value === TOP || orient.value === LEFT ? -1 : 1)
const isRight = computed(() => orient.value === RIGHT)
const isLeft = computed(() => orient.value === LEFT)
const isTop = computed(() => orient.value === TOP)
const isBottom = computed(() => orient.value === BOTTOM)
const isHorizontal = computed(() => isRight.value || isLeft.value)

const xAttr = computed(() => isHorizontal.value ? 'x' : 'y')
const yAttr = computed(() => isHorizontal.value ? 'y' : 'x')

const halfWidth = computed(() => strokeWidth.value / 2)
const range0 = computed(() => props.range[0] + halfWidth.value)
const range1 = computed(() => props.range[props.range.length - 1] + halfWidth.value)
const spacing = computed(() => Math.max(tickSizeInner.value, 0) + tickPadding.value)
const textAnchor = computed(() => isRight.value ? 'start' : isLeft.value ? 'end' : 'middle')

const domainPath = computed(() =>
  isHorizontal.value
    ? `M${k.value * tickSizeOuter.value},${range0.value}H${halfWidth.value}V${range1.value}H${k.value * tickSizeOuter.value}`
    : `M${range0.value},${k.value * tickSizeOuter.value}V${halfWidth.value}H${range1.value}V${k.value * tickSizeOuter.value}`
)

const tickTransform = computed(() => (d: T): string => {
  const fn = orient.value === TOP || orient.value === BOTTOM ? translateX : translateY
  return fn(props.position, props.position, d)
})

const lineAttrs = computed(() => {
  const attrs: Record<string, number | string> = { stroke: strokeColor.value }
  attrs[`${xAttr.value}2`] = k.value * tickSizeInner.value
  attrs[`${yAttr.value}1`] = halfWidth.value
  attrs[`${yAttr.value}2`] = halfWidth.value
  return attrs
})

const textDy = computed(() =>
  isTop.value ? '0em' : isBottom.value ? '0.71em' : '0.32em'
)

const textAttrs = computed(() => {
  const attrs: Record<string, number | string> = {
    fill: strokeColor.value,
    dy: textDy.value
  }
  attrs[xAttr.value] = k.value * spacing.value
  attrs[yAttr.value] = halfWidth.value
  return attrs
})

const tickLabel = useTemplateRef('tickLabel')
watch(
  [
    () => axisStyle.value.hideOverlappingTicks,
    () => props.values,
    () => tickLabel.value
  ],
  () => {
    if(tickLabel.value?.length) {
      if(axisStyle.value.hideOverlappingTicks) {
        nextTick(() => {
          const ticks = tickLabel.value as unknown as SVGTextElement[]
          if(!ticks.length) return
          const start = isHorizontal.value ? 'top' : 'left'
          const end = isHorizontal.value ? 'bottom' : 'right'
          const boxes = ticks.map((label: SVGTextElement) => label.getBoundingClientRect())
          const maxOverlap = Math.max(...boxes.map((box, index) => {
            let overlapBoxes = 1
            while(overlapBoxes < index && box[start] < boxes[index - overlapBoxes][end] + 4) {
              overlapBoxes++
            }
            return overlapBoxes
          }))
          if(maxOverlap > 1) {
            const intvl  = maxOverlap > 5 ? 5 : 2
            const stepSize = Math.ceil(maxOverlap / intvl) * intvl
            ticks.forEach((label: SVGTextElement, index) => {
              if(index % stepSize !== 0) {
                label.setAttribute('opacity', '0')
              } else {
                label.setAttribute('opacity', '1')
              }
            })
          } else {
            ticks.forEach((label: SVGTextElement) => label.setAttribute('opacity', '1'))
          }

        })
      } else {
        tickLabel.value.forEach((label: SVGTextElement) => label.setAttribute('opacity', '1'))
      }
    }
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <g
    fill="none"
    :font-size="tickFontSize"
    :font-family="tickFont"
    :text-anchor="textAnchor"
    :stroke-width="strokeWidth"
  >
    <path :stroke="strokeColor" :d="domainPath" />
    <g
      v-for="(v, idx) in values"
      :key="`tick-${idx}`"
      opacity="1"
      :transform="tickTransform(v)"
    >
      <line v-bind="lineAttrs" />
      <text v-bind="textAttrs" ref="tickLabel">{{ format(v) }}</text>
    </g>
  </g>
</template>
