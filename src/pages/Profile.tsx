import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type StoredUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  state?: string;
  address?: string;
  age?: string | number;
  gender?: string;
  contactNumber?: string;
  birthDate?: string;
  profileImage?: string;
  agreed?: boolean;
};

const Profile = () => {
  const navigate = useNavigate();
  const [user] = useState<StoredUser | null>(() => {
    const savedUser = localStorage.getItem("user");
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (!savedUser || !isLoggedIn) {
      return null;
    }

    return JSON.parse(savedUser);
  });

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/", { replace: true });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-sm text-gray-600">
              Welcome back, {user.firstName || "User"}.
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
              {user.firstName || "-"}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="mt-1 text-lg font-semibold">{user.lastName || "-"}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="mt-1 text-lg font-semibold">{user.email || "-"}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">Contact</p>
            <p className="mt-1 text-lg font-semibold">
              {user.contactNumber || "-"}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">City</p>
            <p className="mt-1 text-lg font-semibold">{user.city || "-"}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">State</p>
            <p className="mt-1 text-lg font-semibold">{user.state || "-"}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">Birth Date</p>
            <p className="mt-1 text-lg font-semibold">
              {user.birthDate || "-"}
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">Profile Image</p>
            <p className="mt-1 text-lg font-semibold">
              {user.profileImage || "No file uploaded"}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border p-4">
          <p className="text-sm text-gray-500">Address</p>
          <p className="mt-1 text-base">{user.address || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
