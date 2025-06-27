# Astrok - AI-Powered Astrology App

This astrology application now uses Google's Gemini AI to generate personalized astrological readings.

## Features

- **Real AI Integration**: Uses Google Gemini 2.0 Flash model for generating astrological insights
- **Personalized Readings**: Provides detailed analysis across 5 categories:
  - General personality and life overview
  - Love and relationship insights
  - Career and professional guidance
  - Health and wellness advice
  - Spiritual guidance and life purpose

## How It Works

1. **User Input**: Users fill out the astrology form with their:
   - Name
   - Date of Birth
   - Time of Birth (optional)
   - Place of Birth
   - Rasi/Zodiac Sign (optional)
   - Nachathira/Birth Star (optional)

2. **AI Processing**: The form data is sent to Google Gemini AI with a specialized prompt for astrological analysis

3. **Results Display**: The AI generates a structured JSON response with personalized insights that are displayed in an elegant, tabbed interface

## API Integration

The app uses the Gemini API with the following endpoint:
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

### Environment Variables

The API key is stored in `.env.local`:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

### Security Features

- API key is stored in environment variables
- Fallback responses in case of API failures
- Error handling for invalid responses
- JSON parsing with error recovery

## Technical Implementation

### Files Modified/Created:

1. **`components/gemini-integration.tsx`**: Core AI integration logic
2. **`components/astrology-form.tsx`**: Updated to use real AI instead of mock data
3. **`app/page.tsx`**: Simplified to handle real AI responses
4. **`.env.local`**: Secure API key storage
5. **`.gitignore`**: Updated to exclude environment files

### Response Format

The AI returns structured data in this format:
```json
{
  "name": "User Name",
  "zodiacSign": "Determined Zodiac Sign",
  "birthStar": "Determined Birth Star",
  "general": "General personality analysis...",
  "love": "Love and relationship insights...",
  "career": "Career guidance...",
  "wellness": "Health and wellness advice...",
  "spirituality": "Spiritual guidance..."
}
```

## Running the App

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Error Handling

- If the AI API fails, the app provides meaningful fallback responses
- Users are notified of any errors during the reading generation
- The app gracefully handles invalid API responses

The integration maintains the beautiful UI design while providing real, personalized astrological insights powered by advanced AI technology.
