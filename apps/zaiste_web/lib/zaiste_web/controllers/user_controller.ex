defmodule ZaisteWeb.UserController do
  use ZaisteWeb, :controller

  alias Zaiste.Account
  alias Zaiste.Account.User

  action_fallback ZaisteWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Account.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_view(ZaisteWeb.UserView)
      |> render("show.json", user: user)
    end
  end
end
