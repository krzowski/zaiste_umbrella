defmodule Zaiste.Repo.Migrations.CreateContacts do
  use Ecto.Migration

  def change do
    create table(:contacts) do
      add :name, :string, null: false
      add :birthday, :date
      add :nameday, :date
      add :notes, :text
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:contacts, [:user_id])
  end
end
