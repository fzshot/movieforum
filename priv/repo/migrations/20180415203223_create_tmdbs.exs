defmodule Movieforum.Repo.Migrations.CreateTmdbs do
  use Ecto.Migration

  def change do
    create table(:tmdbs) do
      add(:tmdb_id, :string, null: false)
      add(:detail_json, :text, null: false)

      timestamps()
    end
  end
end
