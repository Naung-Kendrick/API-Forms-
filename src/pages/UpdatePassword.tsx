import { useState } from "react";
import { useUpdateUserPasswordMutation } from "../store/appApi";
import { Link } from "react-router-dom";

function UpdatePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [updatePassword, { isLoading }] = useUpdateUserPasswordMutation();

  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    if (form.newPassword !== form.confirmPassword) {
      setMsg("New password and confirm password do not match.");
      return;
    }

    try {
      await updatePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      }).unwrap();

      setMsg("Password updated successfully!");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMsg("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="min-w-lg mx-auto bg-white shadow rounded-lg p-6 mt-6">
      <h1 className="text-xl font-semibold">Update Password</h1>

     <div className="my-3">
        <Link to={"/"} className="underline underline-offset-4 text-blue-500">Home</Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-indigo-300 focus:outline-none"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-indigo-300 focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-indigo-300 focus:outline-none"
          />
        </div>

        {/* Message */}
        {msg && (
          <p
            className={`text-sm ${
              msg.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 transition"
          }`}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;