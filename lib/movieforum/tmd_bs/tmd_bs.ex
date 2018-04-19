defmodule Movieforum.TMDBs do
  @moduledoc """
  The TMDBs context.
  """

  import Ecto.Query, warn: false
  alias Movieforum.Repo

  alias Movieforum.TMDBs.TMDB

  @doc """
  Returns the list of tmdbs.

  ## Examples

      iex> list_tmdbs()
      [%TMDB{}, ...]

  """
  def list_tmdbs do
    Repo.all(TMDB)
  end

  @doc """
  Gets a single tmdb.

  Raises `Ecto.NoResultsError` if the Tmdb does not exist.

  ## Examples

      iex> get_tmdb!(123)
      %TMDB{}

      iex> get_tmdb!(456)
      ** (Ecto.NoResultsError)

  """
  def get_tmdb!(id), do: Repo.get!(TMDB, id)
  def get_tmdb(id), do: Repo.get(TMDB, id)

  # return [id] or []
  def get_tmdb_by_tmdbid(tmdb_id) do
    query = from(tmdb in "tmdbs", where: tmdb.tmdb_id == ^tmdb_id, select: tmdb.id)
    Repo.all(query)
  end

  @doc """
  Creates a tmdb.

  ## Examples

      iex> create_tmdb(%{field: value})
      {:ok, %TMDB{}}

      iex> create_tmdb(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_tmdb(attrs \\ %{}) do
    %TMDB{}
    |> TMDB.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a tmdb.

  ## Examples

      iex> update_tmdb(tmdb, %{field: new_value})
      {:ok, %TMDB{}}

      iex> update_tmdb(tmdb, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_tmdb(%TMDB{} = tmdb, attrs) do
    tmdb
    |> TMDB.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a TMDB.

  ## Examples

      iex> delete_tmdb(tmdb)
      {:ok, %TMDB{}}

      iex> delete_tmdb(tmdb)
      {:error, %Ecto.Changeset{}}

  """
  def delete_tmdb(%TMDB{} = tmdb) do
    Repo.delete(tmdb)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking tmdb changes.

  ## Examples

      iex> change_tmdb(tmdb)
      %Ecto.Changeset{source: %TMDB{}}

  """
  def change_tmdb(%TMDB{} = tmdb) do
    TMDB.changeset(tmdb, %{})
  end
end
