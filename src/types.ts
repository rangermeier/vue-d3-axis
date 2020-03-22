export type Scaler<T> = (x: T) => number

export interface BandedScale<T> {
  (x: T): number
  domain: () => T[]
  range: () => number[]
  copy: () => BandedScale<T>
  bandwidth: () => number
  round: () => boolean
}


export interface TickScale<T> {
  (x: T): number
  domain: () => T[]
  range: () => number[]
  ticks: (count: number) => T[]
  tickFormat: (count: number, fmt?: string | null | undefined) => (val: T) => string
  copy: () => TickScale<T>
  round: () => boolean
}


export type Orients = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT'

export interface AxisStyle {
  orient: Orients
  tickSizeInner: number
  tickSizeOuter: number
  tickPadding: number
  strokeWidth: number
  strokeColor: string
  tickFont: string
  tickFontSize: number
}


export interface PropsForAxis<T> {
  range: number[]
  values: T[]
  position: Scaler<T>
  format: (d: T) => string
}
