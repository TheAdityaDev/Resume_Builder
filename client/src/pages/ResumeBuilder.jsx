import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  EyeClosedIcon,
  EyeIcon,
  FileText,
  FolderOpen,
  Globe,
  GraduationCap,
  Share2Icon,
  Sparkle,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoFrom from "../components/PersonalInfoFrom";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import SocialMediaLinks from "../components/SocialMediaLinks";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [isSectionValid, setIsSectionValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setremoveBackground] = useState(false);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_information: {},
    professional_summary: "",
    experience: [],
    project: [],
    education: [],
    skills: [],
    certifications: [],
    achievements: [],
    interests: [],
    references: [],
    languages: [],
    social_media: [],
    contact_information: {},
    public: false,
    accent_color: "#2563eb",
    template: "classic",
  });

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((res) => res._id === resumeId);

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  });

  const sections = [
    { id: "personal", title: "Personal Information", icons: User },
    { id: "summary", title: "Summary", icons: FileText },
    { id: "experience", title: "Experience", icons: Briefcase },
    { id: "education", title: "Education", icons: GraduationCap },
    { id: "project", title: "Project", icons: FolderOpen },
    { id: "skills", title: "Skills", icons: Sparkles },
    { id: "social_media", title: "Social Media", icons: Globe },
  ];

  const activeSection = sections[activeSectionIndex];


  const changeResumeVisibility = async () => {
    setResumeData({ ...resumeData, public: !resumeData.public });
  }

  const handleShare = async () => {
    const frontendUrl = window.location.href.split('/app')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeData._id;

    if (navigator.share) {
      navigator.share({url: resumeUrl , text: "Check out my resume!"});
    }else{
      alert("Share not supported on this device");
    }
  }

  const downloadResume = async () => {
    const resume = JSON.stringify(resumeData);
    const blob = new Blob([resume], { type: "pdf" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "resume.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const SkeletonScreen = (
    <div className="max-w-7xl mx-auto px-4 pb-8 animate-pulse">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Panel (Form Skeleton) */}
        <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
            {/* Progress Bar */}
            <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
            <div className="absolute top-0 left-0 h-1 bg-gray-300 w-1/3 rounded-full" />

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
              <div className="w-20 h-6 bg-gray-200 rounded" />

              <div className="flex items-center gap-3">
                <div className="w-24 h-8 bg-gray-200 rounded-lg" />
                <div className="w-20 h-8 bg-gray-200 rounded-lg" />
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="w-32 h-4 bg-gray-200 rounded" />
                <div className="w-full h-10 bg-gray-200 rounded-md" />
              </div>

              <div className="space-y-3">
                <div className="w-40 h-4 bg-gray-200 rounded" />
                <div className="w-full h-10 bg-gray-200 rounded-md" />
              </div>

              <div className="space-y-3">
                <div className="w-36 h-4 bg-gray-200 rounded" />
                <div className="w-full h-24 bg-gray-200 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-7 max-lg:mt-6">
          {/* Buttons */}
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-9 bg-gray-200 rounded-lg" />
            <div className="w-24 h-9 bg-gray-200 rounded-lg" />
            <div className="w-24 h-9 bg-gray-200 rounded-lg" />
          </div>

          {/* Resume Preview */}
          <div className="w-full h-[600px] bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeft className="size-4 text-slate-500 hover:text-slate-700 transition-all" />
          Back to Dashboard
        </Link>
        {/* <h1 className="underline decoration-wavy decoration-violet-600 underline-offset-4">{resumeData.title}</h1> */}
      </div>

      {isLoading ? (
        SkeletonScreen
      ) : (
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left panel form */}
            <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
                {/* Progress Bar using activeSectionsIndex */}
                <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
                <hr
                  className="absolute top-0 left-0  h-1 bg-gradient-to-r bg-linear-to-r from-indigo-500 to-indigo-700 border-none transition-all duration-200"
                  style={{
                    width: `${
                      (activeSectionIndex + 1) * (100 / sections.length)
                    }%`,
                  }}
                />

                {/* Section navigation */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-500 py-1">
                  <div className="flex justify-between items-center mb-6  py-1">
                    <TemplateSelector
                      selectedTemplate={resumeData.template}
                      onChange={(template) =>
                        setResumeData({ ...resumeData, template })
                      }
                    />
                    <ColorPicker
                      selectedColor={resumeData.accent_color}
                      onChange={(accent_color) =>
                        setResumeData({ ...resumeData, accent_color })
                      }
                    />
                  </div>
                  <div className="flex items-center">
                    {activeSectionIndex !== 0 && (
                      <button
                        className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                        disabled={activeSectionIndex === 0}
                        onClick={() =>
                          setActiveSectionIndex(
                            Math.max(activeSectionIndex - 1, 0)
                          )
                        }
                      >
                        <ChevronLeft className="size-4" /> Previous
                      </button>
                    )}
                    <button
                      className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all disabled:cursor-not-allowed ${
                        activeSectionIndex === sections.length - 1 &&
                        "bg-gray-50"
                      }`}
                      disabled={activeSectionIndex === sections.length - 1}
                      onClick={() =>
                        setActiveSectionIndex(
                          Math.min(activeSectionIndex + 1, sections.length - 1)
                        )
                      }
                    >
                      Next <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
                {/* Form content */}
                <div className="space-y-6">
                  {activeSection.id === "personal" && (
                    <PersonalInfoFrom
                      data={resumeData.personal_information}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal_information: data,
                        }))
                      }
                      onValidate={(valid) => setIsSectionValid(valid)}
                      removeBackground={removeBackground}
                      setRemoveBackground={setremoveBackground}
                    />
                  )}
                  {activeSection.id === "summary" && (
                    <ProfessionalSummaryForm
                      data={resumeData.professional_summary}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          professional_summary: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}
                  {activeSection.id === "experience" && (
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          experience: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}
                  {activeSection.id === "education" && (
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          education: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}
                  {activeSection.id === "project" && (
                    <ProjectForm
                      data={resumeData.project}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          project: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}
                  {activeSection.id === "skills" && (
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          skills: data,
                        }))
                      }
                      setResumeData={setResumeData}
                      accentColor={resumeData.accent_color}
                    />
                  )}

                  {activeSection.id === "social_media" && (
                    <SocialMediaLinks
                      data={resumeData.social_media}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          social_media: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}
                </div>
                <button className="bg-gradient-to-br from-indigo-400 to-purple-400 ring-indigo-300 text-white ring hover:ring-purple-400 rounded-md px-6 py-2 mt-5 text-sm">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Right panel Preview */}
            <div className="lg:col-span-7 max-lg:mt-6">
              <div className="relative w-full">
                {/* buttons */}
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                    {resumeData.public && (
                      <button onClick={handleShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-lg ring-purple-400 hover:ring transition-all">
                        <Share2Icon className="size-4 text-white" />
                        Share
                      </button>
                    )}
                    <button onClick={changeResumeVisibility} className="flex items-center p-2 px-4 text-xs bg-gradient-to-br from-purple-400 to-indigo-400 text-white ring-purple-400 rounded-lg hover:ring transition-all gap-2">
                      {resumeData.public ? ( 
                        <EyeIcon className="size-4 " />
                      ):(
                        <EyeClosedIcon className="size-4" />
                      )}
                      {resumeData.public ? "Public" : "Private"}
                    </button>
                    <button onClick={downloadResume} className="flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-purple-300 to-indigo-500 text-white rounded-lg ring-purple-400 hover:ring transition-all">
                      <Download className="size-4 text-white" />
                      Download
                    </button>
                  </div>
              </div>
              {/* resume preview */}
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
