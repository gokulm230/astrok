"use client";

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface AstrologicalReading {
  name: string;
  zodiacSign: string;
  birthStar: string;
  general: string;
  love: string;
  career: string;
  wellness: string;
  spirituality: string;
}

interface FormData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  rasi: string;
  nachathira: string;
}

const GEMINI_API_KEY =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  "AIzaSyBapFomRpfJ2p9F45WtSNiEgF-aeAswKlE";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function generateAstrologicalReading(
  formData: FormData,
  language: 'english' | 'tamil' = 'english'
): Promise<AstrologicalReading> {
  try {
    const prompt = language === 'tamil' 
      ? `நீங்கள் ஒரு நிபுணத்துவம் வாய்ந்த ஜோதிடர். பின்வரும் நபருக்கு விரிவான ஜோதிட முன்னறிவிப்பு வழங்கவும்:

பெயர்: ${formData.name}
பிறந்த தேதி: ${formData.dateOfBirth}
பிறந்த நேரம்: ${formData.timeOfBirth || "வழங்கப்படவில்லை"}
பிறந்த இடம்: ${formData.placeOfBirth}
${formData.rasi ? `ராசி: ${formData.rasi}` : ""}
${formData.nachathira ? `நட்சத்திரம்: ${formData.nachathira}` : ""}

தயவுசெய்து பின்வரும் JSON வடிவத்தில் மட்டும் பதிலளிக்கவும், கூடுதல் உரை வேண்டாம்:
{
  "zodiacSign": "தீர்மானிக்கப்பட்ட ராசி",
  "birthStar": "தீர்மானிக்கப்படட நட்சத்திரம்",
  "general": "விரிவான பொதுவான ஆளுமை பகுப்பாய்வு மற்றும் வாழ்க்கை கண்ணோட்டம் (3-4 வாக்கியங்கள்)",
  "love": "விரிவான காதல் மற்றும் உறவு நுண்ணறிவுகள் (3-4 வாக்கியங்கள்)",
  "career": "விரிவான தொழில் மற்றும் தொழில்முறை வழிகாட்டுதல் (3-4 வாக்கியங்கள்)",
  "wellness": "விரிவான ஆரோக்கியம் மற்றும் நல்வாழ்வு ஆலோசனை (3-4 வாக்கியங்கள்)",
  "spirituality": "விரிவான ஆன்மீக வழிகாட்டுதல் மற்றும் வாழ்க்கை நோக்கம் (3-4 வாக்கியங்கள்)"
}

முன்னறிவிப்பை தனிப்பட்ட, நுண்ணறிவு மற்றும் நேர்மறையானதாக ஆக்கவும், ஜோதிட பாரம்பரியங்களுக்கு உண்மையாக இருக்கவும். வழிகாட்டுதல் மற்றும் அதிகாரமளிப்பதில் கவனம் செலுத்தவும். முழு பதிலும் தமிழில் இருக்க வேண்டும்.`
      : `As an expert astrologer, provide a detailed astrological reading for the following person:

Name: ${formData.name}
Date of Birth: ${formData.dateOfBirth}
Time of Birth: ${formData.timeOfBirth || "Not provided"}
Place of Birth: ${formData.placeOfBirth}
${formData.rasi ? `Rasi (Zodiac Sign): ${formData.rasi}` : ""}
${formData.nachathira ? `Nachathira (Birth Star): ${formData.nachathira}` : ""}

Please provide the response in the following JSON format only, no additional text:
{
  "zodiacSign": "determined zodiac sign",
  "birthStar": "determined birth star or nakshatra",
  "general": "detailed general personality analysis and life overview (3-4 sentences)",
  "love": "detailed love and relationship insights (3-4 sentences)",
  "career": "detailed career and professional guidance (3-4 sentences)",
  "wellness": "detailed health and wellness advice (3-4 sentences)",
  "spirituality": "detailed spiritual guidance and life purpose (3-4 sentences)"
}

Make the reading personalized, insightful, and positive while being authentic to astrological traditions. Focus on guidance and empowerment.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const data: GeminiResponse = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response generated from Gemini API");
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    // Try to parse the JSON response
    let parsedReading;
    try {
      // Clean the response in case there are markdown code blocks
      const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, "").trim();
      parsedReading = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", aiResponse);
      throw new Error("Invalid response format from AI");
    }

    // Return the structured reading with the user's name
    return {
      name: formData.name,
      zodiacSign: parsedReading.zodiacSign || (language === 'tamil' ? "சிம்மம்" : "Leo"),
      birthStar: parsedReading.birthStar || (language === 'tamil' ? "மகம்" : "Magha"),
      general:
        parsedReading.general ||
        (language === 'tamil' 
          ? "உங்களுக்கு உலகிற்கு சிறப்பு பரிசுகளைக் கொண்டுவரும் ஒரு தனிப்பட்ட அண்ட கையொப்பம் உள்ளது."
          : "You have a unique cosmic signature that brings special gifts to the world."),
      love:
        parsedReading.love ||
        (language === 'tamil'
          ? "உங்கள் இதயம் காதல் மற்றும் உறவுகளின் விஷயங்களில் ஆழமான ஞானத்தைக் கொண்டுள்ளது."
          : "Your heart carries deep wisdom in matters of love and relationships."),
      career:
        parsedReading.career ||
        (language === 'tamil'
          ? "உங்கள் தொழில்முறை பாதை வெற்றியை நோக்கி அண்ட சக்திகளால் வழிநடத்தப்படுகிறது."
          : "Your professional path is guided by cosmic forces toward success."),
      wellness:
        parsedReading.wellness ||
        (language === 'tamil'
          ? "சமநிலை மற்றும் நல்லிணக்கம் உங்கள் உடல் மற்றும் மன நலனுக்கு முக்கியமானது."
          : "Balance and harmony are key to your physical and mental well-being."),
      spirituality:
        parsedReading.spirituality ||
        (language === 'tamil'
          ? "உங்கள் ஆன்மீக பயணம் வளர்ச்சி, ஞானம் மற்றும் அறிவொளி ஆகியவற்றில் ஒன்றாகும்."
          : "Your spiritual journey is one of growth, wisdom, and enlightenment."),
    };
  } catch (error) {
    console.error("Error generating astrological reading:", error);

    // Fallback response in case of API failure
    return {
      name: formData.name,
      zodiacSign: language === 'tamil' ? "சிம்மம்" : "Leo",
      birthStar: language === 'tamil' ? "மகம்" : "Magha",
      general: language === 'tamil'
        ? "நீங்கள் ஒரு வலுவான நோக்கத்துடன் இயற்கையான தலைவர். உங்கள் அண்ட ஆற்றல் நீங்கள் செய்யும் அனைத்திற்கும் அரவணைப்பு மற்றும் படைப்பாற்றலைக் கொண்டுவருகிறது."
        : "You are a natural leader with a strong sense of purpose. Your cosmic energy brings warmth and creativity to everything you do.",
      love: language === 'tamil'
        ? "உங்கள் இதய தாக்கங்கள் உறவுகளில் உணர்ச்சிவசப்பட்ட மற்றும் விசுவாசமான இயல்பைக் குறிக்கின்றன. நீங்கள் ஆழமான தொடர்புகள் மற்றும் அர்த்தமுள்ள பிணைப்புகளை நாடுகிறீர்கள்."
        : "Your heart influences suggest a passionate and loyal nature in relationships. You seek deep connections and meaningful bonds.",
      career: language === 'tamil'
        ? "உங்கள் தலைமைத்துவ குணங்கள் அதிகார பதவிகளில் நீங்கள் சிறந்து விளங்க உதவுகின்றன. படைப்பாற்றல் துறைகள் மற்றும் தொழில்முனைவும் உங்களுக்கு நன்றாக பொருந்துகின்றன."
        : "Your leadership qualities make you excel in positions of authority. Creative fields and entrepreneurship also suit you well.",
      wellness: language === 'tamil'
        ? "வாழ்க்கையின் அனைத்து அம்சங்களிலும் சமநிலையை பராமரிப்பதில் கவனம் செலுத்துங்கள். வழக்கமான உடற்பயிற்சி மற்றும் தியானம் உங்கள் ஆற்றல்மிக்க ஆற்றலை செலுத்த உதவும்."
        : "Focus on maintaining balance in all aspects of life. Regular exercise and meditation will help channel your dynamic energy.",
      spirituality: language === 'tamil'
        ? "உங்கள் ஆன்மீக பயணம் நம்பிக்கையை பணிவுடன் சமநிலைப்படுத்துவதைக் கற்றுக்கொள்வதை உள்ளடக்கியது. மற்றவர்களுக்கு சேவை செய்வது ஆழமான நிறைவைக் கொண்டுவருகிறது."
        : "Your spiritual journey involves learning to balance confidence with humility. Service to others brings deep fulfillment.",
    };
  }
}
