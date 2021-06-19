defmodule ZaisteWeb.SessionControllerTest do
  use ZaisteWeb.ConnCase

  alias Zaiste.Account
  alias Plug.Test

  @create_user_attrs %{
    email: "test@example.com",
    password: "password"
  }

  def fixture(:user) do
    {:ok, user} = Account.create_user(@create_user_attrs)
    user
  end

  setup %{conn: conn} do
    {:ok, conn: conn, current_user: current_user} = setup_current_user(conn)
    {:ok, conn: put_req_header(conn, "accept", "application/json"), current_user: current_user}
  end

  describe "create session" do
    test "returns user with valid credentials", %{conn: conn, current_user: current_user} do
      conn =
        post(
          conn,
          Routes.session_path(conn, :create, %{
            email: current_user.email,
            password: @create_user_attrs.password
          })
        )

      assert response(conn, 204)
      assert get_session(conn, "current_user_id")
    end

    test "returns error with invalid credentials", %{conn: conn, current_user: current_user} do
      conn =
        post(
          conn,
          Routes.session_path(conn, :create, %{
            email: current_user.email,
            password: "nah"
          })
        )

      assert json_response(conn, 401) == %{
               "errors" => %{"details" => "Wrong email or password"}
             }
    end
  end

  describe "delete session" do
    test "deletes session", %{conn: conn} do
      put_session(conn, "current_user_id", 32)

      conn = delete(conn, Routes.session_path(conn, :delete))
      assert response(conn, 204)

      refute get_session(conn, "current_user_id")
    end
  end

  defp setup_current_user(conn) do
    current_user = fixture(:user)

    {
      :ok,
      conn: Test.init_test_session(conn, current_user_id: current_user.id),
      current_user: current_user
    }
  end
end
