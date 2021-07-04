defmodule ZaisteWeb.TransactionControllerTest do
  use ZaisteWeb.ConnCase

  @create_attrs %{
    date: "20 / 06 / 2021",
    name: "some name",
    income: true
  }
  @update_attrs %{
    date: "21 / 06 / 2021",
    name: "some updated name",
    income: false
  }
  @invalid_attrs %{date: nil, name: nil}

  setup %{conn: conn} do
    user = insert(:user)

    conn =
      conn
      |> Plug.Test.init_test_session(current_user_id: user.id)

    {:ok, conn: put_req_header(conn, "accept", "application/json"), user: user}
  end

  describe "index" do
    test "lists all transactions", %{conn: conn, user: user} do
      conn = get(conn, Routes.transaction_path(conn, :index))
      assert json_response(conn, 200)["data"] == []

      insert(:transaction, user_id: user.id)
      conn = get(conn, Routes.transaction_path(conn, :index))
      assert json_response(conn, 200)["data"] |> Enum.any?()
    end
  end

  describe "create transaction" do
    test "returns 201 with transaction json when data is valid", %{conn: conn} do
      conn = post(conn, Routes.transaction_path(conn, :create), transaction: @create_attrs)

      assert response(conn, 201)

      %{"id" => id} = json_response(conn, 201)["data"]

      assert %{
               "id" => id,
               "date" => "2021-06-20",
               "income" => true,
               "name" => "some name"
             } == json_response(conn, 201)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.transaction_path(conn, :create), transaction: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update transaction" do
    test "returns 200 when data is valid", %{conn: conn, user: user} do
      transaction = insert(:transaction, user_id: user.id)

      conn =
        put(conn, Routes.transaction_path(conn, :update, transaction), transaction: @update_attrs)

      assert response(conn, 200)

      %{"id" => id} = json_response(conn, 200)["data"]

      assert %{
               "id" => id,
               "date" => "2021-06-21",
               "income" => false,
               "name" => "some updated name"
             } == json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, user: user} do
      transaction = insert(:transaction, user_id: user.id)

      conn =
        put(conn, Routes.transaction_path(conn, :update, transaction), transaction: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete transaction" do
    test "deletes chosen transaction", %{conn: conn, user: user} do
      transaction = insert(:transaction, user_id: user.id)
      conn = delete(conn, Routes.transaction_path(conn, :delete, transaction))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.transaction_path(conn, :show, transaction))
      end
    end

    test "doesn't delete other user's transaction", %{conn: conn} do
      user2 = insert(:user)
      transaction = insert(:transaction, user_id: user2.id)

      assert_error_sent 404, fn ->
        delete(conn, Routes.transaction_path(conn, :delete, transaction))
      end
    end
  end
end
