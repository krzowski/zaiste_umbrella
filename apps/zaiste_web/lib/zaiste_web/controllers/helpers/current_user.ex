defmodule ZaisteWeb.Helpers.CurrentUser do
  defmacro __using__(_) do
    quote do
      # def action(%Plug.Conn{assigns: %{current_user_id: current_user_id}} = conn, _opts) do
      def action(conn, _opts) do
        current_user_id = get_session(conn, :current_user_id)
        current_user = Zaiste.Account.get_user!(current_user_id)
        apply(__MODULE__, action_name(conn), [conn, conn.params, current_user])
      end
    end
  end
end
