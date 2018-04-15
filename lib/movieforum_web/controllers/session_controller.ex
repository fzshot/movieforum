defmodule MovieforumWeb.SessionController do
  use MovieforumWeb, :controller
  alias Movieforum.Users.User

  def create(conn, %{"name" => name, "pass" => pass}) do
    with {:ok, %User{} = user} <- Movieforum.Users.get_and_auth_user(name, pass) do
      conn
      |> put_session(:user_id, user.id)
      |> put_flash(:info, "Welcome back #{user.name}")
      |> redirect(to: page_path(conn, :index))
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "Logged out")
    |> redirect(to: page_path(conn, :index))
  end
end
