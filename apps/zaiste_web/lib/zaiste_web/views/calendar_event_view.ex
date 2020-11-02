defmodule ZaisteWeb.CalendarEventView do
  use ZaisteWeb, :view
  alias ZaisteWeb.CalendarEventView

  def render("index.json", %{calendar_events: calendar_events}) do
    %{data: render_many(calendar_events, CalendarEventView, "calendar_event.json")}
  end

  def render("show.json", %{calendar_event: calendar_event}) do
    %{data: render_one(calendar_event, CalendarEventView, "calendar_event.json")}
  end

  def render("calendar_event.json", %{calendar_event: calendar_event}) do
    %{id: calendar_event.id,
      date: calendar_event.date,
      name: calendar_event.name,
      done: calendar_event.done,
      position: calendar_event.position}
  end
end
