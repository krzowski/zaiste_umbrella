defmodule Zaiste.ContactsTest do
  use Zaiste.DataCase

  alias Zaiste.Contacts

  describe "contacts" do
    alias Zaiste.Contacts.Contact

    @valid_attrs %{birthday: ~D[2010-04-17], name: "some name", nameday: ~D[2010-04-17], notes: "some notes"}
    @update_attrs %{birthday: ~D[2011-05-18], name: "some updated name", nameday: ~D[2011-05-18], notes: "some updated notes"}
    @invalid_attrs %{birthday: nil, name: nil, nameday: nil, notes: nil}

    def contact_fixture(attrs \\ %{}) do
      {:ok, contact} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Contacts.create_contact()

      contact
    end

    test "list_contacts/0 returns all contacts" do
      contact = contact_fixture()
      assert Contacts.list_contacts() == [contact]
    end

    test "get_contact!/1 returns the contact with given id" do
      contact = contact_fixture()
      assert Contacts.get_contact!(contact.id) == contact
    end

    test "create_contact/1 with valid data creates a contact" do
      assert {:ok, %Contact{} = contact} = Contacts.create_contact(@valid_attrs)
      assert contact.birthday == ~D[2010-04-17]
      assert contact.name == "some name"
      assert contact.nameday == ~D[2010-04-17]
      assert contact.notes == "some notes"
    end

    test "create_contact/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Contacts.create_contact(@invalid_attrs)
    end

    test "update_contact/2 with valid data updates the contact" do
      contact = contact_fixture()
      assert {:ok, %Contact{} = contact} = Contacts.update_contact(contact, @update_attrs)
      assert contact.birthday == ~D[2011-05-18]
      assert contact.name == "some updated name"
      assert contact.nameday == ~D[2011-05-18]
      assert contact.notes == "some updated notes"
    end

    test "update_contact/2 with invalid data returns error changeset" do
      contact = contact_fixture()
      assert {:error, %Ecto.Changeset{}} = Contacts.update_contact(contact, @invalid_attrs)
      assert contact == Contacts.get_contact!(contact.id)
    end

    test "delete_contact/1 deletes the contact" do
      contact = contact_fixture()
      assert {:ok, %Contact{}} = Contacts.delete_contact(contact)
      assert_raise Ecto.NoResultsError, fn -> Contacts.get_contact!(contact.id) end
    end

    test "change_contact/1 returns a contact changeset" do
      contact = contact_fixture()
      assert %Ecto.Changeset{} = Contacts.change_contact(contact)
    end
  end
end
