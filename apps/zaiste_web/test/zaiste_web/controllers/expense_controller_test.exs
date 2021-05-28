defmodule ZaisteWeb.ExpenseControllerTest do
  use ZaisteWeb.ConnCase

  alias Zaiste.Wallet
  alias Zaiste.Wallet.Expense

  @create_attrs %{
    date: ~D[2010-04-17],
    name: "some name"
  }
  @update_attrs %{
    date: ~D[2011-05-18],
    name: "some updated name"
  }
  @invalid_attrs %{date: nil, name: nil}

  def fixture(:expense) do
    {:ok, expense} = Wallet.create_expense(@create_attrs)
    expense
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all expenses", %{conn: conn} do
      conn = get(conn, Routes.expense_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create expense" do
    test "renders expense when data is valid", %{conn: conn} do
      conn = post(conn, Routes.expense_path(conn, :create), expense: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.expense_path(conn, :show, id))

      assert %{
               "id" => id,
               "date" => "2010-04-17",
               "name" => "some name"
             } == json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.expense_path(conn, :create), expense: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update expense" do
    setup [:create_expense]

    test "renders expense when data is valid", %{conn: conn, expense: %Expense{id: id} = expense} do
      conn = put(conn, Routes.expense_path(conn, :update, expense), expense: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.expense_path(conn, :show, id))

      assert %{
               "id" => id,
               "date" => "2011-05-18",
               "name" => "some updated name"
             } == json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, expense: expense} do
      conn = put(conn, Routes.expense_path(conn, :update, expense), expense: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete expense" do
    setup [:create_expense]

    test "deletes chosen expense", %{conn: conn, expense: expense} do
      conn = delete(conn, Routes.expense_path(conn, :delete, expense))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.expense_path(conn, :show, expense))
      end
    end
  end

  defp create_expense(_) do
    expense = fixture(:expense)
    %{expense: expense}
  end
end
