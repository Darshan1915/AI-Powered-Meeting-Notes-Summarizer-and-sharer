import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post("/api/summarize", async (req, res) => {
  try {
    const { transcript } = req.body;

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages: [
          { role: "system", content: "You are a helpful summarizer." },
          { role: "user", content: `Summarize this transcript: ${transcript}` }
        ],
        max_tokens: 500
      })
    });

    const data = await groqResponse.json();

    const summary = data?.choices?.[0]?.message?.content || "No summary generated.";
    // console.log("Extracted summary:", summary);

    res.json({
      success: true,
      message: "✅ Summary generated successfully",
      summary,
    });

  } catch (err) {
    console.error("Groq API error:", err);
    res.status(500).json({ error: "Failed to summarize" });
  }
});



app.get("/",(req,res)=>{
    res.send("Worksss!!!")
})

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
