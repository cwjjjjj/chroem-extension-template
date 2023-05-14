import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

export const MS = 'millisecond'
export const S = 'second'
export const MIN = 'minute'
export const H = 'hour'
export const D = 'day'
export const W = 'week'
export const M = 'month'
export const Q = 'quarter'
export const Y = 'year'

const defaultThreholds = [
  { l: 's', r: 44, d: S },
  { l: 'm', r: 89 },
  { l: 'mm', r: 44, d: MIN },
  { l: 'h', r: 89 },
  { l: 'hh', r: 21, d: H },
  { l: 'd', r: 35 },
  { l: 'dd', r: 25, d: D },
  { l: 'M', r: 45 },
  { l: 'MM', r: 10, d: M },
  { l: 'y', r: 17 },
  { l: 'yy', d: Y },
]

const thresholds = [
  { l: 's', r: 60, d: S },
  { l: 'm', r: 120 },
  { l: 'mm', r: 60, d: MIN },
  { l: 'h', r: 120 },
  { l: 'hh', r: 24, d: H },
  { l: 'd', r: 48 },
  { l: 'dd', r: 30, d: D },
  { l: 'M', r: 60 },
  { l: 'MM', r: 12, d: M },
  { l: 'y', r: 24 },
  { l: 'yy', d: Y },
]

dayjs.extend(updateLocale)
dayjs.extend(relativeTime, {
  thresholds,
})
dayjs.locale('zh-cn')

export default dayjs
