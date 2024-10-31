// app/api/generate-assessment/route.ts (or /pages/api/generate-assessment.ts in older Next.js versions)

import { NextResponse } from "next/server";

// Define the POST method to handle the form submission
export async function POST(request: Request) {
  // Parse the data from the request body
  const formData = await request.json();

  const { fullName, gender, sessionNumber, data, assessment, plan } = formData;

  // Construct the prompt for the OpenAI model
const prompt = `
  Role:
  You are a mental health professional tasked with generating 10 unique DAP (Data, Assessment, Plan) notes. Each note should reflect slight variations in content to simulate observations across multiple sessions.

  Input:
  {
    "ClientInformation": {
      "FullName": "${fullName}",
      "Gender": "${gender}",
      "SessionNumber": "${sessionNumber}"
    },
    "SessionNotesTemplate": {
      "Data": "${data}",
      "Assessment": "${assessment}",
      "Plan": "${plan}"
    }
  }

  Task:
  Generate 10 unique DAP notes in JSON format, each with slight variations for the fields "Data," "Assessment," and "Plan." Make sure the content is slightly different for each note to reflect session progress and variations.

  Output Format (JSON):
  
  {
    "ClientInformation": {
      "FullName": "${fullName}",
      "Gender": "${gender}",
      "SessionNumber": "${sessionNumber}"
    },
    "DAPNotes": [
      {
          "NoteNumber": 1,
          "Data": "${data} - unique observation with 5 paragraphs",
          "Assessment": "${assessment} - unique assessment with 5 paragraphs",
          "Plan": "${plan} - unique plan with 5 paragraphs"
        },
      {
          "NoteNumber": 2,
          "Data": "${data} - unique observation with 5 paragraphs",
          "Assessment": "${assessment} - unique assessment with 5 paragraphs",
          "Plan": "${plan} - unique plan with 5 paragraphs"
        },
      {
          "NoteNumber": 3,
          "Data": "${data} - unique observation with 5 paragraphs",
          "Assessment": "${assessment} - unique assessment with 5 paragraphs",
          "Plan": "${plan} - unique plan with 5 paragraphs"
        },
      {
          "NoteNumber": 4,
          "Data": "${data} - unique observation with 5 paragraphs",
          "Assessment": "${assessment} - unique assessment with 5 paragraphs",
          "Plan": "${plan} - unique plan with 5 paragraphs"
        },
      {
          "NoteNumber": 5,
          "Data": "${data} - unique observation with 5 paragraphs",
          "Assessment": "${assessment} - unique assessment with 5 paragraphs",
          "Plan": "${plan} - unique plan with 5 paragraphs"
        },
      {
          "NoteNumber": 6,
          "Data": "${data} - unique observation with 5 paragraphs",
          "Assessment": "${assessment} - unique assessment with 5 paragraphs",
          "Plan": "${plan} - unique plan with 5 paragraphs"
        },
      {
          "NoteNumber": 7,
          "Data": "${data} - unique observation with 5 paragraphs",
          "Assessment": "${assessment} - unique assessment with 5 paragraphs",
          "Plan": "${plan} - unique plan with 5 paragraphs"
        },
      {
          "NoteNumber": 8,
          "Data": "${data} - unique observation with 5 paragraphs",
          "Assessment": "${assessment} - unique assessment with 5 paragraphs",
          "Plan": "${plan} - unique plan with 5 paragraphs"
        },
      {
          "NoteNumber": 9,
          "Data": "${data} - unique observation with 5 paragraphs",
          "Assessment": "${assessment} - unique assessment with 5 paragraphs",
          "Plan": "${plan} - unique plan with 5 paragraphs"
        },
      {
          "NoteNumber": 10,
          "Data": "${data} - unique observation with 5 paragraphs",
          "Assessment": "${assessment} - unique assessment with 5 paragraphs",
          "Plan": "${plan} - unique plan with 5 paragraphs"
        }
    ]
  }

  Ensure that the output is in valid JSON format and all sessions are numbered as "${sessionNumber}".
`;


  // Make a call to the OpenAI API
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a psychologist providing DAP notes.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 3000,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("OpenAI API error:", errorResponse);
      return NextResponse.json(
        { error: "Failed to generate DAP notes." },
        { status: 500 }
      );
    }

    // Parse the response from OpenAI
    const result = await response.json();
    let generatedDAP =
      result.choices?.[0]?.message?.content || "No DAP notes generated.";
    generatedDAP = generatedDAP.replace(/[*#]/g, ""); // Clean up any markdown symbols

    const parsedDAP = JSON.parse(generatedDAP); // Parse JSON-formatted DAP notes
    console.log("parsedDAP", parsedDAP);
    return NextResponse.json(parsedDAP);
  } catch (error) {
    console.error("Error generating DAP notes:", error);
    return NextResponse.json(
      { error: "Error processing the request" },
      { status: 500 }
    );
  }
}
