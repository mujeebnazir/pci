"use client";
import React, { useState } from "react";
import { VscEdit, VscSave } from "react-icons/vsc";
import UserService from "@/lib/user";
interface ProfileProps {
  userInfo: {
    fullname?: string;
    email?: string;
    phone?: string;
    address?: string;
    [key: string]: any;
  } | null;
}

const Profile: React.FC<ProfileProps> = ({ userInfo }) => {
  if (!userInfo) {
    return <div>Loading user information...</div>;
  }
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main Street, Cityville",
    number: "+123456789",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
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
          className="p-1  scale-100 hover:scale-110 bg-black text-white text-sm rounded-md hover:bg-gray-700 focus:outline-none"
        >
          {isEditing ? (
            <VscSave size={26} className="self-center " />
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
            name="name"
            value={personalInfo.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full p-2  ${
              isEditing ? " border border-gray-300" : "text-lg font-semibold"
            } rounded-md bg-white `}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full p-2  ${
              isEditing ? " border border-gray-300" : "text-lg font-semibold"
            } rounded-md bg-white `}
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
            className={`mt-1 block w-full p-2  ${
              isEditing ? " border border-gray-300" : "text-lg font-semibold"
            } rounded-md bg-white `}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="number"
            value={personalInfo.number}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full p-2  ${
              isEditing ? " border border-gray-300" : "text-lg font-semibold"
            } rounded-md bg-white `}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
