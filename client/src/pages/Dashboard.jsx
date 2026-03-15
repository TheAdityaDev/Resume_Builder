import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const Dashboard = () => {

  const {user , token} = useSelector(state=>state.auth)


  const colors = [
    "#FF6B6B",
    "#6BCB77",
    "#4D96FF",
    "#FFD93D",
    "#FF6FCF",
    "#845EC2",
  ];

  const [loading, setLoading] = useState(true);
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setLoading(true);
    setTimeout(() => {
      setAllResumes(dummyResumeData);
      setLoading(false);
    }, 1000);
  };

  const createResume = async (e) => {
    try {
     e.preventDefault();
    const {data} = await api.post('/api/resume/create',{title},{
      headers: {
        Authorization: token 
      }
    })
    setAllResumes([...allResumes, data.resume])
    setTitle('')
    setShowCreateResume(false)
    navigate(`/app/builder/${data.resume._id}`)
    toast.success(data.message)
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message || "Something went wrong")
   }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
   setIsLoading(true)
   try {
    // send file as multipart/form-data to server and let server extract text
    const formData = new FormData();
    formData.append('title', title);
    if (resume) {
      console.log('[uploadResume] Appending file:', resume.name, 'type:', resume.type, 'size:', resume.size);
      formData.append('resume', resume);
    }
    
    // Log FormData contents
    console.log('[uploadResume] FormData entries:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    const { data } = await api.post('/api/ai/upload-resume', formData);
    setTitle('')
    setResume(null)
    setShowUploadResume(false)
    toast.success("Resume uploaded successfully")
    navigate(`/app/builder/${data.resumeId}`)
   } catch (error) {
    console.error('[uploadResume] Error:', error);
    toast.error(error?.response?.data?.message || error.message || "Something went wrong")
   }
   setIsLoading(false)
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const editTitle = async (e) => {
    e.preventDefault();
  };

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (confirm)
      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
  };

  const SkeletonCard = () => {
    return (
      <div className="w-full sm:max-w-36 h-48 rounded-lg border bg-gray-200 animate-pulse flex flex-col justify-between p-3">
        <div className="w-10 h-10 bg-gray-300 rounded-lg mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mt-3"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
      </div>
    );
  };

  const SkeletonActionButton = () => {
    return (
      <div className="w-full sm:max-w-36 h-48 bg-gray-200 border border-gray-300 rounded-lg animate-pulse"></div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent   sm:hidden">
        Welcome, John Doe
      </p>
      <div className="flex gap-4">
        {loading ? (
          <>
            <SkeletonActionButton />
            <SkeletonActionButton />
          </>
        ) : (
          <>
            <button
              onClick={() => setShowCreateResume(true)}
              className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-300 group hover:border-indigo-600 border-2 border-dotted transition-all duration-300 cursor-pointer"
            >
              <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-indigo-400 to-pink-700 text-white rounded-full" />
              <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
                Create Resume
              </p>
            </button>

            <button
              onClick={() => setShowUploadResume(true)}
              className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-300 group hover:border-purple-600 border-2 border-dotted transition-all duration-300 cursor-pointer"
            >
              <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-purple-300 to-purple-700 text-white rounded-full" />
              <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
                Upload Resume
              </p>
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 mt-10">
        {loading
          ? // show 6 skeleton cards
            [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
          : allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <button
                  key={resume._id}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg,${baseColor}10,${baseColor}40)`,
                    borderColor: baseColor + "40",
                  }}
                >
                  <FilePenLineIcon
                    className="size-7 group-hover:scale-105 transition-all"
                    style={{ color: baseColor }}
                  />
                  <p
                    className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </p>

                  <p className="absolute top-2 right-2 text-xs text-slate-500 italic">
                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-3 right-3 group-hover:flex items-center justify-center hidden gap-3"
                  >
                    <TrashIcon
                      onClick={() => deleteResume(resume._id)}
                      className="size-4 text-red-500 hover:scale-110 transition-all"
                    />
                    <PencilIcon
                      onClick={() => {
                        setEditResumeId(resume._id);
                        setTitle(resume.title);
                      }}
                      className="size-4 hover:scale-110 transition-all"
                    />
                  </div>
                </button>
              );
            })}
      </div>

      {showCreateResume && (
        <form
          onSubmit={createResume}
          onClick={() => {
            setShowCreateResume(false);
          }}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white p-10 rounded-lg"
          >
            <h1 className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent ">
              Create Resume
            </h1>
            {/* <button onClick={()=>{setShowCreateResume(false); setTitle('')}} className='mt-4 px-4 py-2 bg-red-500 text-white rounded-lg'>Close</button> */}
            <XIcon
              onClick={() => {
                setShowCreateResume(false);
                setTitle("");
              }}
              className="size-6 absolute top-6 right-6 text-slate-500 hover:text-slate-700 cursor-pointer transition-all"
            />
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-600"
              placeholder="Enter resume title."
              required
            />
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg">
              Create
            </button>
          </div>
        </form>
      )}

      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => {
            setShowUploadResume(false);
          }}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white p-10 rounded-lg"
          >
            <h1 className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent ">
              Upload Resume
            </h1>
            <XIcon
              onClick={() => {
                setShowUploadResume(false);
                setTitle("");
              }}
              className="size-6 absolute top-6 right-6 text-slate-500 hover:text-slate-700 cursor-pointer transition-all"
            />
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className="w-full border mb-2 border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-600"
              placeholder="Enter resume title."
              required
            />
            <div>
              <label
                htmlFor="Resume-input"
                className="block text-sm  text-slate-700"
              >
                Select Resume File
                <div className="flex flex-col items-center justify-center gap-2 border-2 group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-indigo-500 hover:text-indigo-400 cursor-pointer transition-colors">
                  {resume ? (
                    <p className="text-indigo-400">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloudIcon className="size-8 group-hover:scale-105 transition-all" />
                      <p className="text-sm group-hover:text-indigo-600 transition-all">
                        Click to upload or drag and drop
                      </p>
                    </>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="Resume-input"
                accept=".pdf"
                hidden
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg">
              Upload
            </button>
          </div>
        </form>
      )}

      {/* edit resume page */}
      {editResumeId && (
        <form
          onSubmit={editTitle}
          onClick={() => {
            setEditResumeId(false);
          }}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white p-10 rounded-lg"
          >
            <h1 className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent ">
              Edit Resume Title
            </h1>

            <XIcon
              onClick={() => {
                setEditResumeId("");
                setTitle("");
              }}
              className="size-6 absolute top-6 right-6 text-slate-500 hover:text-slate-700 cursor-pointer transition-all"
            />
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-600"
              placeholder="Enter resume title."
              required
            />
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg">
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
