defmodule ZaisteWeb.TransactionItemController do
  use ZaisteWeb, :controller
  use ZaisteWeb.Helpers.CurrentUser

  alias Zaiste.Wallet
  alias Zaiste.Wallet.TransactionItem

  action_fallback ZaisteWeb.FallbackController

  def create(
        conn,
        %{"transaction_item" => transaction_item_params, "transaction_id" => transaction_id},
        current_user
      ) do
    transaction = Wallet.get_transaction!(transaction_id, current_user.id)

    create_params =
      transaction_item_params
      |> Map.put("transaction_id", transaction.id)
      |> Map.put("amount", parse_amount_param(transaction_item_params["amount"]))

    with {:ok, %TransactionItem{} = transaction_item} <-
           Wallet.create_transaction_item(create_params) do
      conn
      |> put_status(:created)
      |> render("show.json", transaction_item: transaction_item)
    end
  end

  def delete(conn, %{"id" => id, "transaction_id" => transaction_id}, current_user) do
    transaction = Wallet.get_transaction!(transaction_id, current_user.id)
    transaction_item = Wallet.get_transaction_item!(id, transaction.id)

    with {:ok, %TransactionItem{}} <- Wallet.delete_transaction_item(transaction_item) do
      send_resp(conn, :no_content, "")
    end
  end

  defp parse_amount_param(nil), do: nil
  defp parse_amount_param(""), do: nil

  defp parse_amount_param(amount_string) do
    standardize_amount_string = String.replace(amount_string, ",", ".")
    {amount_to_round, _} = Float.parse(standardize_amount_string)
    Float.round(amount_to_round, 2)
  end
end
