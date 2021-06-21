defmodule Zaiste.Factory do
  use ExMachina.Ecto, repo: Zaiste.Repo

  alias Zaiste.Wallet.{Transaction, TransactionItem}
  alias Zaiste.Account.User
  alias Zaiste.Calendar.CalendarEvent

  def user_factory do
    %User{
      email: sequence(:email, &"email-#{&1}@example.com"),
      password: "password"
    }
  end

  def transaction_factory do
    %Transaction{
      income: true,
      name: sequence(:name, &"transaction-#{&1}"),
      date: ~D[2011-05-18]
    }
  end

  def transaction_item_factory do
    %TransactionItem{
      name: sequence(:name, &"entry-#{&1}"),
      amount: "23.43"
    }
  end

  def calendar_event_factory do
    %CalendarEvent{
      date: ~D[2010-04-17],
      name: "some name",
      done: true,
      position: 42
    }
  end
end
