import { Briefcase, Plus, SparklesIcon, Trash2 } from "lucide-react";
import React from "react";

const ExperienceForm = ({ data, onChange }) => {
  const addExperience = async () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = async (index) => {
    const updated = data.filter((_, i) => i !== index);

    onChange(updated);
  };

  const updateExperience = async (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };

    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Experience
          </h3>
          <p className="text-sm text-gray-600">Add your job experience here.</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-br from-indigo-400 to-purple-400 text-white rounded hover:bg-indigo-500 transition-colors "
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="size-12 mx-auto mb-3 text-gray-300" />
          <p>No experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                Experience #{index + 1}
                <button>
                  <Trash2
                    className="size-4 text-red-400 hover:text-red-600"
                    onClick={() => removeExperience(index)}
                  />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  className="px-3 py-2 rounded-lg text-sm"
                  placeholder="Company Name."
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="px-3 py-2 rounded-lg text-sm"
                  placeholder="Job Title."
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                />

                <input
                  type="month"
                  className="px-3 py-2 rounded-lg text-sm"
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                />

                <input
                  type="month"
                  className="px-3 py-2 rounded-lg text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={experience.is_current}
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-300 focus:ring-indigo-400"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked ? true : false
                    )
                  }
                />
                <span className="text-sm text-gray-700">
                  Currently working here.
                </span>
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600">
                    Job Description.
                  </label>
                  <button className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-br from-indigo-400 to-purple-400 text-white rounded hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <SparklesIcon className="size-4" />
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  value={experience.description || ""}
                  rows={5}
                  onChange={(e) => updateExperience(index, "description",e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                  placeholder="Describe your key responsibilities and achievement..."
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
