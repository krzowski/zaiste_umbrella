defmodule Zaiste.WalletTest do
  use Zaiste.DataCase

  alias Zaiste.Wallet
  alias Zaiste.Wallet.Transaction
  alias Zaiste.Wallet.TransactionItem

  setup do
    user = insert(:user)
    %{user: user}
  end

  describe "transactions" do
    @valid_attrs %{date: ~D[2010-04-17], name: "some name", income: true}
    @update_attrs %{date: ~D[2011-05-18], name: "some updated name", income: false}
    @invalid_attrs %{date: nil, name: nil}

    test "list_transactions/0 returns all transactions", %{user: user} do
      transaction = insert(:transaction, user_id: user.id)
      assert Enum.any?(Wallet.list_transactions(transaction.user_id))
    end

    test "list_transactions_in_month/1 returns all transactions in a month of a given date, sorted by date",
         %{user: user} do
      included_transaction1 = insert(:transaction, user_id: user.id, date: ~D[2010-05-11])
      included_transaction2 = insert(:transaction, user_id: user.id, date: ~D[2010-05-12])
      _excluded_transaction = insert(:transaction, user_id: user.id, date: ~D[2010-06-12])

      date = included_transaction1.date

      assert Wallet.list_transactions_in_month(date, user.id) == [
               included_transaction1,
               included_transaction2
             ]
    end

    test "get_transaction!/1 returns the transaction with given id", %{user: user} do
      transaction = insert(:transaction, user_id: user.id)
      assert Wallet.get_transaction!(transaction.id, transaction.user_id) == transaction
    end

    test "create_transaction/1 with valid data creates a transaction", %{user: user} do
      assert {:ok, %Transaction{} = transaction} =
               Wallet.create_transaction(Map.put(@valid_attrs, :user_id, user.id))

      assert transaction.date == ~D[2010-04-17]
      assert transaction.name == "some name"
    end

    test "create_transaction/1 with invalid data returns error changeset", %{user: user} do
      assert {:error, %Ecto.Changeset{}} =
               Wallet.create_transaction(Map.put(@invalid_attrs, :user_id, user.id))
    end

    test "update_transaction/2 with valid data updates the transaction", %{user: user} do
      transaction = insert(:transaction, user_id: user.id)

      assert {:ok, %Transaction{} = transaction} =
               Wallet.update_transaction(transaction, @update_attrs)

      assert transaction.date == ~D[2011-05-18]
      assert transaction.name == "some updated name"
    end

    test "update_transaction/2 with invalid data returns error changeset", %{user: user} do
      transaction = insert(:transaction, user_id: user.id)
      assert {:error, %Ecto.Changeset{}} = Wallet.update_transaction(transaction, @invalid_attrs)
      assert transaction == Wallet.get_transaction!(transaction.id, transaction.user_id)
    end

    test "delete_transaction/1 deletes the transaction", %{user: user} do
      transaction = insert(:transaction, user_id: user.id)
      assert {:ok, %Transaction{}} = Wallet.delete_transaction(transaction)

      assert_raise Ecto.NoResultsError, fn ->
        Wallet.get_transaction!(transaction.id, transaction.user_id)
      end
    end

    test "change_transaction/1 returns a transaction changeset", %{user: user} do
      transaction = insert(:transaction, user_id: user.id)
      assert %Ecto.Changeset{} = Wallet.change_transaction(transaction)
    end
  end

  setup do
    user = insert(:user)
    transaction = insert(:transaction, user_id: user.id)
    %{transaction: transaction}
  end

  describe "transaction_items" do
    alias Zaiste.Wallet.TransactionItem

    @valid_attrs %{amount: "120.5", name: "some name"}
    @invalid_attrs %{amount: nil, name: nil}

    def transaction_item_fixture(attrs \\ %{}) do
      {:ok, transaction_item} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Wallet.create_transaction_item()

      transaction_item
    end

    test "get_transaction_item!/1 returns the transaction_item with given id", %{
      transaction: transaction
    } do
      transaction_item = insert(:transaction_item, transaction_id: transaction.id)
      assert Wallet.get_transaction_item!(transaction_item.id, transaction.id) == transaction_item
    end

    test "create_transaction_item/1 with valid data creates a transaction_item", %{
      transaction: transaction
    } do
      assert {:ok, %TransactionItem{} = transaction_item} =
               Wallet.create_transaction_item(
                 Map.put(@valid_attrs, :transaction_id, transaction.id)
               )

      assert transaction_item.amount == Decimal.new("120.5")
      assert transaction_item.name == "some name"
    end

    test "create_transaction_item/1 with invalid data returns error changeset", %{
      transaction: transaction
    } do
      assert {:error, %Ecto.Changeset{}} =
               Wallet.create_transaction_item(
                 Map.put(@invalid_attrs, :transaction_id, transaction.id)
               )
    end

    test "delete_transaction_item/1 deletes the transaction_item", %{transaction: transaction} do
      transaction_item = insert(:transaction_item, transaction_id: transaction.id)
      assert {:ok, %TransactionItem{}} = Wallet.delete_transaction_item(transaction_item)

      assert_raise Ecto.NoResultsError, fn ->
        Wallet.get_transaction_item!(transaction_item.id, transaction.id)
      end
    end

    test "change_transaction_item/1 returns a transaction_item changeset", %{
      transaction: transaction
    } do
      transaction_item = insert(:transaction_item, transaction_id: transaction.id)
      assert %Ecto.Changeset{} = Wallet.change_transaction_item(transaction_item)
    end
  end
end
