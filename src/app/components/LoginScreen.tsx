import { User, Lock, ChevronDown } from "lucide-react";
import { useLogin, roles, states, districts } from "../../hooks/useLogin";

interface LoginScreenProps {
  onLogin: (username: string, role: string, additionalInfo?: { state?: string; district?: string }) => void;
}

function BrandingPanel() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center bg-[#003d82] rounded-2xl p-12 text-white shadow-2xl">
      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
        <div className="w-28 h-28 border-4 border-orange-500 rounded-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-green-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-[#003d82] rounded-full"></div>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-center">UNPER</h1>
      <p className="text-lg mb-4 text-center">Unified National Electoral Roll</p>
      <p className="text-sm text-blue-200 text-center max-w-sm">
        एकीकृत राष्ट्रीय निर्वाचक नामावली प्रबंधन प्रणाली
      </p>
      <div className="mt-8 pt-8 border-t border-blue-400 w-full">
        <p className="text-center text-sm">Election Commission of India</p>
        <p className="text-center text-xs text-blue-200 mt-1">भारत निर्वाचन आयोग</p>
      </div>
    </div>
  );
}

interface RoleFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function RoleField({ value, onChange }: RoleFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        User Role <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent appearance-none bg-white"
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

interface LocationFieldsProps {
  state: string;
  district: string;
  onStateChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  showDistrict: boolean;
}

function LocationFields({ state, district, onStateChange, onDistrictChange, showDistrict }: LocationFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State
        </label>
        <select
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent"
        >
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      {showDistrict && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District
          </label>
          <select
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent"
          >
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
}

function InputField({ label, type, value, onChange, placeholder, icon, required = true }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent"
        />
      </div>
    </div>
  );
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    state,
    setState,
    district,
    setDistrict,
    loading,
    error,
    requiresStateDistrict,
    requiresDistrict,
    handleSubmit,
  } = useLogin({ onLogin });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <BrandingPanel />

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Login</h2>
            <p className="text-sm text-gray-600">Access the Electoral Roll Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <RoleField value={role} onChange={setRole} />

            {/* State/District Selection for Regional Roles */}
            {requiresStateDistrict && (
              <LocationFields
                state={state}
                district={district}
                onStateChange={setState}
                onDistrictChange={setDistrict}
                showDistrict={requiresDistrict}
              />
            )}

            {/* Username */}
            <InputField
              label="Username"
              type="text"
              value={username}
              onChange={setUsername}
              placeholder="Enter your username"
              icon={<User className="w-5 h-5" />}
            />

            {/* Password */}
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5" />}
            />

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#003d82] text-white py-3 rounded-lg hover:bg-[#002d62] transition-colors shadow-lg disabled:opacity-60"
            >
              {loading ? "Authenticating..." : "Login to UNPER"}
            </button>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                Protected System - Authorized Access Only
              </p>
              <p className="text-xs text-gray-400 mt-1">
                © 2026 Election Commission of India
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}