import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, FiShield, FiKey, FiEye, FiEyeOff, FiBell, FiEdit, FiCheck, FiX } from 'react-icons/fi'

interface UserData {
  displayName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  avatarUrl: string
}

interface NotificationPreferences {
  emailNotifications: boolean
  orderUpdates: boolean
  chatMessages: boolean
  promotions: boolean
  securityAlerts: boolean
}

export default function AccountSettings() {
  const [userData, setUserData] = useState<UserData>({
    displayName: "John Doe",
    email: "john.doe@example.com",
    phone: "+63 (917) 123-4567",
    address: "123 Rizal Street",
    city: "Manila",
    zipCode: "1000",
    avatarUrl: "",
  })

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    orderUpdates: true,
    chatMessages: true,
    promotions: false,
    securityAlerts: true,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData({ ...userData, [field]: value })
  }

  const handleNotificationToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
    // TODO: Save to Firebase/Supabase
    console.log(`Toggled ${key}:`, !preferences[key])
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handlePasswordChange = (field: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }))
  }

  // TODO: Connect to Firebase/Supabase
  const handleSaveChanges = async () => {
    // await updateUserProfile(userData)
    console.log("Saving user data:", userData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original data if needed
  }

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!")
      return
    }
    // await changeUserPassword(passwords.current, passwords.new)
    console.log("Changing password...")
    setIsChangingPassword(false)
    setPasswords({ current: "", new: "", confirm: "" })
  }

  return (
    <div className="min-h-screen bg-cream text-blue">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/app" 
              className="inline-flex items-center gap-2 text-blue font-semibold hover:text-blue/80 mr-4 touch-manipulation"
            >
              <FiArrowLeft /> Back
            </Link>
            <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue text-center">Account Settings</h1>
            <div className="w-16 sm:w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Profile Overview Card */}
        <div className="bg-white rounded-2xl border border-blue/20 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-blue text-white flex items-center justify-center text-2xl sm:text-3xl font-heading font-bold flex-shrink-0">
              {userData.displayName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-blue">{userData.displayName}</h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">{userData.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-gold/20 text-gold rounded-full text-xs sm:text-sm font-semibold border border-gold/30">
                Premium Member
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white rounded-2xl border border-blue/20 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-blue flex items-center gap-2">
                  <FiUser className="h-5 w-5" />
                  Personal Information
                </h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Update your personal details and contact information</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-blue text-blue rounded-lg font-semibold hover:bg-blue hover:text-white transition-colors touch-manipulation min-h-[44px] w-full sm:w-auto"
                >
                  <FiEdit className="h-4 w-4" />
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Display Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.displayName}
                    onChange={(e) => handleInputChange("displayName", e.target.value)}
                    className="w-full px-3 py-3 text-base border border-blue/20 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all duration-150 touch-manipulation"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg text-sm sm:text-base">{userData.displayName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiMail className="h-4 w-4" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-3 text-base border border-blue/20 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all duration-150 touch-manipulation"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg text-sm sm:text-base">{userData.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiPhone className="h-4 w-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-blue/20 rounded-lg focus:ring-2 focus:ring-blue outline-none"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{userData.phone}</p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FiMapPin className="h-4 w-4" />
                  Address Information
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Street Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="w-full px-3 py-2 border border-blue/20 rounded-lg focus:ring-2 focus:ring-blue outline-none"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{userData.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">City</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="w-full px-3 py-2 border border-blue/20 rounded-lg focus:ring-2 focus:ring-blue outline-none"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{userData.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">ZIP Code</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="w-full px-3 py-2 border border-blue/20 rounded-lg focus:ring-2 focus:ring-blue outline-none"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{userData.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>

                             {/* Action Buttons */}
               {isEditing && (
                 <div className="flex flex-col sm:flex-row gap-3 pt-4">
                   <button
                     onClick={handleCancel}
                     className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors touch-manipulation min-h-[44px]"
                   >
                     <FiX className="h-4 w-4" />
                     Cancel
                   </button>
                   <button
                     onClick={handleSaveChanges}
                     className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue text-white rounded-lg font-semibold hover:bg-blue/90 transition-colors touch-manipulation min-h-[44px]"
                   >
                     <FiCheck className="h-4 w-4" />
                     Save Changes
                   </button>
                 </div>
               )}
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-2xl border border-blue/20 p-6">
            <h3 className="font-heading text-xl font-bold text-blue flex items-center gap-2 mb-6">
              <FiShield className="h-5 w-5" />
              Security Settings
            </h3>

            <div className="space-y-6">
              {/* Password Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FiKey className="h-4 w-4" />
                      Password
                    </label>
                    <p className="text-sm text-gray-500 mt-1">Last changed 30 days ago</p>
                  </div>
                  {!isChangingPassword && (
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="px-4 py-2 border border-blue text-blue rounded-lg font-semibold hover:bg-blue hover:text-white transition-colors"
                    >
                      Change Password
                    </button>
                  )}
                </div>

                {isChangingPassword && (
                  <div className="space-y-4 p-4 bg-blue/5 rounded-lg border border-blue/20">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          value={passwords.current}
                          onChange={(e) => handlePasswordChange("current", e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-blue/20 rounded-lg focus:ring-2 focus:ring-blue outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.current ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          value={passwords.new}
                          onChange={(e) => handlePasswordChange("new", e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-blue/20 rounded-lg focus:ring-2 focus:ring-blue outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.new ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwords.confirm}
                          onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-blue/20 rounded-lg focus:ring-2 focus:ring-blue outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.confirm ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setIsChangingPassword(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleChangePassword}
                        className="px-4 py-2 bg-blue text-white rounded-lg font-semibold hover:bg-blue/90 transition-colors"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Two-Factor Authentication</label>
                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <button className="px-4 py-2 border border-gold text-gold rounded-lg font-semibold hover:bg-gold hover:text-white transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl border border-blue/20 p-6">
            <h3 className="font-heading text-xl font-bold text-blue flex items-center gap-2 mb-6">
              <FiBell className="h-5 w-5" />
              Notification Preferences
            </h3>
            <p className="text-gray-600 mb-6">Choose how you want to be notified about account activity</p>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FiMail className="h-4 w-4" />
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle("emailNotifications")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.emailNotifications ? 'bg-blue' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Order Updates */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Order Updates</label>
                  <p className="text-sm text-gray-500">Get notified about order status changes</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle("orderUpdates")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.orderUpdates ? 'bg-blue' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Chat Messages</label>
                  <p className="text-sm text-gray-500">Notifications for new chat messages from Printy</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle("chatMessages")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.chatMessages ? 'bg-blue' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.chatMessages ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Promotions */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Promotions & Offers</label>
                  <p className="text-sm text-gray-500">Receive promotional emails and special offers</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle("promotions")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.promotions ? 'bg-blue' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.promotions ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Security Alerts */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Security Alerts</label>
                  <p className="text-sm text-gray-500">Important security notifications (recommended)</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle("securityAlerts")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.securityAlerts ? 'bg-blue' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
