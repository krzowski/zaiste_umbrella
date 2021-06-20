defmodule Zaiste.Repo.Migrations.TransactionBelongsToUserAndHasIncomeType do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add :user_id, references(:users), null: false
      add :income, :boolean, default: true, null: false
    end

    create index(:transactions, [:user_id])
  end
end
