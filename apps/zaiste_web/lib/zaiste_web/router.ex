defmodule ZaisteWeb.Router do
  use ZaisteWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  pipeline :api_auth do
    plug :ensure_authenticated
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: ZaisteWeb.Telemetry
    end
  end

  scope "/api" do
    pipe_through :api

    resources "/users", ZaisteWeb.UserController, only: [:create, :show]

    post "/sign_in", ZaisteWeb.SessionController, :create
    delete "/sign_out", ZaisteWeb.SessionController, :delete
  end

  scope "/api" do
    pipe_through [:api, :api_auth]

    get "/calendar_events/month_events", ZaisteWeb.CalendarEventController, :month_events

    resources "/calendar_events", ZaisteWeb.CalendarEventController,
      only: [:show, :create, :update, :delete]

    resources "/transactions", ZaisteWeb.TransactionController, except: [:new, :edit]
    get "/wallet/month", ZaisteWeb.WalletController, :month_events
  end

  scope "/", ZaisteWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

  # Plug function
  defp ensure_authenticated(conn, _opts) do
    current_user_id = get_session(conn, :current_user_id)

    if current_user_id do
      conn
    else
      conn
      |> put_status(:unauthorized)
      |> put_view(ZaisteWeb.ErrorView)
      |> render("401.json", message: "Unauthenticated user")
      |> halt()
    end
  end
end
