defmodule MovieforumWeb.ReplyController do
  use MovieforumWeb, :controller

  alias Movieforum.Replys
  alias Movieforum.Replys.Reply

  action_fallback MovieforumWeb.FallbackController

  def index(conn, _params) do
    replys = Replys.list_replys()
    render(conn, "index.json", replys: replys)
  end

  def create(conn, %{"reply" => reply_params}) do
    with {:ok, %Reply{} = reply} <- Replys.create_reply(reply_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", reply_path(conn, :show, reply))
      |> render("show.json", reply: reply)
    end
  end

  def show(conn, %{"id" => id}) do
    reply = Replys.get_reply!(id)
    render(conn, "show.json", reply: reply)
  end

  def update(conn, %{"id" => id, "reply" => reply_params}) do
    reply = Replys.get_reply!(id)

    with {:ok, %Reply{} = reply} <- Replys.update_reply(reply, reply_params) do
      render(conn, "show.json", reply: reply)
    end
  end

  def delete(conn, %{"id" => id}) do
    reply = Replys.get_reply!(id)
    with {:ok, %Reply{}} <- Replys.delete_reply(reply) do
      send_resp(conn, :no_content, "")
    end
  end
end
