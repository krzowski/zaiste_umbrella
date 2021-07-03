defmodule ZaisteWeb.TransactionController do
  use ZaisteWeb, :controller
  use ZaisteWeb.Helpers.CurrentUser

  alias Zaiste.Repo
  alias Zaiste.Wallet
  alias Zaiste.Wallet.Transaction

  action_fallback ZaisteWeb.FallbackController

  def index(conn, _params, current_user) do
    transactions = Wallet.list_transactions(current_user.id) |> Repo.preload(:transaction_items)
    render(conn, "index.json", transactions: transactions)
  end

  def create(conn, %{"transaction" => transaction_params}, current_user) do
    create_attrs =
      transaction_params
      |> Map.put("user_id", current_user.id)
      |> Map.put("date", parse_date_param(transaction_params["date"]))

    with {:ok, %Transaction{} = transaction} <-
           Wallet.create_transaction(create_attrs) do
      conn
      |> put_status(:created)
      |> render("transaction.json", transaction: transaction)
    end
  end

  def show(conn, %{"id" => id}, current_user) do
    transaction = Wallet.get_transaction!(id, current_user.id) |> Repo.preload(:transaction_items)
    render(conn, "show.json", transaction: transaction)
  end

  def update(conn, %{"id" => id, "transaction" => transaction_params}, current_user) do
    transaction = Wallet.get_transaction!(id, current_user.id)

    update_attrs =
      transaction_params
      |> Map.put("date", parse_date_param(transaction_params["date"]))

    with {:ok, %Transaction{} = transaction} <-
           Wallet.update_transaction(transaction, update_attrs) do
      conn
      |> put_status(:ok)
      |> render("transaction.json", transaction: transaction)
    end
  end

  def delete(conn, %{"id" => id}, current_user) do
    transaction = Wallet.get_transaction!(id, current_user.id)

    with {:ok, %Transaction{}} <- Wallet.delete_transaction(transaction) do
      send_resp(conn, :no_content, "")
    end
  end

  defp parse_date_param(nil), do: nil
  defp parse_date_param(""), do: nil

  defp parse_date_param(date_string) do
    date_string
    |> String.replace(" ", "")
    |> Timex.parse!("{D}/{M}/{YYYY}")
    |> Timex.to_date()
  end
end
