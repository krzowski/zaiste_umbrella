defmodule Zaiste.Calendar.CalendarEvent do
  use Ecto.Schema
  import Ecto.Changeset

  schema "calendar_events" do
    field :date, :date
    field :done, :boolean, default: false
    field :name, :string
    field :position, :integer

    timestamps()
  end

  @doc false
  def changeset(calendar_event, attrs) do
    calendar_event
    |> cast(attrs, [:date, :name, :done, :position])
    |> validate_required([:date, :name])
  end
end
