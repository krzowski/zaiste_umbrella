defmodule Zaiste.Contacts.Contact do
  use Ecto.Schema
  import Ecto.Changeset

  schema "contacts" do
    belongs_to :user, Zaiste.Account.User
    field :birthday, :date
    field :name, :string
    field :nameday, :date
    field :notes, :string

    timestamps()
  end

  @doc false
  def changeset(contact, attrs) do
    contact
    |> cast(attrs, [:user_id, :name, :birthday, :nameday, :notes])
    |> validate_required([:user_id, :name])
  end
end
