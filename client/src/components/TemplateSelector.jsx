import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const template = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean traditional resume format with clear sections and professional typography.",
    },
    {
      id: "modern",
      name: "Modern",
      preview: "Sleek design with strategic use color and modern font choices ",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal design with single image and clean typography.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your content front and center.",
    },
    {
      id: "marketing-manager",
      name: "Professional Marketing Resume",
      preview:
        "A modern, structured resume designed for marketing professionals, focusing on career experience and skills.",
    },
    {
      id: "software-developer",
      name: "Tech-Focused Developer Resume",
      preview:
        "A clean, detailed resume designed for developers, with sections for technical skills, experience, and projects.",
    },
  ];
 
 
 
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-indigo-400 bg-gradient-to-br from-indigo-400 to-purple-400 ring-indigo-300 hover:ring transition-all px-3 py-2 rounded-lg mt-5"
      >
        <Layout size={14} className="mr-2 text-white" />{" "}
        <span className="max-sm:hidden text-white">Template</span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 left-0 mt-2 w-xs p-3 space-y-3 bg-white border border-gray-200 rounded-lg shadow-sm z-10 overflow-y-scroll max-h-90">
          {template.map((templates) => (
            <div
            className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === templates.id ? "border-indigo-400 bg-indigo-100" : "border-gray-300 hover:border-gray-400 hover:bg-gray-500"}`}
              key={templates.id}
              onClick={() => {
                onChange(templates.id);
                setIsOpen(false);
              }}
            >
              {selectedTemplate === templates.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-indigo-500 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                 </div>
              )}
              <div className="space-y-1">
                <h3 className="font-medium">{templates.name}</h3>
              <p className="text-sm text-gray-600">{templates.preview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
