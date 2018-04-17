defmodule Movieforum.Replys do
  @moduledoc """
  The Replys context.
  """

  import Ecto.Query, warn: false
  alias Movieforum.Repo

  alias Movieforum.Replys.Reply
  alias Movieforum.Posts

  @doc """
  Returns the list of replys.

  ## Examples

      iex> list_replys()
      [%Reply{}, ...]

  """
  def list_replys do
    Repo.all(Reply)
    |> Repo.preload(:user)

    # |> Repo.preload(:post)
  end

  @doc """
  Gets a single reply.

  Raises `Ecto.NoResultsError` if the Reply does not exist.

  ## Examples

      iex> get_reply!(123)
      %Reply{}

      iex> get_reply!(456)
      ** (Ecto.NoResultsError)

  """
  def get_reply!(id), do: Repo.get!(Reply, id) |> Repo.preload(:user) |> Repo.preload(:post)

  @doc """
  Creates a reply.

  ## Examples

      iex> create_reply(%{field: value})
      {:ok, %Reply{}}

      iex> create_reply(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_reply(attrs \\ %{}) do
    x =
      %Reply{}
      |> Reply.changeset(attrs)
      |> Repo.insert()

    {:ok, pp} = x
    # change the post
    post = Posts.get_post!(pp.post_id)
    p = Ecto.Changeset.change(post, floor: post.floor + 1)
    Repo.update(p)
    x
  end

  @doc """
  Updates a reply.

  ## Examples

      iex> update_reply(reply, %{field: new_value})
      {:ok, %Reply{}}

      iex> update_reply(reply, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_reply(%Reply{} = reply, attrs) do
    reply
    |> Reply.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Reply.

  ## Examples

      iex> delete_reply(reply)
      {:ok, %Reply{}}

      iex> delete_reply(reply)
      {:error, %Ecto.Changeset{}}

  """
  def delete_reply(%Reply{} = reply) do
    Repo.delete(reply)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking reply changes.

  ## Examples

      iex> change_reply(reply)
      %Ecto.Changeset{source: %Reply{}}

  """
  def change_reply(%Reply{} = reply) do
    Reply.changeset(reply, %{})
  end
end
