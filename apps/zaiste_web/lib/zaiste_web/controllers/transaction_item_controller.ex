defmodule ZaisteWeb.TransactionItemController do
  use ZaisteWeb, :controller
  use ZaisteWeb.Helpers.CurrentUser

  alias Zaiste.Wallet
  alias Zaiste.Wallet.Transaction
  alias Zaiste.Wallet.TransactionItem

  action_fallback ZaisteWeb.FallbackController

  def create(
        conn,
        %{"transaction_item" => transaction_item_params, "transaction_id" => transaction_id},
        current_user
      ) do
    transaction = Wallet.get_transaction!(transaction_id, current_user.id)
    params = Map.put(transaction_item_params, "transaction_id", transaction.id)

    with {:ok, %TransactionItem{} = transaction_item} <- Wallet.create_transaction_item(params) do
      send_resp(conn, :no_content, "")
    end
  end

  def delete(conn, %{"id" => id, "transaction_id" => transaction_id}, current_user) do
    transaction = Wallet.get_transaction!(transaction_id, current_user.id)
    transaction_item = Wallet.get_transaction_item!(id, transaction.id)

    with {:ok, %TransactionItem{}} <- Wallet.delete_transaction_item(transaction_item) do
      send_resp(conn, :no_content, "")
    end
  end
end
