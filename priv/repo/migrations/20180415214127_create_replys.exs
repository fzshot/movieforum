defmodule Movieforum.Repo.Migrations.CreateReplys do
  use Ecto.Migration

  def change do
    create table(:replys) do
      add(:content, :text, null: false)
      add(:user_id, references(:users, on_delete: :nothing))
      add(:post_id, references(:posts, on_delete: :nothing))

      timestamps()
    end

    create(index(:replys, [:user_id]))
    create(index(:replys, [:post_id]))
  end
end
