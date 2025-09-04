import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Settings, Camera, Save, Edit3, Shield, Bell } from 'lucide-react';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    joinDate: 'January 2023',
    bio: 'Software developer and technology enthusiast. Passionate about web development and mobile app development.'
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    twoFactorAuth: true
  });

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Information updated successfully!');
  };

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Edit3 size={16} />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {userInfo.name.split(' ').map(n => n[0]).join('')}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-semibold mt-4 text-gray-800">{userInfo.name}</h2>
              <p className="text-gray-600">Premium Member</p>
            </div>

            {/* Profile Information */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User size={16} />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{userInfo.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Mail size={16} />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{userInfo.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{userInfo.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin size={16} />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{userInfo.location}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Edit3 size={16} />
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={userInfo.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{userInfo.bio}</p>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>Member since {userInfo.joinDate}</span>
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;