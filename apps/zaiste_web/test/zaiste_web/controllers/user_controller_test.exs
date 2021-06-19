defmodule ZaisteWeb.UserControllerTest do
  use ZaisteWeb.ConnCase

  alias Zaiste.Account

  @create_attrs %{
    email: "test@example.com",
    password: "password"
  }
  @invalid_attrs %{
    email: nil,
    password: nil
  }

  def fixture(:user) do
    {:ok, user} = Account.create_user(@create_attrs)
    user
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post(conn, Routes.user_path(conn, :create), user: @create_attrs)

      assert %{
               "id" => _id,
               "email" => "test@example.com"
             } = json_response(conn, 201)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.user_path(conn, :create), user: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end
end
