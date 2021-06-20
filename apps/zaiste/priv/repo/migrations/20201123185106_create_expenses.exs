defmodule Zaiste.Repo.Migrations.CreateExpenses do
  use Ecto.Migration

  def change do
    create table(:expenses) do
      add :date, :date
      add :name, :string

      timestamps()
    end
  end
end
