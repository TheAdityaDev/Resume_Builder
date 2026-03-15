import { FolderCodeIcon, Plus, Trash2 } from "lucide-react";
import React from "react";


const SocialMediaLinks = ({ data, onChange }) => {
  const SOCIAL_MEDIA_TEMPLATE = {
  facebook: "",
  instagram: "",
  twitter: "",
  x: "",
  linkedin: "",
  github: "",
  youtube: "",
  stack_overflow: "",
  reddit: "",
  dev_to: "",
  discord: "",
  kaggle: "",
  medium: "",
  dribbble: "",
  behance: "",
  tiktok: "",
  pinterest: "",
};

 

  const updateField = (groupIndex, platform, value) => {
    const updated = [...data];
    updated[groupIndex][platform] = value;
    onChange(updated);
  };

  const deleteSinglePlatform = (groupIndex, platform) => {
    const updated = [...data];
    delete updated[groupIndex][platform]; // remove only this input field
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Social Media Links
          </h3>
          <p className="text-sm text-gray-600">Add your social media URLs.</p>
        </div>

       
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderCodeIcon className="size-12 mx-auto mb-3 text-gray-300" />
          <p>No social media links added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((group, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg mb-2"
            >

              {/* Scrollable area */}
              <div className="max-h-72 overflow-y-auto pr-2 space-y-4">
                {Object.keys(group).map((platform) => (
                  <div key={platform} className="space-y-1 w-full">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium capitalize">
                        {platform.replace("_", " ")}
                      </label>
                    </div>

                   <div className="flex gap-3">
                     <input
                      type="url"
                      className="w-full px-3 py-2 rounded-lg border text-sm mt-2"
                      placeholder={`Enter ${platform} URL`}
                      value={group[platform]}
                      onChange={(e) =>
                        updateField(index, platform, e.target.value)
                      }
                    />
                     {/* Delete single input */}
                      <button
                        onClick={() => deleteSinglePlatform(index, platform)}
                        className="text-red-400 px-4 py-3 rounded-lg mt-2 bg-gray-300 hover:bg-red-600/75 hover:text-white duration-200 transition-all"
                      >
                        <Trash2 className="size-4" />
                      </button>
                   </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialMediaLinks;
