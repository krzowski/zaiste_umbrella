defmodule ZaisteWeb.ContactView do
  use ZaisteWeb, :view
  alias ZaisteWeb.ContactView

  def render("index.json", %{contacts: contacts}) do
    %{data: render_many(contacts, ContactView, "contact.json")}
  end

  def render("show.json", %{contact: contact}) do
    %{data: render_one(contact, ContactView, "contact.json")}
  end

  def render("contact.json", %{contact: contact}) do
    %{id: contact.id,
      name: contact.name,
      birthday: contact.birthday,
      nameday: contact.nameday,
      notes: contact.notes}
  end
end
