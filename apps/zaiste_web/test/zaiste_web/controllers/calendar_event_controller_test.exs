defmodule ZaisteWeb.CalendarEventControllerTest do
  use ZaisteWeb.ConnCase

  alias Zaiste.Calendar
  alias Zaiste.Calendar.CalendarEvent
  alias Zaiste.Account.User

  @create_attrs %{
    date: ~D[2010-04-17],
    done: true,
    name: "some name",
    position: 42
  }
  @update_attrs %{
    date: ~D[2011-05-18],
    done: false,
    name: "some updated name",
    position: 43
  }
  @invalid_attrs %{date: nil, done: nil, name: nil, position: nil}

  def fixture(:calendar_event) do
    {:ok, calendar_event} = Calendar.create_calendar_event(@create_attrs)
    calendar_event
  end

  setup %{conn: conn} do
    user =
      User.changeset(%User{}, %{email: "test@example.com", password: "password"})
      |> Zaiste.Repo.insert!()

    conn =
      conn
      |> Plug.Test.init_test_session(current_user_id: user.id)

    {:ok, conn: conn}
  end

  describe "create calendar_event" do
    test "renders calendar_event when data is valid", %{conn: conn} do
      conn = post(conn, Routes.calendar_event_path(conn, :create), calendar_event: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.calendar_event_path(conn, :show, id))

      assert %{
               "id" => id,
               "date" => "2010-04-17",
               "done" => true,
               "name" => "some name",
               "position" => 42
             } == json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.calendar_event_path(conn, :create), calendar_event: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update calendar_event" do
    setup [:create_calendar_event]

    test "renders calendar_event when data is valid", %{
      conn: conn,
      calendar_event: %CalendarEvent{id: id} = calendar_event
    } do
      conn =
        put(conn, Routes.calendar_event_path(conn, :update, calendar_event),
          calendar_event: @update_attrs
        )

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.calendar_event_path(conn, :show, id))

      assert %{
               "id" => id,
               "date" => "2011-05-18",
               "done" => false,
               "name" => "some updated name",
               "position" => 43
             } == json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, calendar_event: calendar_event} do
      conn =
        put(conn, Routes.calendar_event_path(conn, :update, calendar_event),
          calendar_event: @invalid_attrs
        )

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete calendar_event" do
    setup [:create_calendar_event]

    test "deletes chosen calendar_event", %{conn: conn, calendar_event: calendar_event} do
      conn = delete(conn, Routes.calendar_event_path(conn, :delete, calendar_event))
      assert response(conn, 204)
    end
  end

  describe "month_events" do
    test "returns events grouped by day", %{conn: conn} do
      {:ok, event1} = Calendar.create_calendar_event(%{date: ~D[2020-11-10], name: "cal1"})
      {:ok, event2} = Calendar.create_calendar_event(%{date: ~D[2020-11-02], name: "cal2"})

      conn = get(conn, Routes.calendar_event_path(conn, :month_events, %{date: "2020-11-06"}))

      assert [
               %{
                 "date" => "2020-11-02",
                 "events" => [
                   %{
                     "date" => "2020-11-02",
                     "done" => false,
                     "id" => event2.id,
                     "name" => "cal2",
                     "position" => nil
                   }
                 ]
               },
               %{
                 "date" => "2020-11-10",
                 "events" => [
                   %{
                     "date" => "2020-11-10",
                     "done" => false,
                     "id" => event1.id,
                     "name" => "cal1",
                     "position" => nil
                   }
                 ]
               }
             ] == json_response(conn, 200)["data"]
    end

    test "returns an empty list when there are no events in given month", %{conn: conn} do
      conn = get(conn, Routes.calendar_event_path(conn, :month_events, %{date: "2020-05-06"}))
      assert json_response(conn, 200)["data"] == []
    end

    test "returns an error when date format was invalid", %{conn: conn} do
      conn = get(conn, Routes.calendar_event_path(conn, :month_events, %{date: "31-03-2032"}))
      assert json_response(conn, 400)["errors"]["details"] == "Wrong date format"
    end
  end

  defp create_calendar_event(_) do
    calendar_event = fixture(:calendar_event)
    %{calendar_event: calendar_event}
  end
end
