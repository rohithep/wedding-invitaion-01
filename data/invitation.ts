/**
 * Single source of truth for Lubaiba & Raees's Nikkah digital invitation.
 * Search for "TODO" to replace placeholder dates, venue, parents' names,
 * schedule, photos, music, and WhatsApp contact details with your own.
 */

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  src: string | null; // TODO: Replace null with "/photos/gallery-1.webp", etc.
  alt: string;
  caption: string;
  aspect?: "portrait" | "arch";
}

export const invitation = {
  // Site & Open Graph Metadata
  meta: {
    title: "Lubaiba & Raees — Our Nikkah | December 26",
    description:
      "In the name of Allah, the Most Gracious, the Most Merciful. You are warmly invited to celebrate the Nikkah of Lubaiba and Raees on December 26. Two hearts, one deen, forever.",
    // TODO: Update with your deployed Vercel domain so WhatsApp link previews resolve cleanly
    siteUrl: "https://lubaiba-raees-nikkah.vercel.app",
    ogImage: "/og-image.jpg",
  },

  // Audio (WhatsApp / Instagram in-app browser safe — starts on Intro Gate tap)
  audio: {
    src: "/audio/nikkah-theme.m4a",
    volume: 0.45,
    startOffsetSeconds: 1,
  },

  // Religious Opening
  bismillah: {
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful",
  },

  // Couple
  couple: {
    bride: {
      firstName: "Lubaiba",
      // TODO: Add full name if desired
      fullName: "Lubaiba",
      // TODO: Replace with bride's parents' names
      parentsLine: "Daughter of Mr. Rafeeque & Mrs. Shajira",
      photo: "/photos/lubaiba.webp" as string | null,
      photoAlt: "Portrait of Lubaiba",
    },
    groom: {
      firstName: "Raees",
      // TODO: Add full name if desired
      fullName: "Raees",
      // TODO: Replace with groom's parents' names
      parentsLine: "Son of Mr. Muhammad & Mrs. Safiya",
      // TODO: Replace null with groom portrait path, e.g. "/photos/raees.webp"
      photo: null as string | null,
      photoAlt: "Portrait of Raees",
    },
    tagline: "Two hearts, one deen, forever",
  },

  // Event Date & Time
  event: {
    eyebrow: "Save The Date",
    title: "Our Nikkah",
    month: "December",
    dayNumber: "26",
    // TODO: Confirm the year, day of week, and start/end times
    year: 2026,
    dayOfWeek: "Saturday",
    timeDisplay: "12:00 PM onwards",
    // ISO string used for live countdown and .ics calendar download (local timezone offset included)
    // TODO: Update year, time, and timezone offset (+05:30 for IST, etc.)
    startDateISO: "2026-12-26T16:00:00+05:30",
    endDateISO: "2026-12-26T21:00:00+05:30",
  },

  // Blessing / Quranic Verse (Surah Ar-Rum 30:21)
  blessing: {
    eyebrow: "With Allah's Blessings",
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    lines: [
      "And of His signs is that He created for you",
      "from yourselves mates that you may find tranquility in them;",
      "and He placed between you affection and mercy.",
    ],
    reference: "Surah Ar-Rum · 30:21",
    dua: "May Allah bless their union and shower His mercy upon them both.",
  },

  // Venue Details
  venue: {
    eyebrow: "The Venue",
    // TODO: Replace with actual venue name
    name: "Royal Arcade Convention Centre",
    // TODO: Replace with full venue street address
    addressLine1: "Hanging Bridge Kozhikode-Mysore-Kollegal Highway Vennakkad Koduvally",
    addressLine2: "kozhikode, kerala ",
    // TODO: Replace with the exact Google Maps share URL for your venue
    mapsUrl: "https://maps.app.goo.gl/UYKs2vG2AGC1cPVJ6?g_st=iw",
    note: "Valet parking & separate family seating available",
  },

  // Ceremony Schedule (TODO: Update times and milestones to match your Nikkah itinerary)
  schedule: [
    {
      id: "arrival",
      time: "12:00 PM",
      title: "Arrival & Warm Welcome",
      description: "Guests gather amidst golden-hour tea, dates, and warm greetings.",
    },
    {
      id: "nikkah",
      time: "12:30 PM",
      title: "Nikkah Ceremony",
      description: "Recitation of the Holy Quran, Khutbah-e-Nikkah, and the sacred union.",
    },
    {
      id: "dua",
      time: "12:50 PM",
      title: "Collective Dua & Blessings",
      description: "Prayers for a lifetime of barakah, peace, and companionship.",
    },
    {
      id: "feast",
      time: "1:00 PM",
      title: "Dawat-e-Nikkah",
      description: "A celebratory dinner shared with beloved family and friends.",
    },
  ] as ScheduleItem[],

  // Gallery (TODO: Replace src: null with your real couple/pre-wedding photos in /public/photos/)
  gallery: [
    {
      id: "moment-1",
      src: "/photos/gallery-1.webp",
      alt: "Lubaiba and Raees smiling together under a floral arch",
      caption: "Written in the heavens",
    },
    {
      id: "moment-2",
      src: null,
      alt: "Lubaiba and Raees — Moment 2",
      caption: "Two hearts in harmony",
    },
    {
      id: "moment-3",
      src: null,
      alt: "Lubaiba and Raees — Moment 3",
      caption: "Guided by grace & mercy",
    },
    {
      id: "moment-4",
      src: null,
      alt: "Lubaiba and Raees — Moment 4",
      caption: "Beginning of forever",
    },
  ] as GalleryPhoto[],

  // Closing & Family Compliments
  closing: {
    eyebrow: "With Warm Gratitude",
    thankYou:
      "Your presence and heartfelt duas are the most cherished gifts we could ask for as we begin this sacred chapter together.",
    complimentsHeading: "With Best Compliments From",
    // TODO: Replace with both families' names
    families: [
      "The Family of Mr. Rafeeque",
      "The Family of Mr. muhammad",
      "Near & Dear Ones",
    ],
    // TODO: Replace with international WhatsApp number (digits only, no +, e.g. "919876543210")
    whatsappNumber: "919656410451",
    whatsappPrefill:
      "Assalamu Alaikum! Thank you for the lovely Nikkah invitation Lubaiba & Raees. Wishing you a blessed union!",
    whatsappLabel: "Send Your Duas on WhatsApp",
  },
} as const;
