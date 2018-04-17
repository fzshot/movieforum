defmodule MovieforumWeb.TokenView do
  use MovieforumWeb, :view
  alias MovieforumWeb.TokenView

  def render("token.json", %{user: user, token: token}) do
    %{
      user_name: user.name,
      user_id: user.id,
      token: token,
    }
  end
end
