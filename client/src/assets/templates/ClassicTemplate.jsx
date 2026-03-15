import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  X,
  Github,
  Youtube,
} from "lucide-react";
import React from "react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };
  const icons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    x: X,
    linkedin: Linkedin,
    github: Github,
    youtube: Youtube,
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
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      {/* Header */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {data.personal_information?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personal_information?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <a
                target="_blank"
                href={"mailto:" + data.personal_information.email}
              >
                {data.personal_information.email}
              </a>
            </div>
          )}
          {data.personal_information?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <a
                target="_blank"
                href={"tel:" + data.personal_information.phone}
              >
                {data.personal_information.phone}
              </a>
            </div>
          )}
          {data.personal_information?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personal_information.location}</span>
            </div>
          )}
          {data.personal_information?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" />
              <a
                target="_blank"
                href={data.personal_information.linkedin}
                className="break-all"
              >
                {data.personal_information.linkedin}
              </a>
            </div>
          )}
          {data.personal_information?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              <a
                target="_blank"
                href={data.personal_information.website}
                className="break-all"
              >
                {data.personal_information.website}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: accentColor }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-3 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROJECTS
          </h2>

          <ul className="space-y-3 ">
            {data.project.map((proj, index) => (
              <div
                key={index}
                className="flex justify-between items-start border-l-3 border-gray-300 pl-6"
              >
                <div>
                  <li className="font-semibold text-gray-800 ">{proj.name}</li>
                  <p className="text-gray-600 mb-2">{proj.description}</p>
                  <a
                    className="font-semibold text-gray-500"
                    target="_blank"
                    href={proj.url}
                  >
                    {proj.url}
                  </a>
                </div>
              </div>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            EDUCATION
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                {/* <div className="text-sm text-gray-600">
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div> */}
                <div className="text-sm text-gray-600">
                  <p>
                    {edu.is_current
                      ? "Pursuing"
                      : formatDate(edu.graduation_date || "Present")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            CORE SKILLS
          </h2>

          <div className="flex gap-4 flex-wrap">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-gray-700">
                • {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Social media Links */}

      {data?.social_media?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            Social Links
          </h2>

          <div className="flex gap-4 flex-wrap">
            {data.social_media.map((item, index) =>
              Object.entries(item).map(([platform, username]) =>
                username ? (
                  <div
                    key={`${index}-${platform}`}
                    className="flex items-center"
                  >
                    <a
                      href={`https://${platform}.com/${username}`}
                      target="_blank"
                    >
                       <img
                      src={icons[platform]}
                      alt={platform}
                      className="w-5 h-5"
                    />
                    </a>
                  </div>
                ) : null
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
