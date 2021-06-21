defmodule ZaisteWeb.TransactionItemView do
  use ZaisteWeb, :view
  alias ZaisteWeb.TransactionItemView

  def render("index.json", %{transaction_items: transaction_items}) do
    %{data: render_many(transaction_items, TransactionItemView, "transaction_item.json")}
  end

  def render("show.json", %{transaction_item: transaction_item}) do
    %{data: render_one(transaction_item, TransactionItemView, "transaction_item.json")}
  end

  def render("transaction_item.json", %{transaction_item: transaction_item}) do
    %{id: transaction_item.id, name: transaction_item.name, amount: transaction_item.amount}
  end
end
