defmodule Movieforum.TMDBsTest do
  use Movieforum.DataCase

  alias Movieforum.TMDBs

  describe "tmdbs" do
    alias Movieforum.TMDBs.TMDB

    @valid_attrs %{detail_json: "some detail_json", tmdb_id: "some tmdb_id"}
    @update_attrs %{detail_json: "some updated detail_json", tmdb_id: "some updated tmdb_id"}
    @invalid_attrs %{detail_json: nil, tmdb_id: nil}

    def tmdb_fixture(attrs \\ %{}) do
      {:ok, tmdb} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TMDBs.create_tmdb()

      tmdb
    end

    test "list_tmdbs/0 returns all tmdbs" do
      tmdb = tmdb_fixture()
      assert TMDBs.list_tmdbs() == [tmdb]
    end

    test "get_tmdb!/1 returns the tmdb with given id" do
      tmdb = tmdb_fixture()
      assert TMDBs.get_tmdb!(tmdb.id) == tmdb
    end

    test "create_tmdb/1 with valid data creates a tmdb" do
      assert {:ok, %TMDB{} = tmdb} = TMDBs.create_tmdb(@valid_attrs)
      assert tmdb.detail_json == "some detail_json"
      assert tmdb.tmdb_id == "some tmdb_id"
    end

    test "create_tmdb/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TMDBs.create_tmdb(@invalid_attrs)
    end

    test "update_tmdb/2 with valid data updates the tmdb" do
      tmdb = tmdb_fixture()
      assert {:ok, tmdb} = TMDBs.update_tmdb(tmdb, @update_attrs)
      assert %TMDB{} = tmdb
      assert tmdb.detail_json == "some updated detail_json"
      assert tmdb.tmdb_id == "some updated tmdb_id"
    end

    test "update_tmdb/2 with invalid data returns error changeset" do
      tmdb = tmdb_fixture()
      assert {:error, %Ecto.Changeset{}} = TMDBs.update_tmdb(tmdb, @invalid_attrs)
      assert tmdb == TMDBs.get_tmdb!(tmdb.id)
    end

    test "delete_tmdb/1 deletes the tmdb" do
      tmdb = tmdb_fixture()
      assert {:ok, %TMDB{}} = TMDBs.delete_tmdb(tmdb)
      assert_raise Ecto.NoResultsError, fn -> TMDBs.get_tmdb!(tmdb.id) end
    end

    test "change_tmdb/1 returns a tmdb changeset" do
      tmdb = tmdb_fixture()
      assert %Ecto.Changeset{} = TMDBs.change_tmdb(tmdb)
    end
  end
end
