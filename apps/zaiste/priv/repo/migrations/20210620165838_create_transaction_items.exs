defmodule Zaiste.Repo.Migrations.CreateTransactionItems do
  use Ecto.Migration

  def change do
    create table(:transaction_items) do
      add :transaction_id, references(:transactions, on_delete: :delete_all)
      add :name, :string, null: false
      add :amount, :decimal, null: false

      timestamps()
    end

    create index(:transaction_items, [:transaction_id])
  end
end
