import useFetch from "../hooks/useFetch"

export function requestFetchCalendarEvents(formattedDate: string) {
  return useFetch("/api/calendar_events/month_events", {
    date: formattedDate,
  })
}
