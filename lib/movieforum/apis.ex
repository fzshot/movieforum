defmodule Movieforum.APIs do
  def tmdb_api_key() do
    "864fe4c5e0531ee91e15a17f6704b16a"
  end

  # https://api.themoviedb.org/3/search/movie?api_key=12345&query=Jack+Reacher
  def search_movies(movie_name) do
    key = tmdb_api_key()
    name = String.replace(movie_name, " ", "+")
    url = "https://api.themoviedb.org/3/search/movie?api_key=#{key}&query=#{name}"
    resp = HTTPoison.get!(url)

    if resp.status_code != 200 do
      {:error, "TMDB busy"}
    else
      body = Poison.decode!(resp.body)
      body["results"]
    end
  end
end
