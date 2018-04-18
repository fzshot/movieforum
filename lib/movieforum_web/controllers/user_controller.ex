defmodule MovieforumWeb.UserController do
  use MovieforumWeb, :controller

  alias Movieforum.Users
  alias Movieforum.Users.User

  action_fallback(MovieforumWeb.FallbackController)

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def check_captcha(captch) do
    google_url = "https://www.google.com/recaptcha/api/siteverify"
    secret = "6LdcA1AUAAAAAMEYCFbrgURKIkPOArgeXvmmteNB"
    body = Poison.encode!(%{secret: secret, reponse: captch})
    resp = HTTPoison.post!(google_url, body)
    Poison.decode!(resp.body)["success"]
  end

  def create(conn, %{"user" => user_params}) do
    captcha = user_params["captcha"]
    pw = user_params["password"]

    cond do
      !check_captcha(captcha) ->
        {:error, "recaptcha not pass."}

      String.length(pw) < 8 ->
        {:error, "password shorter than 8 characters."}

      true ->
        pw_hash = Comeonin.Argon2.hashpwsalt(pw)

        user_params = %{
          name: user_params["name"],
          email: user_params["email"],
          password_hash: pw_hash
        }

        with {:ok, %User{} = user} <- Users.create_user(user_params) do
          conn
          |> put_status(:created)
          |> put_resp_header("location", user_path(conn, :show, user))
          |> render("show.json", user: user)
        end
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
