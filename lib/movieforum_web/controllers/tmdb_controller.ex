defmodule MovieforumWeb.TMDBController do
  use MovieforumWeb, :controller

  alias Movieforum.TMDBs
  alias Movieforum.TMDBs.TMDB

  action_fallback MovieforumWeb.FallbackController

  def index(conn, _params) do
    tmdbs = TMDBs.list_tmdbs()
    render(conn, "index.json", tmdbs: tmdbs)
  end

  def create(conn, %{"tmdb" => tmdb_params}) do
    with {:ok, %TMDB{} = tmdb} <- TMDBs.create_tmdb(tmdb_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", tmdb_path(conn, :show, tmdb))
      |> render("show.json", tmdb: tmdb)
    end
  end

  def show(conn, %{"id" => id}) do
    tmdb = TMDBs.get_tmdb!(id)
    render(conn, "show.json", tmdb: tmdb)
  end

  def update(conn, %{"id" => id, "tmdb" => tmdb_params}) do
    tmdb = TMDBs.get_tmdb!(id)

    with {:ok, %TMDB{} = tmdb} <- TMDBs.update_tmdb(tmdb, tmdb_params) do
      render(conn, "show.json", tmdb: tmdb)
    end
  end

  def delete(conn, %{"id" => id}) do
    tmdb = TMDBs.get_tmdb!(id)
    with {:ok, %TMDB{}} <- TMDBs.delete_tmdb(tmdb) do
      send_resp(conn, :no_content, "")
    end
  end
end
