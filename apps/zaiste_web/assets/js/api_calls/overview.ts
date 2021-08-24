import useFetch from '../hooks/useFetch'

export function fetchCalendarEvents(formattedDate: string) {
  return useFetch('/api/calendar_events/month_events', {
    date: formattedDate,
  })
}
