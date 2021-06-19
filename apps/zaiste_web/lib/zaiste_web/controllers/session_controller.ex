defmodule ZaisteWeb.SessionController do
  use ZaisteWeb, :controller

  alias Zaiste.Account

  def create(conn, %{"email" => email, "password" => password}) do
    case Account.authenticate_user(email, password) do
      {:ok, user} ->
        conn
        |> put_session(:current_user_id, user.id)
        |> configure_session(renew: true)
        |> put_view(ZaisteWeb.SessionView)
        |> send_resp(:no_content, "")

      {:error, message} ->
        conn
        |> delete_session(:current_user_id)
        |> put_status(:unauthorized)
        |> put_view(ZaisteWeb.ErrorView)
        |> render("401.json", message: message)
    end
  end

  def delete(conn, _) do
    conn
    |> delete_session(:current_user_id)
    |> send_resp(:no_content, "")
  end
end
