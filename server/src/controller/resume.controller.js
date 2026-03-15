// controller for creating new resume

import imageKit from "../db/imageKit.config.js";
import resumeModel from "../model/resume.model.js";
import fs from 'fs'

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await resumeModel.create({ userId, title });

    // resume created successfully
    res
      .status(200)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// delete the resume

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await resumeModel.deleteOne({ userId, _id: resumeId });

    // resume created successfully
    return res.status(200).json({ message: "Resume delete successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// get user resume by id
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await resumeModel.findOne({ userId, _id: resumeId });

    if (!resume) return res.status(400).json({ message: "Resume not found" });

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    // resume created successfully
    res.status(200).json({ resume });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// get user resume public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await resumeModel.findById({ public: true, _id: resumeId });

    if (!resume) return res.status(400).json({ message: "Resume not found" });
    res.status(200).json({ resume });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// update resume
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const { title, resumeData, removeBackground } = req.body;

    const image = req.file;
    if (image) {

        const imageBufferData = fs.createReadStream(image.path)

      const response = await imageKit.files.upload({
        file: fs.createReadStream(imageBufferData),
        fileName: "resume.jpg",
        folder:"user-resumes",
        transformation:{
            pre:'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',bg-remove' : '')
        }
      });

      resumeDataCopy.personal_information.image = response.url
    }

    let resumeDataCopy = JSON.parse(resumeData);

    const resume = await resumeModel.findOne({ userId, _id: resumeId });

    if (!resume) return res.status(400).json({ message: "Resume not found" });

    resume.title = title;

    resume = await resumeModel.updateOne(
      { userId, _id: resumeId },
      resumeData,
      { new: true }
    );

    // resume created successfully
    res.status(200).json({ message: "Resume updated successfully", resume });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
