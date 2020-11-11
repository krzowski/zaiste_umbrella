defmodule ZaisteWeb.CalendarEventController do
  use ZaisteWeb, :controller

  alias Zaiste.Calendar
  alias Zaiste.Calendar.CalendarEvent

  action_fallback ZaisteWeb.FallbackController

  def index(conn, _params) do
    calendar_events = Calendar.list_calendar_events()
    render(conn, "index.json", calendar_events: calendar_events)
  end

  def create(conn, %{"calendar_event" => calendar_event_params}) do
    with {:ok, %CalendarEvent{} = calendar_event} <-
           Calendar.create_calendar_event(calendar_event_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.calendar_event_path(conn, :show, calendar_event))
      |> render("show.json", calendar_event: calendar_event)
    end
  end

  def show(conn, %{"id" => id}) do
    calendar_event = Calendar.get_calendar_event!(id)
    render(conn, "show.json", calendar_event: calendar_event)
  end

  def update(conn, %{"id" => id, "calendar_event" => calendar_event_params}) do
    calendar_event = Calendar.get_calendar_event!(id)

    with {:ok, %CalendarEvent{} = calendar_event} <-
           Calendar.update_calendar_event(calendar_event, calendar_event_params) do
      render(conn, "show.json", calendar_event: calendar_event)
    end
  end

  def delete(conn, %{"id" => id}) do
    calendar_event = Calendar.get_calendar_event!(id)

    with {:ok, %CalendarEvent{}} <- Calendar.delete_calendar_event(calendar_event) do
      send_resp(conn, :no_content, "")
    end
  end

  # Custom collection actions

  # Return all events from month, grouped by day.
  def month_events(conn, %{"date" => date}) do
    with {:ok, date} <- Date.from_iso8601(date) do
      calendar_events_by_day =
        Calendar.list_calendar_events_in_month(date)
        |> Enum.group_by(&Map.get(&1, :date))

      render(conn, "month_events.json", calendar_events_by_day: calendar_events_by_day)
    else
      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> put_view(ZaisteWeb.ErrorView)
        |> render("400.json", message: "Wrong date format")
    end
  end
end
