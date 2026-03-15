import { Sparkle } from "lucide-react";
import React from "react";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-600">
            Add your summary for resume here.
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-br from-indigo-400 to-purple-400 text-white rounded hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Sparkle className="size-4" />
          AI Enhance
        </button>
      </div>
      <div className="mt-6">
        <textarea
          value={data || ''}
          rows={7}
          onChange={(e) =>
            onChange( e.target.value )
          }
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-32"
          placeholder="Write a brief summary about your professional background, skills, and career goals."
        ></textarea>
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise (3 - 4 sentences) and focus on your most relevant
          achievements and skills.{" "}
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
