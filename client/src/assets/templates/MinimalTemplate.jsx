import { Globe } from "lucide-react";

const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
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
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
            
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-thin mb-4 tracking-wide">
                    {data.personal_information?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {data.personal_information?.email && <span>{data.personal_information.email}</span>}
                    {data.personal_information?.phone && <span>{data.personal_information.phone}</span>}
                    {data.personal_information?.location && <span>{data.personal_information.location}</span>}
                    {data.personal_information?.linkedin && (
                        <span className="break-all">{data.personal_information.linkedin}</span>
                    )}
                    {data.personal_information?.website && (
                        <span className="break-all">{data.personal_information.website}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <p className=" text-gray-700">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2">{exp.company}</p>
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
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-2 justify-between items-baseline">
                                <h3 className="text-lg font-medium ">{proj.name}</h3>
                                <p className="text-gray-600">{proj.description}</p>

                                {/* Added missing project URL */}
                                {proj.url && (
                                    <a href={proj.url} target="_blank" className="text-sm font-medium text-blue-600 break-all">
                                        {proj.url}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {edu.is_current ? "Pursuing" : formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    <div className="text-gray-700">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}

            {/* SOCIAL MEDIA — ADDED */}
            {data?.social_media?.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Social Links
                    </h2>

                    <div className="flex gap-4 flex-wrap">
                        {data.social_media.map((item, index) =>
                            Object.entries(item).map(([platform, username]) =>
                                username ? (
                                    <a
                                        key={`${index}-${platform}`}
                                        href={`https://${platform}.com/${username}`}
                                        target="_blank"
                                    >
                                        <img src={icons[platform]} alt={platform} className="w-5 h-5" />
                                    </a>
                                ) : null
                            )
                        )}
                    </div>
                </section>
            )}

        </div>
    );
};

export default MinimalTemplate;
