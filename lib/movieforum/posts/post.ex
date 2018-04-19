defmodule Movieforum.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field(:content, :string)
    field(:title, :string)
    field(:floor, :integer)
    belongs_to(:tmdb, Movieforum.TMDBs.TMDB)
    belongs_to(:user, Movieforum.Users.User)

    has_many(:replys, Movieforum.Replys.Reply)
    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :tmdb_id, :content, :user_id])
    |> validate_required([:title, :tmdb_id, :content, :user_id])
  end
end
