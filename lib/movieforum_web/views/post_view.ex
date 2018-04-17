defmodule MovieforumWeb.PostView do
  use MovieforumWeb, :view
  alias MovieforumWeb.PostView
  alias MovieforumWeb.UserView
  alias MovieforumWeb.TMDBView
  alias MovieforumWeb.ReplyView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("post_number.json", %{number: number}) do
    %{number: number}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    %{
      id: post.id,
      title: post.title,
      post_time: post.inserted_at,
      update_time: post.updated_at,
      # tmdb: render_one(post.tmdb, TMDBView, "tmdb.json"),
      content: post.content,
      user: render_one(post.user, UserView, "user.json"),
      # replys: render_many(post.replys, ReplyView, "reply.json")
    }
  end
end
