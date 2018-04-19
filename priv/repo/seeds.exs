# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Movieforum.Repo.insert!(%Movieforum.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
  alias Movieforum.Repo
  alias Movieforum.Users.User
  alias Movieforum.Posts.Post
  alias Movieforum.Replys.Reply
  alias Movieforum.Replys
  alias Movieforum.TMDBs.TMDB

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")
    Repo.delete_all(User)

    a = Repo.insert!(%User{email: "alice@example.com", name: "alice", password_hash: p})

    # this will raise error for it is not a json.
    tmdb = Repo.insert!(%TMDB{tmdb_id: "100", detail_json: "test tmdb"})

    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})

    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})

    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})

    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})

    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    p1 = Repo.insert!(%Post{title: "title01", user_id: 1, tmdb_id: 1, content: "content test"})

    p2 = Repo.insert!(%Post{title: "title02", user_id: 1, tmdb_id: 1, content: "content test 2"})
    # cant test reply by direct insert
    # r1 = Repo.insert!(%Reply{user_id: 1, post_id: 2, content: "Some reply"})
    Replys.create_reply(%{user_id: 1, post_id: 2, content: "Some reply"})
  end
end

Seeds.run()
