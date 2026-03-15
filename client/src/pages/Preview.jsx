import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../components/ResumePreview";
import ResumeSkeleton from "../Loaders/ResumePreviewLoader";
import { ArrowLeft } from "lucide-react";

const Preview = () => {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setresumeData] = useState(null);

  const loadResume = async () => {
    setresumeData(dummyResumeData.find((res) => res._id === resumeId || null));
    setIsLoading(false)
  };

  useEffect(() => {
    loadResume();
  }, []);
  return resumeData ? (
    <div className="bg-slate-100">
      <ResumePreview
        data={resumeData}
        template={resumeData.template}
        accentColor={resumeData.accent_color}
        classes="py-4 bg-white"
     />
    </div>
  ) : (
    <div>
      {isLoading ? (
        <ResumeSkeleton />
      ):(
        <div className="flex flex-col items-center justify-center h-screen">
          <p>Resume not found</p>
          <a href="/" className="mt-6 bg-indigo-400 hover:bg-purple-400 text-white rounded-lg px-6 h-9 m-1 ring-offset-1 ring-1 ring-indigo-300 flex items-center transition-colors">
            <ArrowLeft className="size-4" />
            Go to home.
          </a>
        </div>
      )}
    </div>
  );
};

export default Preview;
