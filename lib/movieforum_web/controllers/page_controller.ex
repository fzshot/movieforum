defmodule MovieforumWeb.PageController do
  use MovieforumWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
