defmodule MovieforumWeb.PostController do
  use MovieforumWeb, :controller

  alias Movieforum.Posts
  alias Movieforum.TMDBs
  alias Movieforum.Posts.Post
  alias Movieforum.APIs

  action_fallback(MovieforumWeb.FallbackController)

  def get_recent_replyed_post_by_page(conn, %{"page_number" => page_number}) do
    # every page 20 posts, start from page 1
    posts = Posts.list_posts_by_updated_time()
    page_number = String.to_integer(page_number)
    posts = Enum.slice(posts, 20 * (page_number - 1), 20)
    render(conn, "index.json", posts: posts)
  end

  def index(conn, _params) do
    posts = Posts.list_posts()
    render(conn, "index.json", posts: posts)
  end

  def create(conn, %{"post" => post_params}) do
    # check tmdb_id not exists then add into the server
    tmdb = TMDBs.get_tmdb(post_params["tmdb_id"])

    if !tmdb do
      # json string
      detail = APIs.movie_detail(tmdb)
      TMDBs.create_tmdb(%{tmdb_id: post_params["tmdb_id"], detail_json: detail})
    end

    with {:ok, %Post{} = post} <- Posts.create_post(post_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", post_path(conn, :show, post))
      |> render("show.json", post: post)
    end
  end

  def show(conn, %{"id" => id}) do
    post = Posts.get_post!(id)
    render(conn, "show.json", post: post)
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    post = Posts.get_post!(id)

    with {:ok, %Post{} = post} <- Posts.update_post(post, post_params) do
      render(conn, "show.json", post: post)
    end
  end

  def delete(conn, %{"id" => id}) do
    post = Posts.get_post!(id)

    with {:ok, %Post{}} <- Posts.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end
end
