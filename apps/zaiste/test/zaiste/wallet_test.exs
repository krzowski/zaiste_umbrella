defmodule Zaiste.WalletTest do
  use Zaiste.DataCase

  alias Zaiste.Wallet

  setup do
    {:ok, user} = Zaiste.Account.create_user(%{email: "test@example.com", password: "password"})
    [user: user]
  end

  describe "transactions" do
    alias Zaiste.Wallet.Transaction

    @valid_attrs %{date: ~D[2010-04-17], name: "some name", income: true}
    @update_attrs %{date: ~D[2011-05-18], name: "some updated name", income: false}
    @invalid_attrs %{date: nil, name: nil}

    def transaction_fixture(attrs \\ %{}) do
      {:ok, transaction} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Wallet.create_transaction()

      transaction
    end

    test "list_transactions/0 returns all transactions", context do
      transaction = transaction_fixture(user_id: context[:user].id)
      assert Wallet.list_transactions(transaction.user_id) == [transaction]
    end

    test "list_transactions_in_month/1 returns all transactions in a month of a given date, sorted by date",
         context do
      included_transaction2 =
        transaction_fixture(user_id: context[:user].id, date: ~D[2010-05-12])

      included_transaction1 =
        transaction_fixture(user_id: context[:user].id, date: ~D[2010-05-11])

      _excluded_transaction =
        transaction_fixture(user_id: context[:user].id, date: ~D[2010-06-12])

      date = included_transaction1.date

      assert Wallet.list_transactions_in_month(date, context[:user].id) == [
               included_transaction1,
               included_transaction2
             ]
    end

    test "get_transaction!/1 returns the transaction with given id", context do
      transaction = transaction_fixture(user_id: context[:user].id)
      assert Wallet.get_transaction!(transaction.id, transaction.user_id) == transaction
    end

    test "create_transaction/1 with valid data creates a transaction", context do
      assert {:ok, %Transaction{} = transaction} =
               Wallet.create_transaction(Map.put(@valid_attrs, :user_id, context[:user].id))

      assert transaction.date == ~D[2010-04-17]
      assert transaction.name == "some name"
    end

    test "create_transaction/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Wallet.create_transaction(@invalid_attrs)
    end

    test "update_transaction/2 with valid data updates the transaction", context do
      transaction = transaction_fixture(user_id: context[:user].id)

      assert {:ok, %Transaction{} = transaction} =
               Wallet.update_transaction(transaction, @update_attrs)

      assert transaction.date == ~D[2011-05-18]
      assert transaction.name == "some updated name"
    end

    test "update_transaction/2 with invalid data returns error changeset", context do
      transaction = transaction_fixture(user_id: context[:user].id)
      assert {:error, %Ecto.Changeset{}} = Wallet.update_transaction(transaction, @invalid_attrs)
      assert transaction == Wallet.get_transaction!(transaction.id, transaction.user_id)
    end

    test "delete_transaction/1 deletes the transaction", context do
      transaction = transaction_fixture(user_id: context[:user].id)
      assert {:ok, %Transaction{}} = Wallet.delete_transaction(transaction)

      assert_raise Ecto.NoResultsError, fn ->
        Wallet.get_transaction!(transaction.id, transaction.user_id)
      end
    end

    test "change_transaction/1 returns a transaction changeset", context do
      transaction = transaction_fixture(user_id: context[:user].id)
      assert %Ecto.Changeset{} = Wallet.change_transaction(transaction)
    end
  end
end
