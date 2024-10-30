// app/api/generate-assessment/route.ts (or /pages/api/generate-assessment.ts in older Next.js versions)

import { NextResponse } from "next/server";

// Define the POST method to handle the form submission
export async function POST(request: Request) {
  // Parse the data from the request body
  const formData = await request.json();

  const {
    fullName,
    dateOfBirth,
    gender,
    dateOfAssessment,
    referralSource,
    nextSessionDateTime,
    sessionNumber,
    data,
    assessment,
    plan,
  } = formData;

  // Construct the prompt for the OpenAI model
  const prompt = `
  Role:
  You are a mental health professional tasked with generating a comprehensive DAP (Data, Assessment, Plan) note based on the information provided below.
  
  Input:
  {
    "ClientInformation": {
      "FullName": "${fullName}",
      "DateOfBirth": "${dateOfBirth}",
      "Gender": "${gender}",
      "DateOfAssessment": "${dateOfAssessment}",
      "ReferralSource": "${referralSource}",
      "NextSessionDateTime": "${nextSessionDateTime}",
      "SessionNumber": "${sessionNumber}"
    },
    "SessionNotes": {
      "Data": "${data}",
      "Assessment": "${assessment}",
      "Plan": "${plan}"
    }
  }
  
  Task:
  Generate a structured DAP note that follows this format:
  
  Output Format (JSON):
  {
    "ClientInformation": {
      "FullName": "${fullName}",
      "DateOfBirth": "${dateOfBirth}",
      "Gender": "${gender}",
      "DateOfAssessment": "${dateOfAssessment}",
      "ReferralSource": "${referralSource}",
      "NextSessionDateTime": "${nextSessionDateTime}",
      "SessionNumber": "${sessionNumber}"
    },
    "DAPNote": {
      "Data": "${data}",
      "Assessment": "${assessment}",
      "Plan": "${plan}"
    }
  }
  
  Ensure that the output is in valid JSON format.
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
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("OpenAI API error:", errorResponse);
      return NextResponse.json(
        { error: "Failed to generate DAP note." },
        { status: 500 }
      );
    }

    // Parse the response from OpenAI
    const result = await response.json();
    let generatedDAP =
      result.choices?.[0]?.message?.content || "No DAP note generated.";
    generatedDAP = generatedDAP.replace(/[*#]/g, ""); // Clean up any markdown symbols

    const parsedDAP = JSON.parse(generatedDAP); // Parse JSON-formatted DAP note
    console.log("parsedDAP", parsedDAP);
    return NextResponse.json(parsedDAP);
  } catch (error) {
    console.error("Error generating DAP note:", error);
    return NextResponse.json(
      { error: "Error processing the request" },
      { status: 500 }
    );
  }
}
