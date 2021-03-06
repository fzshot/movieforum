defmodule Movieforum.APIs do
  def tmdb_api_key() do
    "864fe4c5e0531ee91e15a17f6704b16a"
  end

  # https://api.themoviedb.org/3/discover/movie?api_key=123456&primary_release_date.gte=2018-04-01
  def discover_recent_movies() do
    # search this month's movies
    key = tmdb_api_key()
    {{year, month, _}, _} = :calendar.universal_time()

    date =
      if month < 10 do
        "#{year}-0#{month}-01"
      else
        "#{year}-#{month}-01"
      end

    url =
      "https://api.themoviedb.org/3/discover/movie?api_key=#{key}&primary_release_date.gte=#{date}"

    resp = HTTPoison.get!(url)

    if resp.status_code != 200 do
      {:error, "TMDB busy"}
    else
      body = Poison.decode!(resp.body)
      body["results"]
    end
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

  # https://api.themoviedb.org/3/movie/343611?api_key={api_key}
  def movie_detail(movie_id) do
    key = tmdb_api_key()
    url = "https://api.themoviedb.org/3/movie/#{movie_id}?api_key=#{key}"
    |> IO.inspect
    resp = HTTPoison.get!(url)
    |> IO.inspect

    if resp.status_code != 200 do
      {:error, "TMDB busy"}
    else
      # Poison.decode!(resp.body)
      resp.body
    end
  end
end
