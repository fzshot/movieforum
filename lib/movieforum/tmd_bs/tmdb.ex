defmodule Movieforum.TMDBs.TMDB do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tmdbs" do
    field :detail_json, :string
    field :tmdb_id, :string

    timestamps()
  end

  @doc false
  def changeset(tmdb, attrs) do
    tmdb
    |> cast(attrs, [:tmdb_id, :detail_json])
    |> validate_required([:tmdb_id, :detail_json])
  end
end
