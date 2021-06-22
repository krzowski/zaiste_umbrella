defmodule Zaiste.Wallet do
  @moduledoc """
  The Wallet context.
  """

  import Ecto.Query, warn: false
  alias Zaiste.Repo

  alias Zaiste.Wallet.Transaction
  alias Zaiste.Wallet.TransactionItem

  @doc """
  Returns the list of transactions.

  ## Examples

      iex> list_transactions()
      [%Transaction{}, ...]

  """
  def list_transactions(user_id) do
    query =
      from t in Transaction,
        where: t.user_id == ^user_id

    Repo.all(query)
  end

  @doc """
  Returns the list of transactions between dates.

  ## Examples

      iex> list_transactions_between_dates()
      [%Transaction{}, ...]

  """
  def list_transactions_between_dates(date_from, date_to, user_id) do
    query =
      from t in Transaction,
        where: t.user_id == ^user_id,
        where: fragment("? BETWEEN ? AND ?", t.date, ^date_from, ^date_to)

    Repo.all(query)
  end

  @doc """
  Gets a single transaction.

  Raises `Ecto.NoResultsError` if the Transaction does not exist.

  ## Examples

      iex> get_transaction!(123)
      %Transaction{}

      iex> get_transaction!(456)
      ** (Ecto.NoResultsError)

  """
  def get_transaction!(id, user_id) do
    Repo.get_by!(Transaction, id: id, user_id: user_id)
  end

  @doc """
  Creates a transaction.

  ## Examples

      iex> create_transaction(%{field: value})
      {:ok, %Transaction{}}

      iex> create_transaction(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_transaction(attrs \\ %{}) do
    %Transaction{}
    |> Transaction.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a transaction.

  ## Examples

      iex> update_transaction(transaction, %{field: new_value})
      {:ok, %Transaction{}}

      iex> update_transaction(transaction, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_transaction(%Transaction{} = transaction, attrs) do
    transaction
    |> Transaction.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a transaction.

  ## Examples

      iex> delete_transaction(transaction)
      {:ok, %Transaction{}}

      iex> delete_transaction(transaction)
      {:error, %Ecto.Changeset{}}

  """
  def delete_transaction(%Transaction{} = transaction) do
    Repo.delete(transaction)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking transaction changes.

  ## Examples

      iex> change_transaction(transaction)
      %Ecto.Changeset{data: %Transaction{}}

  """
  def change_transaction(%Transaction{} = transaction, attrs \\ %{}) do
    Transaction.changeset(transaction, attrs)
  end

  @doc """
  Gets a single transaction_item.

  Raises `Ecto.NoResultsError` if the Transaction item does not exist.

  ## Examples

      iex> get_transaction_item!(123)
      %TransactionItem{}

      iex> get_transaction_item!(456)
      ** (Ecto.NoResultsError)

  """
  def get_transaction_item!(id, transaction_id) do
    Repo.get_by!(TransactionItem, id: id, transaction_id: transaction_id)
  end

  @doc """
  Creates a transaction_item.

  ## Examples

      iex> create_transaction_item(%{field: value})
      {:ok, %TransactionItem{}}

      iex> create_transaction_item(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_transaction_item(attrs \\ %{}) do
    %TransactionItem{}
    |> TransactionItem.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Deletes a transaction_item.

  ## Examples

      iex> delete_transaction_item(transaction_item)
      {:ok, %TransactionItem{}}

      iex> delete_transaction_item(transaction_item)
      {:error, %Ecto.Changeset{}}

  """
  def delete_transaction_item(%TransactionItem{} = transaction_item) do
    Repo.delete(transaction_item)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking transaction_item changes.

  ## Examples

      iex> change_transaction_item(transaction_item)
      %Ecto.Changeset{data: %TransactionItem{}}

  """
  def change_transaction_item(%TransactionItem{} = transaction_item, attrs \\ %{}) do
    TransactionItem.changeset(transaction_item, attrs)
  end
end
