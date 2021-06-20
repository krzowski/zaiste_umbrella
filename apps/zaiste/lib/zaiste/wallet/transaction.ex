defmodule Zaiste.Wallet.Transaction do
  use Ecto.Schema
  import Ecto.Changeset

  schema "transactions" do
    belongs_to :user, Zaiste.Account.User
    field :date, :date
    field :name, :string
    field :income, :boolean

    timestamps()
  end

  @doc false
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:user_id, :date, :name, :income])
    |> validate_required([:user_id, :date, :name])
  end
end
