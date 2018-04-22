defmodule MovieforumWeb.PostController do
  use MovieforumWeb, :controller

  alias Movieforum.Posts
  alias Movieforum.TMDBs
  alias Movieforum.TMDBs.TMDB
  alias Movieforum.Posts.Post
  alias Movieforum.APIs
  alias Movieforum.Repo

  action_fallback(MovieforumWeb.FallbackController)

  def post_numbers(conn, _params) do
    posts = Posts.list_posts()
    render(conn, "post_number.json", number: length(posts))
  end

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

  def create(conn, %{"post" => post_params, "token" => token}) do
    case Phoenix.Token.verify(conn, "auth token", token["token"], max_age: 86400) do
      {:ok, user_id} ->
        if token["user_id"] != user_id do
          {:error, "token error"}
        else
          # check tmdb_id not exists then add into the server
          tmdb = TMDBs.get_tmdb_by_tmdbid(Integer.to_string(post_params["tmdb_id"]))

          right_tmdbid =
          if tmdb == [] do
            # json string
            detail = APIs.movie_detail(post_params["tmdb_id"])
            |> IO.inspect
            {:ok, %TMDB{} = y} = TMDBs.create_tmdb(%{tmdb_id: Integer.to_string(post_params["tmdb_id"]), detail_json: detail})
            |> IO.inspect
            y.id
          else
            List.first(tmdb)
          end

          post_params = post_params
          |> Map.put("tmdb_id", right_tmdbid)

          with {:ok, %Post{} = post} <- Posts.create_post(post_params) do
            post = post
            |> Repo.preload(:user)
            |> Repo.preload(:tmdb)
            conn
            |> put_status(:created)
            |> put_resp_header("location", post_path(conn, :show, post))
            |> render("show.json", post: post)
          end
        end
      {:error, _} ->
        {:error, "token error"}
    end

  end

  def show(conn, %{"id" => id}) do
    post = Posts.get_post!(id)
    render(conn, "show.json", post: post)
  end

  def update(conn, %{"id" => id, "post" => post_params, "token" => token}) do
    post = Posts.get_post!(id)

    case Phoenix.Token.verify(conn, "auth token", token["token"], max_age: 86400) do
      {:ok, user_id} ->
        if post.user.id != user_id do
          {:error, "token error"}
        else
          with {:ok, %Post{} = post} <- Posts.update_post(post, post_params) do
            render(conn, "show.json", post: post)
          end
        end
      {:error, _} ->
        {:error, "token error"}
    end
  end

  def delete(conn, %{"id" => id}) do
    post = Posts.get_post!(id)

    with {:ok, %Post{}} <- Posts.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end
end
