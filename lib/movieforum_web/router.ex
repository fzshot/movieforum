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
    resources("/posts", PostController, except: [:new, :edit])
    resources("/tmdbs", TMDBController, except: [:new, :edit])
    resources("/replys", ReplyController, except: [:new, :edit])

    get(
      "/recent_replyed_post/page/:page_number",
      PostController,
      :get_recent_replyed_post_by_page
    )

    get("/search/:movie_name", APIController, :search_movies)
    get("/discover/recent_movies", APIController, :recent_movies)
  end
end
