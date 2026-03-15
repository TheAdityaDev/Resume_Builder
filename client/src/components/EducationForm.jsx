import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const EducationForm = ({ data, onChange }) => {
  const addEducation = async () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = async (index) => {
    const updated = data.filter((_, i) => i !== index);

    onChange(updated);
  };

  const updateEducation = async (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };

    onChange(updated);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-600">Add your education here.</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-br from-indigo-400 to-purple-400 text-white rounded hover:bg-indigo-500 transition-colors "
        >
          <Plus className="size-4" />
          Add Eduction
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="size-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                Education #{index + 1}
                <button>
                  <Trash2
                    className="size-4 text-red-400 hover:text-red-600"
                    onClick={() => removeEducation(index)}
                  />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  className="px-3 py-2 rounded-lg text-sm"
                  placeholder="School/College Name."
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="px-3 py-2 rounded-lg text-sm"
                  placeholder="Education ."
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="px-3 py-2 rounded-lg text-sm"
                  value={education.field || ""}
                  placeholder="Field of study."
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                />

                {education.is_current ? (
                  <span className="text-sm text-gray-500 italic">Pursuing</span>
                ) : (
                  <input
                    type="month"
                    className="px-3 py-2 rounded-lg text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={education.is_current}
                    value={education.graduation_date || ""}
                    onChange={(e) =>
                      updateEducation(index, "graduation_date", e.target.value)
                    }
                  />
                )}

                <input
                  type="text"
                  className="px-3 py-2 rounded-lg text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={education.is_current}
                  value={education.gpa || ""}
                  placeholder="Marks."
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-300 focus:ring-indigo-400"
                  checked={education.is_current || false}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "is_current",
                      e.target.checked ? true : false
                    )
                  }
                />
                <span className="text-sm text-gray-700">
                  Currently pursuing education.
                </span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
