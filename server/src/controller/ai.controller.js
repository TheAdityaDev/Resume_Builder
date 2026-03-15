import ai from "../db/ai.config.js";
import resumeModel from "../model/resume.model.js";
import fs from "fs";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

// enhance the resume summary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent)
      return res.status(400).json({ message: "All fields are required" });

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a n expert in resume writing and you are going to give me the resume summary to improve it and make it more expert.Your should be 1-2 sentence also highlighting key skills ,experience and career objectives.Make it compelling and ATS-friendly and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent)
      return res.status(400).json({ message: "All fields are required" });

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing.Your task is to enhance the job description of a resume.The job description should be only 1-2 sentence also highlight key responsibilities and requirements.Make it compelling and ATS-friendly and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const uploadResume = async (req, res) => {
  let uploadedFilePath;
  try {
    let { resumeText, title } = req.body;
    const userId = req.userId;
    
    console.log('[uploadResume] ===== REQUEST START =====');
    console.log('[uploadResume] userId:', userId);
    console.log('[uploadResume] file present:', !!req.file);
    console.log('[uploadResume] resumeText from body:', !!resumeText, 'length:', resumeText ? resumeText.length : 0);
    
    if (req.file) {
      console.log('[uploadResume] File details:', {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        filename: req.file.filename
      });
    }

    // If client uploaded a file via multipart/form-data (field 'resume'), parse it server-side
    if ((!resumeText || resumeText.trim() === "") && req.file && req.file.path) {
      uploadedFilePath = req.file.path;
      try {
        console.log('[uploadResume] Starting PDF parse for:', req.file.originalname);
        
        // Check if file exists
        if (!fs.existsSync(req.file.path)) {
          console.error('[uploadResume] File does not exist at path:', req.file.path);
          return res.status(400).json({ message: "Uploaded file not found on disk" });
        }
        
        const buffer = fs.readFileSync(req.file.path);
        console.log('[uploadResume] File read successfully, buffer size:', buffer.length, 'bytes');
        
        // Check if buffer is valid
        if (!buffer || buffer.length === 0) {
          console.error('[uploadResume] Buffer is empty or invalid');
          throw new Error('File buffer is empty');
        }
        
        const parsed = await pdfParse(buffer);
        console.log('[uploadResume] PDF parsed successfully');
        console.log('[uploadResume] Parsed object keys:', Object.keys(parsed));
        console.log('[uploadResume] Text length:', parsed.text ? parsed.text.length : 0);
        console.log('[uploadResume] Page count:', parsed.numpages);
        
        resumeText = parsed && parsed.text ? parsed.text : "";
        console.log('[uploadResume] Extracted text length:', resumeText.length);
        
        if (resumeText.length === 0) {
          console.warn('[uploadResume] WARNING: PDF has no text content');
        } else {
          console.log('[uploadResume] Text preview:', resumeText.substring(0, 300));
        }
        
        // If title wasn't provided, use filename
        if (!title) title = req.file.originalname || "Uploaded Resume";
        console.log('[uploadResume] Title set to:', title);
      } catch (err) {
        console.error('[uploadResume] PDF parsing failed');
        console.error('[uploadResume] Error message:', err && err.message ? err.message : String(err));
        console.error('[uploadResume] Error stack:', err && err.stack ? err.stack : 'No stack trace');
        console.error('[uploadResume] Full error object:', err);
        
        // Return error response instead of silently continuing
        if (uploadedFilePath) {
          try { fs.unlinkSync(uploadedFilePath); } catch (e) {}
        }
        return res.status(400).json({ 
          message: "Failed to parse PDF file", 
          error: err && err.message ? err.message : String(err),
          details: "Check server logs for more information"
        });
      }
    }

    if (!resumeText || resumeText.trim() === "") {
      console.error('[uploadResume] No resume text available after processing');
      if (uploadedFilePath) {
        try { fs.unlinkSync(uploadedFilePath); } catch (e) {}
      }
      return res.status(400).json({ message: "All fields are required or PDF could not be parsed" });
    }
    
    console.log('[uploadResume] Proceeding with AI extraction...');

    const systemPrompt =
      "You are an expert AI Agent to extract data from resume.";

    const userPrompt = `extract data from this resume: ${resumeText} Provide data in json format with no additional text before and after: {
    professional_summary:{type:String,default:""},
    skills:[{type:String}],
    personal_information:{
        image:{type:String , default:""},
        full_name:{type:String},
        profession:{type:String},
        email:{type:String},
        phone:{type:String},
        location:{type:String},
        website:{type:String},
        social_media:[{type:String}],
    },
    experience:[
        {
            company:{type:String},
            position:{type:String},
            start_date:{type:String},
            end_date:{type:String},
            description:{type:String},
            is_current:{type:Boolean},
        }
    ],
     projects:[
        {
            name:{type:String},
            type:{type:String},
            description:{type:String},
            url:{type:String},
        }
    ],
     education:[
        {
            institution:{type:String},
            degree:{type:String},
            field:{type:String},
            graduation_date:{type:String},
            gpa:{type:String},
            is_current:{type:Boolean},
        }
    ],
    }`;

    let response;
    try {
      response = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        response_format: "json_object",
      });
    } catch (aiErr) {
      console.error('[uploadResume] AI call failed:', aiErr && aiErr.message ? aiErr.message : aiErr);
      // cleanup uploaded file if present
      if (uploadedFilePath) {
        try { fs.unlinkSync(uploadedFilePath); } catch (e) {}
      }
      return res.status(500).json({ message: 'AI service error', error: aiErr && aiErr.message ? aiErr.message : String(aiErr) });
    }

    const extractData = response?.choices?.[0]?.message?.content;
    if (!extractData) {
      // cleanup uploaded file if present
      if (uploadedFilePath) {
        try { fs.unlinkSync(uploadedFilePath); } catch (e) {}
      }
      console.error('[uploadResume] AI response missing content:', response);
      return res.status(500).json({ message: 'AI returned no content' });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(extractData);
    } catch (parseErr) {
      console.error('[uploadResume] Failed to parse AI response as JSON:', parseErr.message);
      // cleanup uploaded file if present
      if (uploadedFilePath) {
        try { fs.unlinkSync(uploadedFilePath); } catch (e) {}
      }
      return res.status(500).json({ message: 'Failed to parse AI response', error: parseErr.message, snippet: extractData?.slice?.(0, 200) });
    }

    const newResume = await resumeModel.create({
      userId,
      title,
      ...parsedData,
    });

    // cleanup uploaded file if present
    if (uploadedFilePath) {
      try { fs.unlinkSync(uploadedFilePath); } catch (e) {}
    }

    res.json({ resumeId: newResume._id });
  } catch (error) {
    console.error('[uploadResume] Unexpected error:', error && error.message ? error.message : error);
    // cleanup uploaded file if present
    if (uploadedFilePath) {
      try { fs.unlinkSync(uploadedFilePath); } catch (e) {}
    }
    return res.status(500).json({ message: 'Server error', error: error && error.message ? error.message : String(error) });
  }
};
