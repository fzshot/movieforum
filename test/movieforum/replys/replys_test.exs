defmodule Movieforum.ReplysTest do
  use Movieforum.DataCase

  alias Movieforum.Replys

  describe "replys" do
    alias Movieforum.Replys.Reply

    @valid_attrs %{content: "some content"}
    @update_attrs %{content: "some updated content"}
    @invalid_attrs %{content: nil}

    def reply_fixture(attrs \\ %{}) do
      {:ok, reply} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Replys.create_reply()

      reply
    end

    test "list_replys/0 returns all replys" do
      reply = reply_fixture()
      assert Replys.list_replys() == [reply]
    end

    test "get_reply!/1 returns the reply with given id" do
      reply = reply_fixture()
      assert Replys.get_reply!(reply.id) == reply
    end

    test "create_reply/1 with valid data creates a reply" do
      assert {:ok, %Reply{} = reply} = Replys.create_reply(@valid_attrs)
      assert reply.content == "some content"
    end

    test "create_reply/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Replys.create_reply(@invalid_attrs)
    end

    test "update_reply/2 with valid data updates the reply" do
      reply = reply_fixture()
      assert {:ok, reply} = Replys.update_reply(reply, @update_attrs)
      assert %Reply{} = reply
      assert reply.content == "some updated content"
    end

    test "update_reply/2 with invalid data returns error changeset" do
      reply = reply_fixture()
      assert {:error, %Ecto.Changeset{}} = Replys.update_reply(reply, @invalid_attrs)
      assert reply == Replys.get_reply!(reply.id)
    end

    test "delete_reply/1 deletes the reply" do
      reply = reply_fixture()
      assert {:ok, %Reply{}} = Replys.delete_reply(reply)
      assert_raise Ecto.NoResultsError, fn -> Replys.get_reply!(reply.id) end
    end

    test "change_reply/1 returns a reply changeset" do
      reply = reply_fixture()
      assert %Ecto.Changeset{} = Replys.change_reply(reply)
    end
  end
end
