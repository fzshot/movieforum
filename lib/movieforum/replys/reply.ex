defmodule Movieforum.Replys.Reply do
  use Ecto.Schema
  import Ecto.Changeset

  schema "replys" do
    field(:content, :string)
    belongs_to(:user, Movieforum.Users.User)
    belongs_to(:post, Movieforum.Posts.Post)

    timestamps()
  end

  @doc false
  def changeset(reply, attrs) do
    reply
    |> cast(attrs, [:content, :post_id, :user_id])
    |> validate_required([:content, :post_id, :user_id])
  end
end
