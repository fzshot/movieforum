defmodule MovieforumWeb.APIView do
  use MovieforumWeb, :view
  alias MovieforumWeb.APIView

  def render("search_movies.json", %{movies: movies}) do
    %{data: render_many(movies, APIView, "search_movie.json")}
  end

  def render("search_movie.json", %{api: api}) do
    api
  end
end
