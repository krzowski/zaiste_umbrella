ExUnit.start()
ExUnit.configure(timeout: :infinity)
Ecto.Adapters.SQL.Sandbox.mode(Zaiste.Repo, :manual)
