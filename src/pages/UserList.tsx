import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../store/appApi";
import type { TUser } from "../types";

function UserList() {
  const { isLoading, error, data } = useGetAllUsersQuery();

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">Failed to load users.</div>
    );
  }

  return (
    <div className="w-fit p-6 h-screen overflow-auto">
        <div className="flex items-center gap-2 mb-3">
            <h1 className="text-2xl font-semibold">User List</h1>
            <Link to={"/"} className="text-blue-500 underline underline-offset-4">Home</Link>
        </div>

      <div className="rounded-lg">
        <table className=" border-collapse">
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.users?.map((user: TUser, index: number) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border text-center">
                  {user.role === 1 ? "Admin" : "User"}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-2 border text-center space-x-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      /* handleUpdateRole(user._id) */
                    }}
                  >
                    Update Role
                  </button>

                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                      /* handleDelete(user._id) */
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;