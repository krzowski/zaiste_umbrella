defmodule ZaisteWeb.WalletControllerTest do
  use ZaisteWeb.ConnCase

  setup %{conn: conn} do
    user = insert(:user)

    conn =
      conn
      |> Plug.Test.init_test_session(current_user_id: user.id)

    {:ok, conn: put_req_header(conn, "accept", "application/json"), user: user}
  end

  describe "transactions" do
    test "lists all transactions between dates", %{conn: conn, user: user} do
      transaction1 = insert(:transaction, user_id: user.id, date: ~D[2020-11-01])
      _transaction2 = insert(:transaction, user_id: user.id, date: ~D[2020-10-30])
      t_item = insert(:transaction_item, transaction_id: transaction1.id)

      conn =
        get(
          conn,
          Routes.wallet_path(conn, :transactions, %{
            date_from: "1 / 11 / 2020",
            date_to: "30 / 11 / 2020"
          })
        )

      {:ok, tdate1} = Timex.format(transaction1.date, "%Y-%m-%d", :strftime)

      assert json_response(conn, 200)["data"] == [
               %{
                 "date" => tdate1,
                 "id" => transaction1.id,
                 "income" => transaction1.income,
                 "name" => transaction1.name,
                 "transaction_items" => [
                   %{
                     "amount" => Decimal.to_string(t_item.amount),
                     "id" => t_item.id,
                     "name" => t_item.name
                   }
                 ]
               }
             ]

      conn =
        get(
          conn,
          Routes.wallet_path(conn, :transactions, %{
            date_from: "1 / 10 / 2020",
            date_to: "11 / 10 / 2020"
          })
        )

      assert json_response(conn, 200)["data"] == []
    end
  end
end
