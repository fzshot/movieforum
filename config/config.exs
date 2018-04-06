# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :movieforum,
  ecto_repos: [Movieforum.Repo]

# Configures the endpoint
config :movieforum, MovieforumWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Pz3OC1VzWiqNVQnZfLjPCxLlsMvSEwP2j5nyEXIgb9qjBwrELzo0masDGRr2JaPb",
  render_errors: [view: MovieforumWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Movieforum.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
