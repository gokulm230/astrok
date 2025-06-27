import type { Metadata } from 'next'
import './globals.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


export const metadata: Metadata = {
  title: 'Astrok',
  description: 'Astrok is a modern astrology platform offering personalized horoscope insights, birth chart readings, and love compatibility analysis. Experience cosmic guidance through a sleek, responsive interface powered by AI and celestial wisdom.',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23fbbf24"><polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26" /></svg>',
        type: 'image/svg+xml',
      }
    ],
    shortcut: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23fbbf24"><polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26" /></svg>',
  },
}

const firebaseConfig = {
  apiKey: "AIzaSyBNqJw9U88hJzpjeY2aRoTIf54HmAIbccM",
  authDomain: "astork-525aa.firebaseapp.com",
  projectId: "astork-525aa",
  storageBucket: "astork-525aa.firebasestorage.app",
  messagingSenderId: "253564332150",
  appId: "1:253564332150:web:d6f299d967bacfabf61757",
  measurementId: "G-HLCT3EH7BM"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
