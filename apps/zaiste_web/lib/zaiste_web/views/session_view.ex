defmodule ZaisteWeb.SessionView do
  use ZaisteWeb, :view

  def render("session.json", %{user: user}) do
    %{data: %{id: user.id, email: user.email}}
  end
end
