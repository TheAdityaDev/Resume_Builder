import { Plus, SparklesIcon, X } from "lucide-react";
import React, { useState } from "react";

const SkillsForm = ({ data, onChange , accentColor }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = async () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = async (index) => {
    const updated = data.filter((_, i) => i !== index);

    onChange(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };
  return (
    <div className="space-y-3">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">Add your technical skills.</p>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter skill (eg. HTML, CSS, JavaScript, REACT)"
          className="flex-1 px-3 py-2 text-sm rounded-lg"
          onChange={(e)=>setNewSkill(e.target.value)}
          value={newSkill}
          onKeyPress={handleKeyPress}
        />
        <button 
         onClick={addSkill}
         disabled={!newSkill.trim() || data.includes(newSkill.trim())}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-400 text-white rounded-lg hover:bg-purple-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400">
            <Plus className="size-4 text-white" />
            Add 
        </button>
      </div>
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
            {data.map((skill,index)=>(
                <span key={index} className="flex items-center gap-1 px-3 py-1 text-white rounded-full text-sm" style={{backgroundColor : accentColor}}>
                    {skill}
                    <button onClick={()=>removeSkill(index)} className="flex items-center gap-1">
                        <X className="size-4" />
                    </button>
                </span>
            ))}
        </div>
      ):(
        <div className="text-center py-6 text-gray-600">
            <SparklesIcon className="size-4 mx-auto mb-2 text-gray-500" />
            <p>No skills added yet.</p>
            <p className="text-xs">Add your technical skills.</p>
        </div>
      )}
      <p className="text-sm bg-blue-200 px-4 py-2 rounded-lg text-blue-400"><strong>Tip:</strong> Add 8-12 relevant skills.</p>
    </div>
  );
};

export default SkillsForm;
