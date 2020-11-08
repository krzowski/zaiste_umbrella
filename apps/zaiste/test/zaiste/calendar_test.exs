defmodule Zaiste.CalendarTest do
  use Zaiste.DataCase

  alias Zaiste.Calendar

  describe "calendar_events" do
    alias Zaiste.Calendar.CalendarEvent

    @valid_attrs %{date: ~D[2010-04-17], done: true, name: "some name", position: 42}
    @update_attrs %{date: ~D[2011-05-18], done: false, name: "some updated name", position: 43}
    @invalid_attrs %{date: nil, name: nil}

    def calendar_event_fixture(attrs \\ %{}) do
      {:ok, calendar_event} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Calendar.create_calendar_event()

      calendar_event
    end

    test "list_calendar_events/0 returns all calendar_events" do
      calendar_event = calendar_event_fixture()
      assert Calendar.list_calendar_events() == [calendar_event]
    end

    test "list_calendar_events_in_month/1 returns all calendar_events in a month of a given date, sorted by position" do
      included_calendar_event3 = calendar_event_fixture()
      included_calendar_event2 = calendar_event_fixture(position: 2)
      included_calendar_event1 = calendar_event_fixture(position: 1)
      _excluded_calendar_event = calendar_event_fixture(date: ~D[2010-05-12])
      date = included_calendar_event1.date

      assert Calendar.list_calendar_events_in_month(date) == [
               included_calendar_event1,
               included_calendar_event2,
               included_calendar_event3
             ]
    end

    test "get_calendar_event!/1 returns the calendar_event with given id" do
      calendar_event = calendar_event_fixture()
      assert Calendar.get_calendar_event!(calendar_event.id) == calendar_event
    end

    test "create_calendar_event/1 with valid data creates a calendar_event" do
      assert {:ok, %CalendarEvent{} = calendar_event} =
               Calendar.create_calendar_event(@valid_attrs)

      assert calendar_event.date == ~D[2010-04-17]
      assert calendar_event.done == true
      assert calendar_event.name == "some name"
      assert calendar_event.position == 42
    end

    test "create_calendar_event/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Calendar.create_calendar_event(@invalid_attrs)
    end

    test "update_calendar_event/2 with valid data updates the calendar_event" do
      calendar_event = calendar_event_fixture()

      assert {:ok, %CalendarEvent{} = calendar_event} =
               Calendar.update_calendar_event(calendar_event, @update_attrs)

      assert calendar_event.date == ~D[2011-05-18]
      assert calendar_event.done == false
      assert calendar_event.name == "some updated name"
      assert calendar_event.position == 43
    end

    test "update_calendar_event/2 with invalid data returns error changeset" do
      calendar_event = calendar_event_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Calendar.update_calendar_event(calendar_event, @invalid_attrs)

      assert calendar_event == Calendar.get_calendar_event!(calendar_event.id)
    end

    test "delete_calendar_event/1 deletes the calendar_event" do
      calendar_event = calendar_event_fixture()
      assert {:ok, %CalendarEvent{}} = Calendar.delete_calendar_event(calendar_event)
      assert_raise Ecto.NoResultsError, fn -> Calendar.get_calendar_event!(calendar_event.id) end
    end

    test "change_calendar_event/1 returns a calendar_event changeset" do
      calendar_event = calendar_event_fixture()
      assert %Ecto.Changeset{} = Calendar.change_calendar_event(calendar_event)
    end
  end
end
