defmodule Zaiste.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Zaiste.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Zaiste.PubSub}
      # Start a worker by calling: Zaiste.Worker.start_link(arg)
      # {Zaiste.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: Zaiste.Supervisor)
  end
end
