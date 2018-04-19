defmodule MovieforumWeb.ReplyControllerTest do
  use MovieforumWeb.ConnCase

  alias Movieforum.Replys
  alias Movieforum.Replys.Reply

  @create_attrs %{content: "some content"}
  @update_attrs %{content: "some updated content"}
  @invalid_attrs %{content: nil}

  def fixture(:reply) do
    {:ok, reply} = Replys.create_reply(@create_attrs)
    reply
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all replys", %{conn: conn} do
      conn = get conn, reply_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create reply" do
    test "renders reply when data is valid", %{conn: conn} do
      conn = post conn, reply_path(conn, :create), reply: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, reply_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "content" => "some content"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, reply_path(conn, :create), reply: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update reply" do
    setup [:create_reply]

    test "renders reply when data is valid", %{conn: conn, reply: %Reply{id: id} = reply} do
      conn = put conn, reply_path(conn, :update, reply), reply: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, reply_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "content" => "some updated content"}
    end

    test "renders errors when data is invalid", %{conn: conn, reply: reply} do
      conn = put conn, reply_path(conn, :update, reply), reply: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete reply" do
    setup [:create_reply]

    test "deletes chosen reply", %{conn: conn, reply: reply} do
      conn = delete conn, reply_path(conn, :delete, reply)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, reply_path(conn, :show, reply)
      end
    end
  end

  defp create_reply(_) do
    reply = fixture(:reply)
    {:ok, reply: reply}
  end
end
