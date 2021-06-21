defmodule Zaiste.AccountTest do
  use Zaiste.DataCase

  alias Zaiste.Account

  describe "users" do
    alias Zaiste.Account.User

    @valid_attrs %{email: "test@example.com", password: "password"}
    @update_attrs %{email: "test2@example.com", password: "newpassword"}
    @invalid_attrs %{email: "invalidemail"}

    test "list_users/0 returns all users" do
      insert(:user)
      assert Enum.any?(Account.list_users())
    end

    test "get_user!/1 returns the user with given id" do
      user = insert(:user)
      assert Account.get_user!(user.id) == %{user | password: nil}
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Account.create_user(@valid_attrs)
      assert user.email == "test@example.com"
      assert Bcrypt.verify_pass("password", user.password_hash)
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Account.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = insert(:user)
      assert {:ok, %User{} = user} = Account.update_user(user, @update_attrs)
      assert user.email == "test2@example.com"
      assert Bcrypt.verify_pass("newpassword", user.password_hash)
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = insert(:user)
      assert {:error, %Ecto.Changeset{}} = Account.update_user(user, @invalid_attrs)
      assert Account.get_user!(user.id) == %{user | password: nil}
    end

    test "delete_user/1 deletes the user" do
      user = insert(:user)
      assert {:ok, %User{}} = Account.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Account.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = insert(:user)
      assert %Ecto.Changeset{} = Account.change_user(user)
    end

    test "authenticate_user/2 authenticates the user" do
      password = "anotherpassword"
      {:ok, user} = Account.create_user(%{@valid_attrs | password: password})

      assert {:error, "Wrong email or password"} = Account.authenticate_user("noemail", "")
      assert {:error, "Wrong email or password"} = Account.authenticate_user(user.email, "")

      assert {:ok, authenticated_user} = Account.authenticate_user(user.email, password)

      assert authenticated_user == %{user | password: nil}
    end
  end
end
