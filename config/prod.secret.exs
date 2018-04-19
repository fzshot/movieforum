use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.

# You can generate a new secret by running:
#
#     mix phx.gen.secret
config :movieforum, MovieforumWeb.Endpoint,
  secret_key_base: "2S/xtUku51exXJ5GI+8q1nXEGEW3KITO+10zhKTer3VvoRfC6CgD9gyG/eBZN54z"

# Configure your database
config :movieforum, Movieforum.Endpoint,
  adapter: Ecto.Adapters.Postgres,
  username: "movieforum",
  password: "egeocahcoMeiGh7",
  database: "movieforum_prod",
  size: 20 # The amount of database connections in the pool
