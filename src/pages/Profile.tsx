import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    navigate("/", { replace: true });
  };

  if (!auth.user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-sm text-gray-600">
              Welcome back, {auth.user.firstName || "User"}.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">First Name</p>
            <p className="mt-1 text-lg font-semibold">
              {auth.user.firstName || "-"}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="mt-1 text-lg font-semibold">
              {auth.user.lastName || "-"}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="mt-1 text-lg font-semibold">
              {auth.user.email || "-"}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">Contact</p>
            <p className="mt-1 text-lg font-semibold">
              {auth.user.contactNumber || "-"}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">City</p>
            <p className="mt-1 text-lg font-semibold">
              {auth.user.city || "-"}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">State</p>
            <p className="mt-1 text-lg font-semibold">
              {auth.user.state || "-"}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">Birth Date</p>
            <p className="mt-1 text-lg font-semibold">
              {auth.user.birthDate || "-"}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">Profile Image</p>
            <p className="mt-1 text-lg font-semibold">
              {auth.user.profileImage instanceof FileList
                ? auth.user.profileImage[0]?.name || "No file uploaded"
                : auth.user.profileImage || "No file uploaded"}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border p-4">
          <p className="text-sm text-gray-500">Address</p>
          <p className="mt-1 text-base">{auth.user.address || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
