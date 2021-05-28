defmodule Zaiste.Wallet.Expense do
  use Ecto.Schema
  import Ecto.Changeset

  schema "expenses" do
    field :date, :date
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(expense, attrs) do
    expense
    |> cast(attrs, [:date, :name])
    |> validate_required([:date, :name])
  end
end
