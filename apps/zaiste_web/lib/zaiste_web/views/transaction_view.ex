defmodule ZaisteWeb.TransactionView do
  use ZaisteWeb, :view
  alias ZaisteWeb.TransactionView

  def render("index.json", %{transactions: transactions}) do
    %{data: render_many(transactions, TransactionView, "transaction.json")}
  end

  def render("show.json", %{transaction: transaction}) do
    %{data: render_one(transaction, TransactionView, "transaction.json")}
  end

  def render("transaction.json", %{transaction: transaction}) do
    %{id: transaction.id, date: transaction.date, name: transaction.name}
  end
end
