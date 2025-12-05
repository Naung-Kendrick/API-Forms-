import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../store";
import { useEffect, useState } from "react";
import { useUpdateUserInfoMutation } from "../store/appApi";
import { userLoggedOut } from "../store/authSlice";
import { Link } from "react-router-dom";

function AppIndex() {
  const { user } = useSelector((state: AppState) => state.auth);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const dispatch = useDispatch();
  const [updateInfo, { isLoading, isSuccess, error }] = useUpdateUserInfoMutation();

  useEffect(() => {
    if(!isLoading && isSuccess) {
      alert("Updated successfully!")
    }
    if (!isLoading && error) {
      alert((error as any).data.message)
    }
  }, [isSuccess, error, isLoading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !form.name.trim()) {
      alert("Please enter all fields");
      return;
    }
    await updateInfo(form);
  };

  return (
    <div className="max-w-xl min-w-lg mx-auto bg-white shadow rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-semibold">User Information</h1>

      <div className="my-3">
        <Link to={"/update-password"} className="underline underline-offset-4 text-blue-500">Update Password</Link>
      </div>

      {
        user?.role === 1 && (
          <Link to={"/user-list"} className="underline underline-offset-4 text-blue-500">User List</Link>
        )
      }

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={user?.role === 1 ? "Admin" : "User"}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            disabled
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>

      <div className="w-full flex justify-center mt-6">
        <button
          onClick={() => dispatch(userLoggedOut())}
          className="py-2 px-6 bg-red-500 text-white rounded-lg font-semibold cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AppIndex;