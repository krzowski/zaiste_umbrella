defmodule Zaiste.WalletTest do
  use Zaiste.DataCase

  alias Zaiste.Wallet

  describe "expenses" do
    alias Zaiste.Wallet.Expense

    @valid_attrs %{date: ~D[2010-04-17], name: "some name"}
    @update_attrs %{date: ~D[2011-05-18], name: "some updated name"}
    @invalid_attrs %{date: nil, name: nil}

    def expense_fixture(attrs \\ %{}) do
      {:ok, expense} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Wallet.create_expense()

      expense
    end

    test "list_expenses/0 returns all expenses" do
      expense = expense_fixture()
      assert Wallet.list_expenses() == [expense]
    end

    test "list_expenses_in_month/1 returns all expenses in a month of a given date, sorted by date" do
      included_expense2 = expense_fixture(date: ~D[2010-05-12])
      included_expense1 = expense_fixture(date: ~D[2010-05-11])
      _excluded_expense = expense_fixture(date: ~D[2010-06-12])
      date = included_expense1.date

      assert Wallet.list_expenses_in_month(date) == [
               included_expense1,
               included_expense2
             ]
    end

    test "get_expense!/1 returns the expense with given id" do
      expense = expense_fixture()
      assert Wallet.get_expense!(expense.id) == expense
    end

    test "create_expense/1 with valid data creates a expense" do
      assert {:ok, %Expense{} = expense} = Wallet.create_expense(@valid_attrs)
      assert expense.date == ~D[2010-04-17]
      assert expense.name == "some name"
    end

    test "create_expense/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Wallet.create_expense(@invalid_attrs)
    end

    test "update_expense/2 with valid data updates the expense" do
      expense = expense_fixture()
      assert {:ok, %Expense{} = expense} = Wallet.update_expense(expense, @update_attrs)
      assert expense.date == ~D[2011-05-18]
      assert expense.name == "some updated name"
    end

    test "update_expense/2 with invalid data returns error changeset" do
      expense = expense_fixture()
      assert {:error, %Ecto.Changeset{}} = Wallet.update_expense(expense, @invalid_attrs)
      assert expense == Wallet.get_expense!(expense.id)
    end

    test "delete_expense/1 deletes the expense" do
      expense = expense_fixture()
      assert {:ok, %Expense{}} = Wallet.delete_expense(expense)
      assert_raise Ecto.NoResultsError, fn -> Wallet.get_expense!(expense.id) end
    end

    test "change_expense/1 returns a expense changeset" do
      expense = expense_fixture()
      assert %Ecto.Changeset{} = Wallet.change_expense(expense)
    end
  end
end
