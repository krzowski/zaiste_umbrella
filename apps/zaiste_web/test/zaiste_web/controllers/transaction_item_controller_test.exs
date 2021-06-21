defmodule ZaisteWeb.TransactionItemControllerTest do
  use ZaisteWeb.ConnCase

  @create_attrs %{
    amount: "120.5",
    name: "some name"
  }
  @invalid_attrs %{amount: nil, name: nil}

  setup %{conn: conn} do
    user = insert(:user)
    transaction = insert(:transaction, user_id: user.id)

    conn =
      conn
      |> Plug.Test.init_test_session(current_user_id: user.id)

    {:ok, conn: put_req_header(conn, "accept", "application/json"), transaction: transaction}
  end

  describe "create transaction_item" do
    test "renders transaction_item when data is valid", %{conn: conn, transaction: transaction} do
      conn =
        post(
          conn,
          Routes.transaction_transaction_item_path(conn, :create, transaction.id,
            transaction_item: @create_attrs
          )
        )

      assert conn.status == 204
    end

    test "renders errors when data is invalid", %{conn: conn, transaction: transaction} do
      conn =
        post(
          conn,
          Routes.transaction_transaction_item_path(conn, :create, transaction.id,
            transaction_item: @invalid_attrs
          )
        )

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete transaction_item" do
    test "deletes chosen transaction_item", %{conn: conn, transaction: transaction} do
      transaction_item = insert(:transaction_item, transaction_id: transaction.id)

      conn =
        delete(
          conn,
          Routes.transaction_transaction_item_path(
            conn,
            :delete,
            transaction.id,
            transaction_item.id
          )
        )

      assert conn.status == 204

      assert_error_sent 404, fn ->
        delete(
          conn,
          Routes.transaction_transaction_item_path(
            conn,
            :delete,
            transaction.id,
            transaction_item.id
          )
        )
      end
    end

    test "doens't delete transaction item that's not yours", %{
      conn: conn,
      transaction: transaction
    } do
      transaction_item = insert(:transaction_item, transaction_id: transaction.id)

      user2 = insert(:user)
      transaction2 = insert(:transaction, user_id: user2.id)

      assert_error_sent 404, fn ->
        delete(
          conn,
          Routes.transaction_transaction_item_path(
            conn,
            :delete,
            transaction2.id,
            transaction_item.id
          )
        )
      end
    end
  end
end
