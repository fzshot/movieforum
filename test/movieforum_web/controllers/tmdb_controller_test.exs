defmodule MovieforumWeb.TMDBControllerTest do
  use MovieforumWeb.ConnCase

  alias Movieforum.TMDBs
  alias Movieforum.TMDBs.TMDB

  @create_attrs %{detail_json: "some detail_json", tmdb_id: "some tmdb_id"}
  @update_attrs %{detail_json: "some updated detail_json", tmdb_id: "some updated tmdb_id"}
  @invalid_attrs %{detail_json: nil, tmdb_id: nil}

  def fixture(:tmdb) do
    {:ok, tmdb} = TMDBs.create_tmdb(@create_attrs)
    tmdb
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tmdbs", %{conn: conn} do
      conn = get conn, tmdb_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create tmdb" do
    test "renders tmdb when data is valid", %{conn: conn} do
      conn = post conn, tmdb_path(conn, :create), tmdb: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, tmdb_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "detail_json" => "some detail_json",
        "tmdb_id" => "some tmdb_id"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, tmdb_path(conn, :create), tmdb: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update tmdb" do
    setup [:create_tmdb]

    test "renders tmdb when data is valid", %{conn: conn, tmdb: %TMDB{id: id} = tmdb} do
      conn = put conn, tmdb_path(conn, :update, tmdb), tmdb: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, tmdb_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "detail_json" => "some updated detail_json",
        "tmdb_id" => "some updated tmdb_id"}
    end

    test "renders errors when data is invalid", %{conn: conn, tmdb: tmdb} do
      conn = put conn, tmdb_path(conn, :update, tmdb), tmdb: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete tmdb" do
    setup [:create_tmdb]

    test "deletes chosen tmdb", %{conn: conn, tmdb: tmdb} do
      conn = delete conn, tmdb_path(conn, :delete, tmdb)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, tmdb_path(conn, :show, tmdb)
      end
    end
  end

  defp create_tmdb(_) do
    tmdb = fixture(:tmdb)
    {:ok, tmdb: tmdb}
  end
end
