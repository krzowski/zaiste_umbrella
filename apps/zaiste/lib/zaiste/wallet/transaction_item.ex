defmodule Zaiste.Wallet.TransactionItem do
  use Ecto.Schema
  import Ecto.Changeset

  schema "transaction_items" do
    belongs_to :transaction, Zaiste.Wallet.Transaction
    field :amount, :decimal
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(transaction_item, attrs) do
    transaction_item
    |> cast(attrs, [:transaction_id, :name, :amount])
    |> validate_required([:transaction_id, :name, :amount])
  end
end
