import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Link, 
  Linkedin,
  Github,
  Hash,   
  X, 
  Globe 
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";

const resumeData = dummyResumeData[1];

// const socialIcons = {
//   facebook: Facebook,
//   instagram: Instagram,
//   twitter: Twitter,
//   linkedin: Linkedin,
//   github: Github,
//   youtube: Youtube,
//   stack_overflow: StackOverflow,
//   reddit: Reddit,
//   dev_to: Hash,
//   discord: Discord,
//   kaggle: Kaggle,
//   medium: Medium,
//   dribbble: Dribbble,
//    tiktok: Tiktok,
//   pinterest: Pinterest,
//   x: X,
// };

export default function ResumeSwitcher() {
  const [currentView, setCurrentView] = useState("simple");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwitch = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentView(prev => prev === "simple" ? "attractive" : "simple");
      setIsAnimating(false);
    }, 1000);
    return clearTimeout;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Resume Switcher</h1>
          <p className="text-gray-600">Click button to switch between resume layouts</p>
        </header>

        <div className="mb-8 flex justify-center">
          <button
            onClick={handleSwitch}
            className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Switch to {currentView === "simple" ? "Attractive" : "Simple"} Resume
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: currentView === "simple" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: currentView === "simple" ? -50 : 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              {currentView === "simple" ? <SimpleResume data={resumeData} /> : <AttractiveResume data={resumeData} />}
            </motion.div>
          </AnimatePresence>

          {isAnimating && (
            <>
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SimpleResume({ data }) {
  return (
    <div className="bg-white p-8">
      <div className="mb-8 border-b border-gray-300 pb-6">
        <div className="flex flex-col items-start md:flex-row md:items-center">
          <div className="mb-4 h-20 w-20 overflow-hidden rounded-full bg-gray-200 md:mb-0 md:mr-6">
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-10 w-10 text-gray-400" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.personal_information.full_name}</h1>
            <p className="mt-1 text-lg text-gray-600">{data.personal_information.profession}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                {data.personal_information.email}
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                {data.personal_information.phone}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {data.personal_information.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Section title="Professional Summary">
            <p className="text-gray-700">{data.professional_summary}</p>
          </Section>

          <Section title="Experience">
            {data.experience.map((exp, index) => (
              <ExperienceItem
                key={index}
                title={exp.position}
                company={exp.company}
                period={`${exp.start_date} - ${exp.is_current ? "Present" : exp.end_date}`}
                description={exp.description}
              />
            ))}
          </Section>

          <Section title="Projects">
            {data.project.map((proj, index) => (
              <ProjectItem
                key={index}
                title={proj.name}
                type={proj.type}
                description={proj.description}
                url={proj.url}
              />
            ))}
          </Section>

          <Section title="Education">
            {data.education.map((edu, index) => (
              <ExperienceItem
                key={index}
                title={`${edu.degree} in ${edu.field}`}
                company={edu.institution}
                period={edu.graduation_date}
                description={`GPA: ${edu.gpa}`}
              />
            ))}
          </Section>
        </div>

        <div>
          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Connect">
            <div className="flex flex-wrap gap-3">
              {Object.entries(data.social_media[0]).map(([platform, url]) => {
                // const Icon = socialIcons[platform] || Globe;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200"
                    aria-label={platform}
                  >
                    {/* <Icon className="h-5 w-5" /> */}
                  </a>
                );
              })}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function AttractiveResume({ data }) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="mb-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg">
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white/30 md:mb-0 md:mr-6">
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <User className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{data.personal_information.full_name}</h1>
            <p className="mt-1 text-xl text-indigo-200">{data.personal_information.profession}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-4 md:justify-start">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                {data.personal_information.email}
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                {data.personal_information.phone}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {data.personal_information.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Section title="Professional Summary" accent>
            <p className="text-gray-700">{data.professional_summary}</p>
          </Section>

          <Section title="Experience" accent>
            {data.experience.map((exp, index) => (
              <ExperienceItem
                key={index}
                title={exp.position}
                company={exp.company}
                period={`${exp.start_date} - ${exp.is_current ? "Present" : exp.end_date}`}
                description={exp.description}
                accent
              />
            ))}
          </Section>

          <Section title="Projects" accent>
            {data.project.map((proj, index) => (
              <ProjectItem
                key={index}
                title={proj.name}
                type={proj.type}
                description={proj.description}
                url={proj.url}
                accent
              />
            ))}
          </Section>

          <Section title="Education" accent>
            {data.education.map((edu, index) => (
              <ExperienceItem
                key={index}
                title={`${edu.degree} in ${edu.field}`}
                company={edu.institution}
                period={edu.graduation_date}
                description={`GPA: ${edu.gpa}`}
                accent
              />
            ))}
          </Section>
        </div>

        <div>
          <Section title="Skills" accent>
            <div className="space-y-3">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-indigo-500"></div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Connect" accent>
            <div className="flex flex-wrap gap-3">
              {Object.entries(data.social_media[0]).map(([platform, url]) => {
                // const Icon = socialIcons[platform] || Globe;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-indigo-100 p-2 text-indigo-700 transition-colors hover:bg-indigo-200"
                    aria-label={platform}
                  >
                    {/* <Icon className="h-5 w-5" /> */}
                  </a>
                );
              })}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, accent = false }) {
  return (
    <div className="mb-8">
      <h2 className={`mb-4 text-xl font-bold ${accent ? "text-indigo-700" : "text-gray-800"}`}>
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function ExperienceItem({
  title,
  company,
  period,
  description,
  accent = false,
}) {
  return (
    <div className={`rounded-lg p-5 ${accent ? "bg-white shadow-sm" : "bg-gray-50"}`}>
      <div className="flex flex-wrap justify-between">
        <h3 className={`font-bold ${accent ? "text-indigo-700" : "text-gray-800"}`}>{title}</h3>
        <span className={`text-sm ${accent ? "text-indigo-500" : "text-gray-600"}`}>
          <Calendar className="inline mr-1 h-4 w-4" />
          {period}
        </span>
      </div>
      <div className={`mt-1 flex items-center ${accent ? "text-indigo-600" : "text-gray-700"}`}>
        <Briefcase className="mr-1 h-4 w-4" />
        {company}
      </div>
      <p className={`mt-3 ${accent ? "text-gray-700" : "text-gray-600"}`}>{description}</p>
    </div>
  );
}

function ProjectItem({
  title,
  type,
  description,
  url,
  accent = false,
}) {
  return (
    <div className={`rounded-lg p-5 ${accent ? "bg-white shadow-sm" : "bg-gray-50"}`}>
      <div className="flex flex-wrap justify-between">
        <h3 className={`font-bold ${accent ? "text-indigo-700" : "text-gray-800"}`}>{title}</h3>
        <span className={`text-sm ${accent ? "text-indigo-500" : "text-gray-600"}`}>
          {type}
        </span>
      </div>
      <p className={`mt-3 ${accent ? "text-gray-700" : "text-gray-600"}`}>{description}</p>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`mt-3 inline-flex items-center text-sm ${accent ? "text-indigo-600 hover:text-indigo-800" : "text-blue-600 hover:text-blue-800"}`}
      >
        <Link className="mr-1 h-4 w-4" />
        View Project
      </a>
    </div>
  );
}