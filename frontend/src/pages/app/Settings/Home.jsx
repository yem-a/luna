import React from "react";

const SettingsHome = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="space-y-6">
          {/* Profile Section */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Your email"
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Preferences</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="darkMode" className="mr-2" />
                <label htmlFor="darkMode">Enable Dark Mode</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="notifications" className="mr-2" />
                <label htmlFor="notifications">Enable Notifications</label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHome;
