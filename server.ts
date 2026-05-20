import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Configuration
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Example Gemini endpoint for Workforce Intelligence
  app.post("/api/ai/analyze-workforce", async (req, res) => {
    try {
      const { data } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this workforce data for a large enterprise (5,000-50,000 employees). Provide attrition risk, engagement insights, and specific actionable recommendations in a structured JSON format. Data: ${JSON.stringify(data)}`,
        config: {
          responseMimeType: "application/json"
        }
      });
      res.json(JSON.parse(response.text || "{}"));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are Nexus AI, a professional enterprise HR assistant. You help HR managers with workforce data, payroll queries, and employee engagement strategies. Be concise, professional, and data-driven."
        }
      });
      // Optionally handle history if provided
      const response = await chat.sendMessage({ message });
      res.json({ content: response.text });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // AI-Powered Leave Forecasting Endpoint
  app.post("/api/ai/forecast-leave", async (req, res) => {
    try {
      const { currentBalance, accrualRate, trends } = req.body;
      const prompt = `You are an expert HR AI forecasting system. Based on the following parameters:
- Current Average Leave Balance: ${currentBalance || '18.5'} days per employee
- Accrual Rate: ${accrualRate || '1.75'} days/month
- Historic PTO Trends: Peak usage in July and August (summer surge), lower usage in Q1 and late Q4.
- Projected Trends: ${trends || 'General increases in wellness days and family care leave.'}

Provide a 6-month predictive forecast of leave taken, accrual accumulated, and ending leave balances.
Also, provide 3 actionable, smart strategic insights/recommendations for HR to manage team coverage and PTO liabilities.

Respond strictly in the following JSON format:
{
  "forecastedBalances": [
    { "month": "Jun", "projectedLeaveTaken": number, "accrual": number, "endingBalance": number },
    { "month": "Jul", "projectedLeaveTaken": number, "accrual": number, "endingBalance": number },
    { "month": "Aug", "projectedLeaveTaken": number, "accrual": number, "endingBalance": number },
    { "month": "Sep", "projectedLeaveTaken": number, "accrual": number, "endingBalance": number },
    { "month": "Oct", "projectedLeaveTaken": number, "accrual": number, "endingBalance": number },
    { "month": "Nov", "projectedLeaveTaken": number, "accrual": number, "endingBalance": number }
  ],
  "insights": [
    "string",
    "string",
    "string"
  ],
  "summaryText": "string summarizing the results"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const responseText = response.text || "{}";
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("Error generating leave forecast:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // AI-Powered Task Assignment Suggester Endpoint
  app.post("/api/ai/suggest-assignments", async (req, res) => {
    try {
      const { candidateName, candidateRole, candidateDept, tasks } = req.body;
      const prompt = `You are an expert HR Operational Planner AI.
Given a candidate's profile:
- Name: ${candidateName || 'Sarah Chen'}
- Role: ${candidateRole || 'Head of Engineering'}
- Department: ${candidateDept || 'Engineering'}

Below is the candidate's current list of onboarding tasks:
${JSON.stringify(tasks || [])}

We want to analyze or suggest optimal task assignments to HR, IT, or Managers based on:
1. Current department workloads (HR is experiencing 18 pending checks, IT has 24 open tickets, Managers have 12 syncs pending)
2. Historical completion times (HR tasks average 4 hours, IT tasks average 8 hours due to laptop setup, Manager tasks average 2 hours)
3. Employee Skill sets (e.g. For technical roles like Engineering/Product, IT tasks should be prioritized and Managers should align buddy systems immediately)

Provide a set of 3 to 4 highly specific, personalized task optimization suggestions or reassignments. Each suggestion must include:
- taskId: the task ID matching one of the tasks above (or 'new' if recommending a new crucial task)
- taskTitle: the title of the task
- suggestedDept: 'HR' | 'IT' | 'Manager'
- reason: a concise explanation of why this department/stakeholder is optimal, referencing department workload, historical completion times, or employee skill sets/role
- urgency: 'High' | 'Medium' | 'Low'
- estCompletionTime: estimated completion time under this optimization (e.g. "1.5 hours", "3 hours")

Respond strictly in the following JSON format:
{
  "suggestions": [
    {
      "taskId": "string",
      "taskTitle": "string",
      "suggestedDept": "HR",
      "reason": "string",
      "urgency": "High",
      "estCompletionTime": "string"
    }
  ],
  "summaryText": "string overall strategic summary explaining how these specific changes bypass current team bottlenecks and align with the hire's engineering/product skills"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text || "{}";
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("Error suggesting task assignments:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Welcome Email Mock Dispatcher
  app.post("/api/onboarding/dispatch-email", async (req, res) => {
    try {
      const { name, email, subject, body } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields (name, email)" });
      }
      
      // Simulating enterprise mail gateway dispatch
      console.log(`[MAIL GATEWAY] Dispatching to ${email} (Subject: ${subject})`);
      
      res.json({
        success: true,
        message: `Welcome email successfully dispatched to ${name} (${email})`,
        dispatchedAt: new Date().toLocaleDateString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Payroll processing simulation
  app.post("/api/payroll/process", async (req, res) => {
    // Simulate complex calculation
    setTimeout(() => {
      res.json({ success: true, message: "Payroll processed for 12,482 employees." });
    }, 2000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NexusHR Server running on http://localhost:${PORT}`);
  });
}

startServer();
