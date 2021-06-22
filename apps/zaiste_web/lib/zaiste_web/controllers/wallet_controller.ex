defmodule ZaisteWeb.WalletController do
  use ZaisteWeb, :controller
  use ZaisteWeb.Helpers.CurrentUser

  alias Zaiste.Repo
  alias Zaiste.Wallet
  alias Zaiste.Wallet.Transaction

  action_fallback ZaisteWeb.FallbackController

  def transactions(conn, %{"date_from" => date_from, "date_to" => date_to}, current_user) do
    with date_from <-
           date_from
           |> String.replace(" ", "")
           |> Timex.parse!("{D}/{M}/{YYYY}")
           |> Timex.to_date(),
         date_to <-
           date_to |> String.replace(" ", "") |> Timex.parse!("{D}/{M}/{YYYY}") |> Timex.to_date() do
      transactions =
        Wallet.list_transactions_between_dates(date_from, date_to, current_user.id)
        |> Repo.preload(:transaction_items)

      conn
      |> put_view(ZaisteWeb.TransactionView)
      |> render("index.json", transactions: transactions)
    else
      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> put_view(ZaisteWeb.ErrorView)
        |> render("400.json", message: "Wrong dates format")
    end
  end
end
