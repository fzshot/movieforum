defmodule MovieforumWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use MovieforumWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(MovieforumWeb.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(MovieforumWeb.ErrorView, :"404")
  end

  def call(conn, {:error, "captcha error"}) do
    conn
    |> put_status(401)
    |> json %{myerror: "Are you sure you are Human? or Robot?"}
  end
end
