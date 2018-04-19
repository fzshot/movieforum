defmodule MovieforumWeb.TMDBView do
  use MovieforumWeb, :view
  alias MovieforumWeb.TMDBView

  def render("index.json", %{tmdbs: tmdbs}) do
    %{data: render_many(tmdbs, TMDBView, "tmdb.json")}
  end

  def render("show.json", %{tmdb: tmdb}) do
    %{data: render_one(tmdb, TMDBView, "tmdb.json")}
  end

  def render("tmdb.json", %{tmdb: tmdb}) do
    %{id: tmdb.id, tmdb_id: tmdb.tmdb_id, detail_json: tmdb.detail_json}
  end
end
