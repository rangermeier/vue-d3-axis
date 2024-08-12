type Scaler<T> = (x: T) => number

interface BandedScale<T> {
  (x: T): number
  domain: () => T[]
  range: () => number[]
  copy: () => BandedScale<T>
  bandwidth: () => number
  round: () => boolean
}


interface TickScale<T> {
  (x: T): number
  domain: () => T[]
  range: () => number[]
  ticks: (count: number) => T[]
  tickFormat: (count: number, fmt?: string | null | undefined) => (val: T) => string
  copy: () => TickScale<T>
  round: () => boolean
}


type Orients = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT'

interface AxisStyle {
  orient: Orients
  tickSizeInner: number
  tickSizeOuter: number
  tickPadding: number
  strokeWidth: number
  strokeColor: string
  tickFont: string
  tickFontSize: number
}


interface PropsForAxis<T> {
  range: number[]
  values: T[]
  position: Scaler<T>
  format: (d: T) => string
  styles?: Partial<AxisStyle>
}

interface LineProps {
  x1: number
  y1: number
  x2: number
  y2: number
  stroke: string
}

interface TextProps {
  fill: string
  dy: string
  x: number
  y: number
}
