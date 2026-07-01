/**
 * Royal Hindu Wedding E-Invitation Configuration Object
 * Easily customize any aspect of the wedding invitation here!
 */

export interface WeddingEvent {
  id: string;
  name: string;
  hindiName?: string;
  date: string; // e.g. "December 12, 2026"
  time: string; // e.g. "4:00 PM onwards"
  venueName: string;
  venueAddress: string;
  mapEmbedUrl: string; // Google Maps Iframe Embed URL
  mapDirectionsUrl: string; // Google Maps Search/Directions URL
  imageUrl: string; // Representative image
  accentColor: string;
}

export interface WeddingConfig {
  heroImageUrl: string;
  bride: {
    name: string;
    fatherName: string;
    motherName: string;
    imageUrl: string;
    bio: string;
  };
  groom: {
    name: string;
    fatherName: string;
    motherName: string;
    imageUrl: string;
    bio: string;
  };
  weddingDate: string; // For countdown (ISO format: YYYY-MM-DDTHH:mm:ss)
  displayDate: string; // Human readable e.g., "Saturday, December 12, 2026"
  hashtag: string; // e.g. #AaravKiAnanya
  musicUrl: string; // Audio URL (Shehnai / Sitar instrumental)
  youtubeEmbedUrl: string; // YouTube video embed link
  envelopeIconUrl?: string; // Optional custom envelope icon
  thankYouImageUrl?: string; // Optional custom thank you portrait
  heroTagline: string;
  gallerySubtitle: string;
  galleryImages: {
    url: string;
    caption: string;
  }[];
  events: WeddingEvent[];
  socialLinks: {
    facebook: string;
    instagram: string;
  };
  familyDetails: {
    message: string;
    welcomingText: string;
    names: string[];
  };
  welcomeMessage: {
    title: string;
    subtitle: string;
    text: string;
  };
}

export const weddingConfig: WeddingConfig = {
  heroImageUrl: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=100&w=3840&auto=format&fit=crop",
  bride: {
    name: "Ananya",
    fatherName: "Shri Devendra Sharma",
    motherName: "Smt. Sunita Sharma",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    bio: "A beautiful soul, traditional yet modern, Ananya brings joy and light to everyone around her. She loves classical dance, painting, and is the beloved daughter of the Sharma family."
  },
  groom: {
    name: "Aarav",
    fatherName: "Shri Rajesh Singhal",
    motherName: "Smt. Manju Singhal",
    imageUrl: "https://images.unsplash.com/photo-1594191632832-7da2260682fa?q=80&w=800&auto=format&fit=crop",
    bio: "A visionary tech leader with a warm heart, Aarav is known for his humility and wisdom. He enjoys photography, travelling, and is the proud son of the Singhal family."
  },
  weddingDate: "2026-12-12T18:30:00", // Year-Month-Day-Time (for countdown)
  displayDate: "12th December 2026",
  hashtag: "#AaravWedsAnanya",
  heroTagline: "We Are Getting Married",
  // A beautiful, soothing, royalty-free Indian bansuri/flute melody
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  youtubeEmbedUrl: "https://www.youtube.com/embed/N4YdD_19F0Y", // Indian wedding highlight placeholder
  envelopeIconUrl: "",
  thankYouImageUrl: "",
  gallerySubtitle: "Glimpses of Our Journey",
  galleryImages: [
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800",
      caption: "Eternal Togetherness"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800",
      caption: "Hand in Hand"
    },
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800",
      caption: "Floral Celebrations"
    },
    {
      url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800",
      caption: "The Sacred Mandap"
    }
  ],
  events: [
    {
      id: "mehendi",
      name: "Mehendi Ceremony",
      hindiName: "॥ मेहँदी रस्म ॥",
      date: "Thursday, 10th December 2026",
      time: "11:00 AM onwards",
      venueName: "The Royal Palms Estate, Lawn A",
      venueAddress: "Palm Beach Road, Sector 15, Navi Mumbai, MH - 400703",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.422894548485!2d73.0125712!3d19.0451559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3dc0ff5ff09%3A0xe7a5cbf92a5438bd!2sPalm%20Beach%20Rd%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
      mapDirectionsUrl: "https://maps.google.com/?q=Royal+Palms+Estate+Palm+Beach+Road+Navi+Mumbai",
      imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800",
      accentColor: "from-emerald-800 to-green-950"
    },
    {
      id: "haldi",
      name: "Haldi Ceremony",
      hindiName: "॥ हल्दी कुमकुम रस्म ॥",
      date: "Friday, 11th December 2026",
      time: "09:00 AM onwards",
      venueName: "The Grand Courtyard, Sun Valley Hotel",
      venueAddress: "Ring Road, Juhu Vista, Mumbai, MH - 400049",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.1989045763073!2d72.825621!3d19.110294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c99277d33d9f%3A0x6fb878ea2ec6c41b!2sJuhu%20Beach!5e0!3m2!1sen!2sin!4v1680000000001!5m2!1sen!2sin",
      mapDirectionsUrl: "https://maps.google.com/?q=Juhu+Beach+Mumbai",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800",
      accentColor: "from-amber-600 to-yellow-900"
    },
    {
      id: "sangeet",
      name: "Sangeet & Shahi Sangeet",
      hindiName: "॥ संगीत संध्या ॥",
      date: "Friday, 11th December 2026",
      time: "07:00 PM onwards",
      venueName: "The Golden Leaf Ballroom, Sun Valley Hotel",
      venueAddress: "Ring Road, Juhu Vista, Mumbai, MH - 400049",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.1989045763073!2d72.825621!3d19.110294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c99277d33d9f%3A0x6fb878ea2ec6c41b!2sJuhu%20Beach!5e0!3m2!1sen!2sin!4v1680000000001!5m2!1sen!2sin",
      mapDirectionsUrl: "https://maps.google.com/?q=Juhu+Beach+Mumbai",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800",
      accentColor: "from-indigo-800 to-purple-950"
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      hindiName: "॥ शुभ विवाह ॥",
      date: "Saturday, 12th December 2026",
      time: "06:30 PM (Varmala) | 11:30 PM (Phere)",
      venueName: "The Imperial Mandapam, Raj Palace Palace Resort",
      venueAddress: "VIP Road, Bandra Reclamation, Mumbai, MH - 400050",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.1802958410297!2d72.8203588!3d19.0558094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c913db23bded%3A0x8e82110c7104b2a!2sBandra%20Reclamation!5e0!3m2!1sen!2sin!4v1680000000002!5m2!1sen!2sin",
      mapDirectionsUrl: "https://maps.google.com/?q=Bandra+Reclamation+Mumbai",
      imageUrl: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800",
      accentColor: "from-royal-red-800 to-royal-red-950"
    },
    {
      id: "reception",
      name: "Grand Reception",
      hindiName: "॥ प्रीति भोज ॥",
      date: "Sunday, 13th December 2026",
      time: "07:30 PM onwards",
      venueName: "The Sapphire Crystal Hall, Raj Palace Palace Resort",
      venueAddress: "VIP Road, Bandra Reclamation, Mumbai, MH - 400050",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.1802958410297!2d72.8203588!3d19.0558094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c913db23bded%3A0x8e82110c7104b2a!2sBandra%20Reclamation!5e0!3m2!1sen!2sin!4v1680000000002!5m2!1sen!2sin",
      mapDirectionsUrl: "https://maps.google.com/?q=Bandra+Reclamation+Mumbai",
      imageUrl: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=800",
      accentColor: "from-cyan-900 to-slate-950"
    }
  ],
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com"
  },
  familyDetails: {
    message: "With the divine blessings of Lord Ganesha and our ancestors, we cordially invite you and your family to grace this auspicious occasion and bless the newlyweds.",
    welcomingText: "Warmly Welcomed By:",
    names: [
      "Singhal Family",
      "Sharma Family",
      "All Relatives and Friends"
    ]
  },
  welcomeMessage: {
    title: "Two Hearts, One Journey",
    subtitle: "We invite you to celebrate our love",
    text: "Because you have played a very special role in our lives, we would love for you to join us as we embark on this beautiful adventure of marriage. Together with our families, we invite you to share our joy, laughter, and sacred vows."
  }
};
