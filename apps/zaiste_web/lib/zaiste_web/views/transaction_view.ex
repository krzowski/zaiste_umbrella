defmodule ZaisteWeb.TransactionView do
  use ZaisteWeb, :view
  alias ZaisteWeb.{TransactionView, TransactionItemView}

  def render("index.json", %{transactions: transactions}) do
    %{data: render_many(transactions, TransactionView, "transaction_with_items.json")}
  end

  def render("show.json", %{transaction: transaction}) do
    %{data: render_one(transaction, TransactionView, "transaction_with_items.json")}
  end

  def render("transaction.json", %{transaction: transaction}) do
    %{
      data: %{
        id: transaction.id,
        date: transaction.date,
        name: transaction.name,
        income: transaction.income
      }
    }
  end

  def render("transaction_with_items.json", %{transaction: transaction}) do
    %{
      id: transaction.id,
      date: transaction.date,
      name: transaction.name,
      income: transaction.income,
      transaction_items:
        render_many(transaction.transaction_items, TransactionItemView, "transaction_item.json")
    }
  end
end
