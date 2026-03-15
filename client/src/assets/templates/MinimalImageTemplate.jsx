import { Mail, Phone, MapPin, Globe } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Social media icons (same as ClassicTemplate)
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
    <div className="max-w-5xl mx-auto bg-white text-zinc-800">
      <div className="grid grid-cols-3">
        <div className="col-span-1 py-10">
          {/* Image */}
          {data.personal_information?.image &&
          typeof data.personal_information.image === "string" ? (
            <div className="mb-6">
              <img
                src={data.personal_information.image}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto"
                style={{ background: accentColor + "70" }}
              />
            </div>
          ) : data.personal_information?.image &&
            typeof data.personal_information.image === "object" ? (
            <div className="mb-6">
              <img
                src={URL.createObjectURL(data.personal_information.image)}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          ) : null}
        </div>

        {/* Name + Title */}
        <div className="col-span-2 flex flex-col justify-center py-10 px-8">
          <h1 className="text-4xl font-bold text-zinc-700 tracking-widest">
            {data.personal_information?.full_name || "Your Name"}
          </h1>
          <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest">
            {data?.personal_information?.profession || "Profession"}
          </p>
        </div>

        {/* Left Sidebar */}
        <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">
          
          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {data.personal_information?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: accentColor }} />
                  <span>{data.personal_information.phone}</span>
                </div>
              )}
              {data.personal_information?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: accentColor }} />
                  <span>{data.personal_information.email}</span>
                </div>
              )}
              {data.personal_information?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: accentColor }} />
                  <span>{data.personal_information.location}</span>
                </div>
              )}

              {/* Website (ADDED) */}
              {data.personal_information?.website && (
                <div className="flex items-center gap-2 break-all">
                  <Globe size={14} style={{ color: accentColor }} />
                  <a href={data.personal_information.website} target="_blank">
                    {data.personal_information.website}
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                EDUCATION
              </h2>
              <div className="space-y-4 text-sm">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-semibold uppercase">{edu.degree}</p>
                    <p className="text-zinc-600">{edu.institution}</p>
                    <p>
                      {edu.is_current
                        ? "Pursuing"
                        : formatDate(edu.graduation_date || "Present")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                SKILLS
              </h2>
              <ul className="space-y-1 text-sm">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {/* SOCIAL MEDIA — ADDED */}
          {data.social_media?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                SOCIAL LINKS
              </h2>

              <div className="flex flex-wrap gap-3">
                {data.social_media.map((item, index) =>
                  Object.entries(item).map(([platform, username]) =>
                    username ? (
                      <a
                        key={`${index}-${platform}`}
                        href={`https://${platform}.com/${username}`}
                        target="_blank"
                      >
                        <img
                          src={icons[platform]}
                          alt={platform}
                          className="w-5 h-5"
                        />
                      </a>
                    ) : null
                  )
                )}
              </div>
            </section>
          )}
        </aside>

        {/* Right Content */}
        <main className="col-span-2 p-8 pt-0">
          
          {/* Summary */}
          {data.professional_summary && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-3"
                style={{ color: accentColor }}
              >
                SUMMARY
              </h2>
              <p className="text-zinc-700 leading-relaxed">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-6 mb-8">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-zinc-900">
                        {exp.position}
                      </h3>
                      <span className="text-xs text-zinc-500">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 leading-relaxed space-y-1">
                        {exp.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project && data.project.length > 0 && (
            <section>
              <h2
                className="text-sm uppercase tracking-widest font-semibold"
                style={{ color: accentColor }}
              >
                PROJECTS
              </h2>
              <div className="space-y-4">
                {data.project.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-md font-medium text-zinc-800 mt-3">
                      {project.name}
                    </h3>
                    <p className="text-sm mb-1" style={{ color: accentColor }}>
                      {project.type}
                    </p>

                    {project.description && (
                      <ul className="list-disc list-inside text-sm mb-1 text-zinc-700 space-y-1">
                        {project.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}

                    {/* PROJECT URL ADDED */}
                    {project.url && (
                      <div className="flex items-center mt-2">
                        <Globe className="size-4" style={{ color: accentColor }} />
                        <a
                          className="font-semibold ml-2 text-gray-600 break-all"
                          target="_blank"
                          href={project.url}
                        >
                          {project.url}
                        </a>
                      </div>
                    )}

                    <hr className="mt-3" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;
