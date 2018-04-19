defmodule MovieforumWeb.TokenController do
  use MovieforumWeb, :controller

  alias Movieforum.Users
  alias Movieforum.Users.User

  action_fallback MovieforumWeb.FallbackController

  def check_captcha(captch) do
    google_url = "https://www.google.com/recaptcha/api/siteverify?"
    secret = "6LdcA1AUAAAAAMEYCFbrgURKIkPOArgeXvmmteNB"
    resp = HTTPoison.get!(google_url<>"secret="<>secret<>"&response="<>captch)
    Poison.decode!(resp.body)["success"]
  end

  def create(conn, %{"user" => user}) do
    IO.inspect(user)
    cond do
      !check_captcha(user["captcha"]) ->
        {:error, "captcha error"}
      true ->
        with {:ok, %User{} = user} <- Users.get_and_auth_user(user["email"], user["pass"]) do
          token = Phoenix.Token.sign(conn, "auth token", user.id)
          conn
          |> put_status(:created)
          |> render("token.json", user: user, token: token)
        end
    end
  end
end
