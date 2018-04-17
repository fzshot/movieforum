defmodule MovieforumWeb.ReplyView do
  use MovieforumWeb, :view
  alias MovieforumWeb.ReplyView

  def render("index.json", %{replys: replys}) do
    %{data: render_many(replys, ReplyView, "reply.json")}
  end

  def render("show.json", %{reply: reply}) do
    %{data: render_one(reply, ReplyView, "reply.json")}
  end

  def render("reply.json", %{reply: reply}) do
    %{
      id: reply.id,
      content: reply.content,
      reply_time: reply.inserted_at,
      update_time: reply.updated_at,
      user: render_one(reply.user, UserView, "user.json"),
      post_id: reply.post_id
    }
  end
end
