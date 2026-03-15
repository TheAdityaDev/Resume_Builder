import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Linkedin,
} from "lucide-react";

const SimpleProfessionalTemplate = ({ data, accentColor }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // SOCIAL MEDIA (same icons as ClassicTemplate)
  const icons = {
    facebook: "https://cdn.simpleicons.org/facebook/1877F2",
    instagram: "https://cdn.simpleicons.org/instagram/E4405F",
    twitter: "https://cdn.simpleicons.org/twitter/1DA1F2",
    x: "https://cdn.simpleicons.org/x/000000",
    linkedin: "https://cdn.simpleicons.org/linkedin/0A66C2",
    github: "https://cdn.simpleicons.org/github/000000",
    youtube: "https://cdn.simpleicons.org/youtube/FF0000",
    stack_overflow: "https://cdn.simpleicons.org/stackoverflow/F48024",
    reddit: "https://cdn.simpleicons.org/reddit/FF4500",
    dev_to: "https://cdn.simpleicons.org/devdotto/0A0A0A",
    discord: "https://cdn.simpleicons.org/discord/5865F2",
    kaggle: "https://cdn.simpleicons.org/kaggle/20BEFF",
    medium: "https://cdn.simpleicons.org/medium/000000",
    dribbble: "https://cdn.simpleicons.org/dribbble/EA4C89",
    behance: "https://cdn.simpleicons.org/behance/1769FF",
    tiktok: "https://cdn.simpleicons.org/tiktok/000000",
    pinterest: "https://cdn.simpleicons.org/pinterest/E60023",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans">
      <div className="w-full max-w-5xl bg-white shadow-2xl flex flex-col md:flex-row">
        
        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-1/3 bg-[#162a42] text-white p-8 flex flex-col gap-8">

          {/* Image */}
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">

              {data.personal_information?.image &&
              typeof data.personal_information.image === "string" ? (
                <img
                  src={data.personal_information.image}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                  style={{ background: accentColor + "70" }}
                />
              ) : data.personal_information?.image &&
                typeof data.personal_information.image === "object" ? (
                <img
                  src={URL.createObjectURL(data.personal_information.image)}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                />
              ) : null}

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest border-b border-gray-500 pb-2 mb-4">
              Contact
            </h3>

            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-300" />
                <span>{data.personal_information.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-300" />
                <span>{data.personal_information.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gray-300" />
                <span>{data.personal_information.location}</span>
              </div>

              {/* Website - Added clean version */}
              {data.personal_information.website && (
                <div className="flex items-center gap-3 break-all">
                  <Globe size={18} className="text-gray-300" />
                  <a href={data.personal_information.website} target="_blank">
                    {data.personal_information.website.replace("https://", "")}
                  </a>
                </div>
              )}

              {/* LinkedIn */}
              {data.personal_information.linkedin && (
                <div className="flex items-center gap-3 break-all">
                  <Linkedin size={18} className="text-gray-300" />
                  <a href={data.personal_information.linkedin} target="_blank">
                    {data.personal_information.linkedin.replace("https://www.", "")}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest border-b border-gray-500 pb-2 mb-4">
              Education
            </h3>

            <div className="flex flex-col gap-5">
              {data.education.map((edu) => (
                <div key={edu._id}>
                  <p className="font-bold text-white">{formatDate(edu.graduation_date)}</p>
                  <p className="font-bold uppercase text-blue-200">{edu.institution}</p>

                  <ul className="list-none text-sm text-gray-300 mt-1">
                    <li className="font-semibold">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </li>
                    {edu.gpa && <li>GPA: {edu.gpa}</li>}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest border-b border-gray-500 pb-2 mb-4">
              Skills
            </h3>

            <ul className="flex flex-col gap-2 text-sm">
              {data.skills.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL MEDIA — ADDED */}
          {data.social_media?.length > 0 && (
            <div>
              <h3 className="text-xl font-bold uppercase tracking-widest border-b border-gray-500 pb-2 mb-4">
                Social Links
              </h3>

              <div className="flex flex-wrap gap-3">
                {data.social_media.map((item, index) =>
                  Object.entries(item).map(([platform, username]) =>
                    username ? (
                      <a
                        key={`${index}-${platform}`}
                        href={`https://${platform}.com/${username}`}
                        target="_blank"
                      >
                        <img src={icons[platform]} className="w-5 h-5" />
                      </a>
                    ) : null
                  )
                )}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="w-full md:w-2/3 p-8 md:p-12 text-gray-800">

          {/* Header */}
          <div className="mb-10 pt-4">
            <h1
              className="text-5xl font-bold text-[#3a4653] uppercase mb-2 tracking-wide leading-tight"
            >
              {data.personal_information.full_name.split(" ")[0]}{" "}
              <span className="font-normal text-gray-600">
                {data.personal_information.full_name.split(" ")[1]}
              </span>
            </h1>

            <h2 className="text-xl tracking-[0.2em] uppercase text-gray-500 pb-4 border-b-4 border-[#3a4653] inline-block">
              {data.personal_information.profession}
            </h2>
          </div>

          {/* Summary */}
          <div className="mb-10">
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#3a4653] mb-4">
              Profile
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm text-justify">
              {data.professional_summary}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-10">
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#3a4653] mb-6">
              Work Experience
            </h3>

            <div className="relative border-l-2 border-gray-300 ml-3 space-y-8">
              {data.experience.map((exp) => (
                <div key={exp._id} className="pl-8 relative">

                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-[#3a4653] rounded-full border-2 border-white"></div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h4 className="font-bold text-lg text-[#3a4653]">{exp.company}</h4>
                    <span className="text-sm font-semibold text-gray-500">
                      {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                    </span>
                  </div>

                  <p className="text-gray-600 font-medium mb-2 italic">
                    {exp.position}
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECTS */}
          <div className="mb-8">
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#3a4653] mb-6">
              Projects
            </h3>

            <div className="grid grid-cols-1 gap-6">
              {data.project.map((proj) => (
                <div
                  key={proj._id}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-[#3a4653] text-lg">{proj.name}</h4>
                  </div>

                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                    {proj.type}
                  </p>

                  <p className="text-sm text-gray-600 mb-2">
                    {proj.description}
                  </p>

                  {/* PROJECT URL — ADDED */}
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      className="text-sm font-medium text-blue-600 break-all"
                    >
                      {proj.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SimpleProfessionalTemplate;
