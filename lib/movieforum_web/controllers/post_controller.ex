defmodule MovieforumWeb.PostController do
  use MovieforumWeb, :controller

  alias Movieforum.Posts
  alias Movieforum.TMDBs
  alias Movieforum.Posts.Post
  alias Movieforum.APIs

  action_fallback(MovieforumWeb.FallbackController)

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
