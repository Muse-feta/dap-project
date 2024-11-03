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
  Generate 10 unique DAP notes in JSON format, You are a mental health professional tasked with generating 10 unique DAP (Data, Assessment, Plan) notes. Each note should reflect gradual progress or minor variations across sessions. Ensure each DAP note has at least 5 detailed paragraphs per section ("Data," "Assessment," and "Plan").

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
      "Data": "${data} - 9+ unique paragraphs reflecting initial observations, client background, presenting issues, and rapport building in session 1.",
      "Assessment": "${assessment} - 9+ unique paragraphs detailing initial assessment, identified goals, strengths, challenges, and client expectations.",
      "Plan": {
    "Plan": "${plan} - Adjusted strategies to support ACT (Acceptance and Commitment Therapy), mindfulness, and boundary-setting exercises based on client feedback.",
    "GoalsAchieved": [
      "Reduced worry and anxious symptoms.",
      "Increased confidence and comfort with setting and maintaining boundaries."
    ],
    "NextSteps": [
      "Introduce forgiveness and self-compassion exercises to encourage acceptance and resilience.",
      "Continue reinforcing ACT practices, introducing techniques for handling difficult emotions with greater resilience.",
      "Plan to add cognitive restructuring exercises if necessary, based on client's feedback.",
      "Schedule another follow-up to assess ongoing progress and discuss any emerging challenges."
    ]
  }
    },
    {
      "NoteNumber": 2,
      "Data": "${data} - 9+ unique paragraphs reflecting follow-up observations, rapport improvement, and changes since session 1.",
      "Assessment": "${assessment} - 9+ unique paragraphs updating assessment with focus on emerging patterns, initial progress, and identified areas needing further attention.",
      "Plan": {
    "Plan": "${plan} - Adjusted strategies to support ACT (Acceptance and Commitment Therapy), mindfulness, and boundary-setting exercises based on client feedback.",
    "GoalsAchieved": [
      "Reduced worry and anxious symptoms.",
      "Increased confidence and comfort with setting and maintaining boundaries."
    ],
    "NextSteps": [
      "Introduce forgiveness and self-compassion exercises to encourage acceptance and resilience.",
      "Continue reinforcing ACT practices, introducing techniques for handling difficult emotions with greater resilience.",
      "Plan to add cognitive restructuring exercises if necessary, based on client's feedback.",
      "Schedule another follow-up to assess ongoing progress and discuss any emerging challenges."
    ]
  }
    },
    {
      "NoteNumber": 3,
      "Data": "${data} - 9+ unique paragraphs highlighting observations of increased engagement, any new concerns, and client’s feedback on prior session strategies.",
      "Assessment": "${assessment} - 9+ unique paragraphs expanding assessment on coping mechanisms, emotional response, and further clarifying treatment goals.",
      "Plan": {
    "Plan": "${plan} - Adjusted strategies to support ACT (Acceptance and Commitment Therapy), mindfulness, and boundary-setting exercises based on client feedback.",
    "GoalsAchieved": [
      "Reduced worry and anxious symptoms.",
      "Increased confidence and comfort with setting and maintaining boundaries."
    ],
    "NextSteps": [
      "Introduce forgiveness and self-compassion exercises to encourage acceptance and resilience.",
      "Continue reinforcing ACT practices, introducing techniques for handling difficult emotions with greater resilience.",
      "Plan to add cognitive restructuring exercises if necessary, based on client's feedback.",
      "Schedule another follow-up to assess ongoing progress and discuss any emerging challenges."
    ]
  }
    },
    {
      "NoteNumber": 4,
      "Data": "${data} - 9+ unique paragraphs covering client’s response to interventions, current mood, and any changes in presenting issues or life events.",
      "Assessment": "${assessment} - 9+ unique paragraphs evaluating strengths, progress in coping strategies, and identifying any persisting barriers.",
      "Plan": {
    "Plan": "${plan} - Adjusted strategies to support ACT (Acceptance and Commitment Therapy), mindfulness, and boundary-setting exercises based on client feedback.",
    "GoalsAchieved": [
      "Reduced worry and anxious symptoms.",
      "Increased confidence and comfort with setting and maintaining boundaries."
    ],
    "NextSteps": [
      "Introduce forgiveness and self-compassion exercises to encourage acceptance and resilience.",
      "Continue reinforcing ACT practices, introducing techniques for handling difficult emotions with greater resilience.",
      "Plan to add cognitive restructuring exercises if necessary, based on client's feedback.",
      "Schedule another follow-up to assess ongoing progress and discuss any emerging challenges."
    ]
  }
    },
    {
      "NoteNumber": 5,
      "Data": "${data} - 9+ unique paragraphs summarizing client’s engagement level, interaction with previous strategies, and personal reflections shared.",
      "Assessment": "${assessment} - 9+ unique paragraphs highlighting mid-therapy evaluation, notable progress, and potential adjustments to long-term goals.",
      "Plan": {
    "Plan": "${plan} - Adjusted strategies to support ACT (Acceptance and Commitment Therapy), mindfulness, and boundary-setting exercises based on client feedback.",
    "GoalsAchieved": [
      "Reduced worry and anxious symptoms.",
      "Increased confidence and comfort with setting and maintaining boundaries."
    ],
    "NextSteps": [
      "Introduce forgiveness and self-compassion exercises to encourage acceptance and resilience.",
      "Continue reinforcing ACT practices, introducing techniques for handling difficult emotions with greater resilience.",
      "Plan to add cognitive restructuring exercises if necessary, based on client's feedback.",
      "Schedule another follow-up to assess ongoing progress and discuss any emerging challenges."
    ]
  }
    },
    {
      "NoteNumber": 6,
      "Data": "${data} - 9+ unique paragraphs indicating client’s improvements, any resistance faced, and overall motivation.",
      "Assessment": "${assessment} - 9+ unique paragraphs analyzing client’s coping with stressors, resilience, and adaptability to therapeutic techniques.",
      "Plan": {
    "Plan": "${plan} - Adjusted strategies to support ACT (Acceptance and Commitment Therapy), mindfulness, and boundary-setting exercises based on client feedback.",
    "GoalsAchieved": [
      "Reduced worry and anxious symptoms.",
      "Increased confidence and comfort with setting and maintaining boundaries."
    ],
    "NextSteps": [
      "Introduce forgiveness and self-compassion exercises to encourage acceptance and resilience.",
      "Continue reinforcing ACT practices, introducing techniques for handling difficult emotions with greater resilience.",
      "Plan to add cognitive restructuring exercises if necessary, based on client's feedback.",
      "Schedule another follow-up to assess ongoing progress and discuss any emerging challenges."
    ]
  }
    },
    {
      "NoteNumber": 7,
      "Data": "${data} - 9+ unique paragraphs reflecting noticeable positive changes, engagement level, and new insights from client feedback.",
      "Assessment": "${assessment} - 9+ unique paragraphs focusing on client’s internalization of strategies, self-awareness growth, and any areas for further reinforcement.",
      "Plan": {
    "Plan": "${plan} - Adjusted strategies to support ACT (Acceptance and Commitment Therapy), mindfulness, and boundary-setting exercises based on client feedback.",
    "GoalsAchieved": [
      "Reduced worry and anxious symptoms.",
      "Increased confidence and comfort with setting and maintaining boundaries."
    ],
    "NextSteps": [
      "Introduce forgiveness and self-compassion exercises to encourage acceptance and resilience.",
      "Continue reinforcing ACT practices, introducing techniques for handling difficult emotions with greater resilience.",
      "Plan to add cognitive restructuring exercises if necessary, based on client's feedback.",
      "Schedule another follow-up to assess ongoing progress and discuss any emerging challenges."
    ]
  }
    },
    {
      "NoteNumber": 8,
      "Data": "${data} - 9+ unique paragraphs showing client’s development in self-reflection, increased emotional regulation, and any setbacks faced.",
      "Assessment": "${assessment} - 9+ unique paragraphs evaluating resilience, increased insight, and reviewing adjustments made in response to challenges.",
      "Plan": {
    "Plan": "${plan} - Adjusted strategies to support ACT (Acceptance and Commitment Therapy), mindfulness, and boundary-setting exercises based on client feedback.",
    "GoalsAchieved": [
      "Reduced worry and anxious symptoms.",
      "Increased confidence and comfort with setting and maintaining boundaries."
    ],
    "NextSteps": [
      "Introduce forgiveness and self-compassion exercises to encourage acceptance and resilience.",
      "Continue reinforcing ACT practices, introducing techniques for handling difficult emotions with greater resilience.",
      "Plan to add cognitive restructuring exercises if necessary, based on client's feedback.",
      "Schedule another follow-up to assess ongoing progress and discuss any emerging challenges."
    ]
  }
    },
    {
      "NoteNumber": 9,
      "Data": "${data} - 9+ unique paragraphs describing consistent application of strategies, client’s self-reported progress, and reflections on personal growth.",
      "Assessment": "${assessment} - 9+ unique paragraphs assessing readiness for reduced intervention, confidence in managing symptoms, and any areas to solidify.",
      "Plan": {
    "Plan": "${plan} - Adjusted strategies to support ACT (Acceptance and Commitment Therapy), mindfulness, and boundary-setting exercises based on client feedback.",
    "GoalsAchieved": [
      "Reduced worry and anxious symptoms.",
      "Increased confidence and comfort with setting and maintaining boundaries."
    ],
    "NextSteps": [
      "Introduce forgiveness and self-compassion exercises to encourage acceptance and resilience.",
      "Continue reinforcing ACT practices, introducing techniques for handling difficult emotions with greater resilience.",
      "Plan to add cognitive restructuring exercises if necessary, based on client's feedback.",
      "Schedule another follow-up to assess ongoing progress and discuss any emerging challenges."
    ]
  }
    },
    {
      "NoteNumber": 10,
      "Data": "${data} - 9+ unique paragraphs reflecting final session observations, client’s reflections on therapy journey, and summary of changes.",
      "Assessment": "${assessment} - 9+ unique paragraphs providing a conclusive assessment, summarizing progress, and readiness for discharge or continued self-management.",
      "Plan": {
    "Plan": "${plan} - Adjusted strategies to support ACT (Acceptance and Commitment Therapy), mindfulness, and boundary-setting exercises based on client feedback.",
    "GoalsAchieved": [
      "Reduced worry and anxious symptoms.",
      "Increased confidence and comfort with setting and maintaining boundaries."
    ],
    "NextSteps": [
      "Introduce forgiveness and self-compassion exercises to encourage acceptance and resilience.",
      "Continue reinforcing ACT practices, introducing techniques for handling difficult emotions with greater resilience.",
      "Plan to add cognitive restructuring exercises if necessary, based on client's feedback.",
      "Schedule another follow-up to assess ongoing progress and discuss any emerging challenges."
    ]
  }
    }
  ]
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