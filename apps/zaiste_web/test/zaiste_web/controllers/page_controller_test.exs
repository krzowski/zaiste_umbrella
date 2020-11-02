defmodule ZaisteWeb.PageControllerTest do
  use ZaisteWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "<div id=\"react\"></div>"
  end
end
