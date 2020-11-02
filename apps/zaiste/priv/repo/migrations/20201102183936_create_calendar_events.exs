defmodule Zaiste.Repo.Migrations.CreateCalendarEvents do
  use Ecto.Migration

  def change do
    create table(:calendar_events) do
      add :date, :date, null: false
      add :name, :string, null: false
      add :done, :boolean, default: false, null: false
      add :position, :integer

      timestamps()
    end

  end
end
