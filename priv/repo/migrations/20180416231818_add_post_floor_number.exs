defmodule Movieforum.Repo.Migrations.AddPostFloorNumber do
  use Ecto.Migration

  def change do
    alter table("posts") do
      add(:floor, :integer, default: 1)
    end
  end
end
