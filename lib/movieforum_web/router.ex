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

  scope "/api/v1", MovieforumWeb do
    pipe_through(:api)

    post("/token", TokenController, :create)

    resources("/users", UserController, except: [:new, :edit, :delete])
    resources("/posts", PostController, except: [:new, :edit, :delete])
    resources("/tmdbs", TMDBController, except: [:new, :edit, :delete])
    resources("/replys", ReplyController, except: [:new, :edit, :delete])

    get(
      "/recent_replyed_post/page/:page_number",
      PostController,
      :get_recent_replyed_post_by_page
    )

    get("/stats/posts_number", PostController, :post_numbers)

    get("/search/:movie_name", APIController, :search_movies)
    get("/discover/recent_movies", APIController, :recent_movies)
  end

  scope "/", MovieforumWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/*path", PageController, :index)
  end

end
