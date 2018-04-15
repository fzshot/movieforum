defmodule Movieforum.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add(:title, :string, null: false)
      add(:tmdb_id, references(:users, on_delete: :nothing))
      add(:content, :text, null: false)
      add(:user_id, references(:users, on_delete: :nothing))

      timestamps()
    end

    create(index(:posts, [:user_id]))
  end
end
