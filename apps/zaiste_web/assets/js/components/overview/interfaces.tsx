export interface EventObject {
  id: number
  name: string
  date: string
  done: boolean
  position: number | null
}

export interface DayEvents {
  date: string // YYYY-MM-DD
  events: Array<EventObject>
}
