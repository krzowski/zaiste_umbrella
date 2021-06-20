defmodule ZaisteWeb.WalletController do
  use ZaisteWeb, :controller

  alias Zaiste.Wallet
  alias Zaiste.Wallet.Transaction

  action_fallback ZaisteWeb.FallbackController

  def month(conn, %{"date" => date}) do
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
