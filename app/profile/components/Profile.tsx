"use client";
import React, { useEffect, useState } from "react";
import { VscEdit, VscSave } from "react-icons/vsc";
import UserService from "@/lib/user";
import toast from "react-hot-toast";
import useAuthStore from "@/zustand/authStore";
interface UserInfo {
  fullname: string;
  email: string;
  address: string;
  phone: string;
}

const Profile: React.FC = () => {
  const authStore = useAuthStore();
  const [personalInfo, setPersonalInfo] = useState<UserInfo>({
    fullname: "",
    email: "",
    address: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const user: any = await authStore.checkUserStatus();
      if (user) {
        setPersonalInfo({
          fullname: user.fullname ?? "",
          email: user.email ?? "",
          address: user.address ?? "",
          phone: user.phone ?? "",
        });
      }
    })();
  }, []);

  const handleEdit = async () => {
    if (isEditing) {
      setIsSaving(true);
      try {
        await UserService.updateProfile(
          personalInfo.fullname,
          personalInfo.phone,
          personalInfo.address
        );
        toast.success("Profile updated successfully.");
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating your profile.");
      } finally {
        setIsSaving(false);
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-8 bg-white p-6 w-full border rounded shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Personal Info</h2>
        <button
          onClick={handleEdit}
          disabled={isSaving}
          className={`p-1 scale-100 hover:scale-110 bg-black text-white text-sm rounded-md hover:bg-gray-700 focus:outline-none ${
            isSaving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isEditing ? (
            <VscSave size={26} className="self-center" />
          ) : (
            <VscEdit size={26} className="self-center" />
          )}
        </button>
      </div>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="fullname"
            value={personalInfo.fullname}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full p-2 ${
              isEditing ? "border border-gray-300" : "text-lg font-semibold"
            } rounded-md bg-white`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={personalInfo.email}
            disabled={true}
            className="mt-1 block w-full p-2 text-lg font-semibold rounded-md bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={personalInfo.address}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full p-2 ${
              isEditing ? "border border-gray-300" : "text-lg font-semibold"
            } rounded-md bg-white`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full p-2 ${
              isEditing ? "border border-gray-300" : "text-lg font-semibold"
            } rounded-md bg-white`}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
