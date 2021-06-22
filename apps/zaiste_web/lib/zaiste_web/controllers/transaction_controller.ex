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
    with {:ok, %Transaction{}} <-
           Wallet.create_transaction(Map.put(transaction_params, "user_id", current_user.id)) do
      send_resp(conn, :no_content, "")
    end
  end

  def show(conn, %{"id" => id}, current_user) do
    transaction = Wallet.get_transaction!(id, current_user.id) |> Repo.preload(:transaction_items)
    render(conn, "show.json", transaction: transaction)
  end

  def update(conn, %{"id" => id, "transaction" => transaction_params}, current_user) do
    transaction = Wallet.get_transaction!(id, current_user.id)

    with {:ok, %Transaction{}} <-
           Wallet.update_transaction(transaction, transaction_params) do
      send_resp(conn, :no_content, "")
    end
  end

  def delete(conn, %{"id" => id}, current_user) do
    transaction = Wallet.get_transaction!(id, current_user.id)

    with {:ok, %Transaction{}} <- Wallet.delete_transaction(transaction) do
      send_resp(conn, :no_content, "")
    end
  end
end
