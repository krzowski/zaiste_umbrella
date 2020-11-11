# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of Mix.Config.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
use Mix.Config

# Configure Mix tasks and generators
config :zaiste,
  ecto_repos: [Zaiste.Repo]

config :zaiste_web,
  ecto_repos: [Zaiste.Repo],
  generators: [context_app: :zaiste]

# Configures the endpoint
config :zaiste_web, ZaisteWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "bPcJr8uppYbympGVXkVMYganbQrKHqJRk7++WWVmma+/8iRMrd5rMyP7pqg1pYlQ",
  render_errors: [view: ZaisteWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Zaiste.PubSub,
  live_view: [signing_salt: "VMb7OJPp"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
