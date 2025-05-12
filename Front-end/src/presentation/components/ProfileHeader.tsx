import React from "react";
import Cafe from "../images/Cafe.jpg";
import {User} from "@auth0/auth0-react";


const ProfileHeader: React.FC<{ user: User }> = ({user}) => {
  return (
    <>
      <div className="relative h-60 bg-amber-900">
        <img src={Cafe} alt="Profile banner" className="w-full h-full object-cover"/>
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={user?.picture}
            alt={user?.name}
            referrerPolicy="no-referrer"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      <div className="mt-20 text-center px-4">
        <h2 className="text-3xl font-bold text-amber-900">{user?.name}</h2>
        <p className="text-gray-700 mt-2">
          Lover of books, curious mind, occasional writer. 📚✨
        </p>
      </div>
    </>
  );
};

export default ProfileHeader;
