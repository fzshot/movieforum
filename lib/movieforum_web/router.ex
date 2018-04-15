defmodule MovieforumWeb.Router do
  use MovieforumWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", MovieforumWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/", PageController, :index)
    post("/session", SessionController, :create)
    delete("/session", SessionController, :delete)
  end

  scope "/api/v1", MovieforumWeb do
    pipe_through(:api)
    resources("/users", UserController, except: [:new, :edit])
    get("/search/:movie_name", APIController, :search_movies)
  end
end
