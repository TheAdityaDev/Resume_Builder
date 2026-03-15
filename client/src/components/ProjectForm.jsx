import { FolderCodeIcon, Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {
  const addProject = async () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
      url: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = async (index) => {
    const updated = data.filter((_, i) => i !== index);

    onChange(updated);
  };

  const updateProject = async (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };

    onChange(updated);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Project
          </h3>
          <p className="text-sm text-gray-600">Add your project here.</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-br from-indigo-400 to-purple-400 text-white rounded hover:bg-indigo-500 transition-colors "
        >
          <Plus className="size-4" />
          Add Projects.
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderCodeIcon className="size-12 mx-auto mb-3 text-gray-300" />
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                Projects #{index + 1}
                <button>
                  <Trash2
                    className="size-4 text-red-400 hover:text-red-600"
                    onClick={() => removeProject(index)}
                  />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  className="px-3 py-2 rounded-lg text-sm"
                  placeholder="Project Name."
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                />

                <input
                  type="text"
                  className="px-3 py-2 rounded-lg text-sm"
                  placeholder="Type ."
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                />
    </div>
                <textarea
                  type="text"
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                  value={project.description || ""}
                  placeholder="Enter a description of your project."
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                />

                <input
                  type="url"
                  placeholder="Enter a url of your project."
                  className="px-3 py-2 w-full rounded-lg text-sm"
                  value={project.url || ""}
                  onChange={(e) => updateProject(index, "url", e.target.value)}
                />
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
