import {
  BriefcaseBusinessIcon,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  UserIcon,
} from "lucide-react";

const PersonalInfoFrom = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      type: "text",
      icon: User,
      required: true,
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      icon: Mail,
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      type: "tel",
      icon: Phone,
      required: true,
    },
    {
      key: "location",
      label: "Location",
      type: "text",
      icon: MapPin,
      required: true,
    },
    {
      key: "profession",
      label: "Profession",
      type: "text",
      icon: BriefcaseBusinessIcon,
      required: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      type: "url",
      icon: Linkedin,
    },
    {
      key: "website",
      label: "Portfolio Website / Personal Website",
      type: "url",
      icon: Globe,
    },
  ];


  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get started with personal information.
      </p>
      <div className="flex items-center gap-2">
        <label>
          {data.image ? (
            <img
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="User Image."
            />
          ) : (
            <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer">
              <UserIcon className="w-16 h-16 text-gray-400 mt-5 ring ring-slate-300 rounded-full p-3" />
              upload your image.
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg image/png"
            className="hidden"
            onChange={(e) => {
              handleChange("image", e.target.files[0]);
            }}
            id=""
          />
        </label>
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-1 pl-4 text-sm mt-3">
            <p>Remove Background.</p>
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
              <input
                type="checkbox"
                className="sr-only peer "
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div className="w-9 h-5 bg-gray-500 transition-colors duration-200 rounded-4xl peer-checked:bg-indigo-500"></div>
              <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4 "></span>
            </label>
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="w-4 h-4" />
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
            className="mt-1 w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:border-indigo-400 outline-none transition-colors text-sm"
            placeholder={`Enter your ${field.label.toLowerCase()}`}
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoFrom;
