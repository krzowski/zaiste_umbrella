defmodule Zaiste.Repo do
  use Ecto.Repo,
    otp_app: :zaiste,
    adapter: Ecto.Adapters.Postgres
end
