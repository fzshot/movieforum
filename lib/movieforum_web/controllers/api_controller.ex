defmodule MovieforumWeb.APIController do
  use MovieforumWeb, :controller

  def search_movies(conn, %{"movie_name" => movie_name}) do
    # check have session
    # user_id = get_session(conn, :user_id)
    # just for test
    user_id = 1

    if user_id do
      # get TMDB data
      movies = Movieforum.APIs.search_movies(movie_name)
      # render json
      render(conn, "search_movies.json", movies: movies)
    end
  end
end
