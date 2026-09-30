import {
  Collector,
  Language,
  MaterialCategory,
  MaterialLot,
  PriceRecord,
  Recycler,
  SafetyGuide,
  Transaction,
  TraceabilityRecord,
  AnomalyAlert,
  AuditorTicket,
  UserAccount
} from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  hi: {
    appName: 'KABADI LINK',
    tagline: 'कबाड़ी से रिसायकलर तक — सीधा. सही. ट्रैसेबल.',
    aajKaBhav: 'आज का भाव (LIVE)',
    photoLo: 'फोटो लो',
    photoLoSub: 'ई-कचरा स्कैन करें',
    recyclerDhundo: 'रिसायकलर ढूंढो',
    recyclerDhundoSub: 'मान्यता प्राप्त केंद्र',
    meraBhav: 'मेरा भाव',
    meraBhavSub: 'मंडी दर चार्ट',
    meraMaal: 'मेरा माल',
    meraMaalSub: 'सहेजे गए लॉट',
    meriKamai: 'मेरी कमाई',
    meriKamaiSub: 'खाता व भुगतान',
    safety: 'सुरक्षा नियम',
    safetySub: 'खतरे से बचें',
    step01: '01 फोटो',
    step02: '02 पहचान',
    step03: '03 भाव',
    step04: '04 केंद्र',
    step05: '05 सुपुर्दगी',
    step06: '06 भुगतान',
    step07: '07 रिकॉर्ड',
    bhavSunao: 'भाव सुनाओ',
    bhavSunaoListening: 'सुन रहे हैं...',
    onlineStatus: 'ऑनलाइन',
    offlineStatus: 'ऑफलाइन — डेटा सुरक्षित रहेगा',
    syncing: 'डेटा सिंक हो रहा है...',
    allSynced: 'सारा डेटा सिंक हो गया',
    estValue: 'अनुमानित मूल्य',
    marketRange: 'मंडी भाव',
    authorizedRecycler: 'अधिकृत रिसायकलर',
    unauthorizedRecycler: 'सत्यापन आवश्यक',
    pickupAvailable: 'गाड़ी आएगी (पिकअप उपलब्ध)',
    noPickup: 'खुद केंद्र ले जाना होगा',
    handoverComplete: 'सुपुर्दगी पूरी हुई',
    generateQr: 'क्यूआर कोड देखें',
    paymentReceived: 'भुगतान प्राप्त हुआ',
    cash: 'नकद (CASH)',
    upi: 'यूपीआई (UPI)',
    bank: 'बैंक ट्रांसफर'
  },
  mr: {
    appName: 'कबाडी लिंक',
    tagline: 'कबाडी ते रिसायकलर — थेट. योग्य. ट्रैसेबल.',
    aajKaBhav: 'आजचा भाव (LIVE)',
    photoLo: 'फोटो घ्या',
    photoLoSub: 'ई-कचरा स्कॅन करा',
    recyclerDhundo: 'रिसायकलर शोधा',
    recyclerDhundoSub: 'मान्यताप्राप्त केंद्रे',
    meraBhav: 'माझा भाव',
    meraBhavSub: 'बाजार दर तक्ता',
    meraMaal: 'माझा माल',
    meraMaalSub: 'जतन केलेले लॉट',
    meriKamai: 'माझी कमाई',
    meriKamaiSub: 'जमा आणि रोख पावती',
    safety: 'सुरक्षितता नियम',
    safetySub: 'धोक्यापासून सावध',
    step01: '01 फोटो',
    step02: '02 ओळख',
    step03: '03 भाव',
    step04: '04 केंद्र',
    step05: '05 सुपूर्द',
    step06: '06 पेमेंट',
    step07: '07 नोंद',
    bhavSunao: 'भाव ऐका',
    bhavSunaoListening: 'ऐकत आहोत...',
    onlineStatus: 'ऑनलाइन',
    offlineStatus: 'ऑफलाइन — डेटा सुरक्षित राहील',
    syncing: 'डेटा सिंक होत आहे...',
    allSynced: 'सर्व डेटा सिंक झाला',
    estValue: 'अंदाजे मूल्य',
    marketRange: 'बाजार भाव',
    authorizedRecycler: 'अधिकृत रिसायकलर',
    unauthorizedRecycler: 'पडताळणी आवश्यक',
    pickupAvailable: 'गाडी येईल (पिकअप उपलब्ध)',
    noPickup: 'स्वतः केंद्रात न्यावे लागेल',
    handoverComplete: 'सुपूर्द प्रक्रिया पूर्ण',
    generateQr: 'क्यूआर कोड पहा',
    paymentReceived: 'पैसे मिळाले',
    cash: 'रोख (CASH)',
    upi: 'युपीआय (UPI)',
    bank: 'बँक खात्यात'
  },
  en: {
    appName: 'KABADI LINK',
    tagline: 'Kabadi se Recycler tak — Seedha. Sahi. Traceable.',
    aajKaBhav: "TODAY'S RATE (LIVE)",
    photoLo: 'TAKE PHOTO',
    photoLoSub: 'AI Material Scan',
    recyclerDhundo: 'FIND RECYCLER',
    recyclerDhundoSub: 'Authorized Centers',
    meraBhav: 'PRICE BOARD',
    meraBhavSub: 'Local Market Trends',
    meraMaal: 'MY LOTS',
    meraMaalSub: 'Registered E-Waste',
    meriKamai: 'MY EARNINGS',
    meriKamaiSub: 'Payment Ledger',
    safety: 'SAFETY RULES',
    safetySub: 'Hazard Guidelines',
    step01: '01 PHOTO',
    step02: '02 IDENTIFY',
    step03: '03 PRICE',
    step04: '04 MATCH',
    step05: '05 HANDOVER',
    step06: '06 PAID',
    step07: '07 TRACE',
    bhavSunao: 'HEAR RATES',
    bhavSunaoListening: 'Listening...',
    onlineStatus: 'ONLINE',
    offlineStatus: 'OFFLINE — DATA WILL SAVE',
    syncing: 'Syncing records...',
    allSynced: 'All data synced',
    estValue: 'Estimated Value',
    marketRange: 'Market Range',
    authorizedRecycler: 'Authorized Recycler',
    unauthorizedRecycler: 'Verification Required',
    pickupAvailable: 'Pickup Available',
    noPickup: 'Drop-off at center',
    handoverComplete: 'Handover Complete',
    generateQr: 'View QR Code',
    paymentReceived: 'Payment Received',
    cash: 'CASH',
    upi: 'UPI',
    bank: 'Bank Transfer'
  }
};

export const INITIAL_COLLECTOR: Collector = {
  id: 'COL-MH-4421',
  name: 'Rameshwar "Kaka" Shinde',
  operatingArea: 'Dharavi East & Kurla MIDC, Mumbai',
  preferredLanguage: 'hi',
  totalLotsSold: 12,
  totalEarnings: 18420,
  pendingEarnings: 4220,
  joinedDate: '2026-01-14'
};

export const PRICE_RECORDS: PriceRecord[] = [
  {
    id: 'PR-PCB',
    material: 'PCB',
    subcategory: 'Green Motherboard & High-grade Telecom',
    location: 'Mumbai Metropolitan Region',
    currentAvgPrice: 205,
    rangeMin: 185,
    rangeMax: 220,
    trendPct7d: 8.4,
    trendPct30d: 14.2,
    trendPct6m: 22.8,
    unit: '₹ / KG',
    recyclerOffersCount: 6,
    history7d: [
      { day: 'Day 1', price: 188 },
      { day: 'Day 2', price: 192 },
      { day: 'Day 3', price: 195 },
      { day: 'Day 4', price: 198 },
      { day: 'Day 5', price: 201 },
      { day: 'Day 6', price: 203 },
      { day: 'Today', price: 205 }
    ],
    history30d: [
      { day: 'W1', price: 182 },
      { day: 'W2', price: 189 },
      { day: 'W3', price: 197 },
      { day: 'W4', price: 205 }
    ],
    history6m: [
      { month: 'Apr', price: 165 },
      { month: 'May', price: 172 },
      { month: 'Jun', price: 180 },
      { month: 'Jul', price: 185 },
      { month: 'Aug', price: 194 },
      { month: 'Sep', price: 205 }
    ]
  },
  {
    id: 'PR-CABLE',
    material: 'CABLE',
    subcategory: 'Insulated Copper & Power Harness',
    location: 'Mumbai Metropolitan Region',
    currentAvgPrice: 340,
    rangeMin: 310,
    rangeMax: 365,
    trendPct7d: 3.2,
    trendPct30d: 6.8,
    trendPct6m: 15.5,
    unit: '₹ / KG',
    recyclerOffersCount: 8,
    history7d: [
      { day: 'Day 1', price: 330 },
      { day: 'Day 2', price: 332 },
      { day: 'Day 3', price: 335 },
      { day: 'Day 4', price: 338 },
      { day: 'Day 5', price: 338 },
      { day: 'Day 6', price: 339 },
      { day: 'Today', price: 340 }
    ],
    history30d: [
      { day: 'W1', price: 320 },
      { day: 'W2', price: 326 },
      { day: 'W3', price: 334 },
      { day: 'W4', price: 340 }
    ],
    history6m: [
      { month: 'Apr', price: 295 },
      { month: 'May', price: 305 },
      { month: 'Jun', price: 318 },
      { month: 'Jul', price: 324 },
      { month: 'Aug', price: 332 },
      { month: 'Sep', price: 340 }
    ]
  },
  {
    id: 'PR-BATTERY',
    material: 'BATTERY',
    subcategory: 'Lithium-Ion & Sealed Lead Acid (SLA)',
    location: 'Mumbai Metropolitan Region',
    currentAvgPrice: 125,
    rangeMin: 110,
    rangeMax: 140,
    trendPct7d: -1.8,
    trendPct30d: 4.5,
    trendPct6m: 11.2,
    unit: '₹ / KG',
    recyclerOffersCount: 5,
    history7d: [
      { day: 'Day 1', price: 128 },
      { day: 'Day 2', price: 127 },
      { day: 'Day 3', price: 126 },
      { day: 'Day 4', price: 125 },
      { day: 'Day 5', price: 125 },
      { day: 'Day 6', price: 124 },
      { day: 'Today', price: 125 }
    ],
    history30d: [
      { day: 'W1', price: 120 },
      { day: 'W2', price: 122 },
      { day: 'W3', price: 127 },
      { day: 'W4', price: 125 }
    ],
    history6m: [
      { month: 'Apr', price: 112 },
      { month: 'May', price: 115 },
      { month: 'Jun', price: 118 },
      { month: 'Jul', price: 122 },
      { month: 'Aug', price: 127 },
      { month: 'Sep', price: 125 }
    ]
  },
  {
    id: 'PR-CRT',
    material: 'CRT',
    subcategory: 'Lead-Shielded CRT Monitors & TV Glass',
    location: 'Mumbai Metropolitan Region',
    currentAvgPrice: 32,
    rangeMin: 25,
    rangeMax: 38,
    trendPct7d: 0.5,
    trendPct30d: 1.2,
    trendPct6m: -4.0,
    unit: '₹ / KG',
    recyclerOffersCount: 3,
    history7d: [
      { day: 'Day 1', price: 31 },
      { day: 'Day 2', price: 31 },
      { day: 'Day 3', price: 32 },
      { day: 'Day 4', price: 32 },
      { day: 'Day 5', price: 32 },
      { day: 'Day 6', price: 32 },
      { day: 'Today', price: 32 }
    ],
    history30d: [
      { day: 'W1', price: 31 },
      { day: 'W2', price: 31 },
      { day: 'W3', price: 32 },
      { day: 'W4', price: 32 }
    ],
    history6m: [
      { month: 'Apr', price: 35 },
      { month: 'May', price: 34 },
      { month: 'Jun', price: 33 },
      { month: 'Jul', price: 33 },
      { month: 'Aug', price: 32 },
      { month: 'Sep', price: 32 }
    ]
  },
  {
    id: 'PR-MOTOR',
    material: 'MOTOR',
    subcategory: 'Washing Machine, Fan & Hard Drive Motors',
    location: 'Mumbai Metropolitan Region',
    currentAvgPrice: 88,
    rangeMin: 75,
    rangeMax: 98,
    trendPct7d: 2.1,
    trendPct30d: 5.4,
    trendPct6m: 9.8,
    unit: '₹ / KG',
    recyclerOffersCount: 7,
    history7d: [
      { day: 'Day 1', price: 86 },
      { day: 'Day 2', price: 86 },
      { day: 'Day 3', price: 87 },
      { day: 'Day 4', price: 87 },
      { day: 'Day 5', price: 88 },
      { day: 'Day 6', price: 88 },
      { day: 'Today', price: 88 }
    ],
    history30d: [
      { day: 'W1', price: 83 },
      { day: 'W2', price: 85 },
      { day: 'W3', price: 86 },
      { day: 'W4', price: 88 }
    ],
    history6m: [
      { month: 'Apr', price: 79 },
      { month: 'May', price: 81 },
      { month: 'Jun', price: 84 },
      { month: 'Jul', price: 85 },
      { month: 'Aug', price: 87 },
      { month: 'Sep', price: 88 }
    ]
  },
  {
    id: 'PR-LCD',
    material: 'LCD',
    subcategory: 'Broken Display Panels & Backlight Strips',
    location: 'Mumbai Metropolitan Region',
    currentAvgPrice: 55,
    rangeMin: 45,
    rangeMax: 65,
    trendPct7d: 1.4,
    trendPct30d: 3.0,
    trendPct6m: 7.2,
    unit: '₹ / KG',
    recyclerOffersCount: 4,
    history7d: [
      { day: 'Day 1', price: 54 },
      { day: 'Day 2', price: 54 },
      { day: 'Day 3', price: 55 },
      { day: 'Day 4', price: 55 },
      { day: 'Day 5', price: 55 },
      { day: 'Day 6', price: 55 },
      { day: 'Today', price: 55 }
    ],
    history30d: [
      { day: 'W1', price: 53 },
      { day: 'W2', price: 54 },
      { day: 'W3', price: 54 },
      { day: 'W4', price: 55 }
    ],
    history6m: [
      { month: 'Apr', price: 51 },
      { month: 'May', price: 52 },
      { month: 'Jun', price: 53 },
      { month: 'Jul', price: 54 },
      { month: 'Aug', price: 54 },
      { month: 'Sep', price: 55 }
    ]
  },
  {
    id: 'PR-MIXED_PLASTIC',
    material: 'MIXED_PLASTIC',
    subcategory: 'Flame-Retardant ABS & HIPS Electronic Casings',
    location: 'Mumbai Metropolitan Region',
    currentAvgPrice: 42,
    rangeMin: 35,
    rangeMax: 48,
    trendPct7d: -0.8,
    trendPct30d: 2.1,
    trendPct6m: 4.8,
    unit: '₹ / KG',
    recyclerOffersCount: 6,
    history7d: [
      { day: 'Day 1', price: 42 },
      { day: 'Day 2', price: 42 },
      { day: 'Day 3', price: 42 },
      { day: 'Day 4', price: 42 },
      { day: 'Day 5', price: 42 },
      { day: 'Day 6', price: 42 },
      { day: 'Today', price: 42 }
    ],
    history30d: [
      { day: 'W1', price: 41 },
      { day: 'W2', price: 41 },
      { day: 'W3', price: 42 },
      { day: 'W4', price: 42 }
    ],
    history6m: [
      { month: 'Apr', price: 40 },
      { month: 'May', price: 40 },
      { month: 'Jun', price: 41 },
      { month: 'Jul', price: 41 },
      { month: 'Aug', price: 42 },
      { month: 'Sep', price: 42 }
    ]
  },
  {
    id: 'PR-MAGNET',
    material: 'MAGNET',
    subcategory: 'Neodymium Hard Drive Magnets & Ferrite',
    location: 'Mumbai Metropolitan Region',
    currentAvgPrice: 280,
    rangeMin: 250,
    rangeMax: 310,
    trendPct7d: 5.6,
    trendPct30d: 9.2,
    trendPct6m: 18.0,
    unit: '₹ / KG',
    recyclerOffersCount: 3,
    history7d: [
      { day: 'Day 1', price: 270 },
      { day: 'Day 2', price: 272 },
      { day: 'Day 3', price: 275 },
      { day: 'Day 4', price: 278 },
      { day: 'Day 5', price: 279 },
      { day: 'Day 6', price: 280 },
      { day: 'Today', price: 280 }
    ],
    history30d: [
      { day: 'W1', price: 260 },
      { day: 'W2', price: 268 },
      { day: 'W3', price: 275 },
      { day: 'W4', price: 280 }
    ],
    history6m: [
      { month: 'Apr', price: 235 },
      { month: 'May', price: 245 },
      { month: 'Jun', price: 255 },
      { month: 'Jul', price: 265 },
      { month: 'Aug', price: 272 },
      { month: 'Sep', price: 280 }
    ]
  },
  {
    id: 'PR-OTHER',
    material: 'OTHER',
    subcategory: 'Unsorted Mixed E-Scrap',
    location: 'Mumbai Metropolitan Region',
    currentAvgPrice: 65,
    rangeMin: 50,
    rangeMax: 80,
    trendPct7d: 1.0,
    trendPct30d: 2.5,
    trendPct6m: 5.0,
    unit: '₹ / KG',
    recyclerOffersCount: 4,
    history7d: [
      { day: 'Day 1', price: 64 },
      { day: 'Day 2', price: 64 },
      { day: 'Day 3', price: 65 },
      { day: 'Day 4', price: 65 },
      { day: 'Day 5', price: 65 },
      { day: 'Day 6', price: 65 },
      { day: 'Today', price: 65 }
    ],
    history30d: [
      { day: 'W1', price: 63 },
      { day: 'W2', price: 64 },
      { day: 'W3', price: 64 },
      { day: 'W4', price: 65 }
    ],
    history6m: [
      { month: 'Apr', price: 60 },
      { month: 'May', price: 61 },
      { month: 'Jun', price: 62 },
      { month: 'Jul', price: 63 },
      { month: 'Aug', price: 64 },
      { month: 'Sep', price: 65 }
    ]
  }
];

export const RECYCLERS: Recycler[] = [
  {
    id: 'REC-GREENLOOP',
    name: 'GREENLOOP RECYCLING PVT LTD',
    facility: 'Unit 4, Kanjurmarg West Industrial Zone, Mumbai',
    registrationRef: 'CPCB-REG-EW/MH-1092/2024 (DEMO)',
    authorized: true,
    validFrom: '2024-04-01',
    validUntil: '2029-03-31',
    materialsAccepted: ['PCB', 'BATTERY', 'CABLE', 'MOTOR'],
    distanceKm: 4.2,
    offeredRatePerKg: {
      PCB: 210,
      CABLE: 345,
      BATTERY: 130,
      MOTOR: 90,
      CRT: 28,
      LCD: 52,
      MAGNET: 275,
      MIXED_PLASTIC: 40,
      OTHER: 65
    },
    pickupAvailable: true,
    serviceArea: 'Central Mumbai, Kurla, Ghatkopar, Dharavi',
    contact: '+91 98201 44821',
    rating: 4.9,
    matchScore: 94,
    scoreBreakdown: {
      materialMatch: 30,
      authorization: 25,
      distance: 18,
      price: 17,
      pickup: 4
    }
  },
  {
    id: 'REC-ECOSHRED',
    name: 'ECOSHRED AUTHORIZED RE-PROCESSORS',
    facility: 'Plot 88, Turbhe MIDC, Navi Mumbai',
    registrationRef: 'MPCB/RO-NM/EW-8820/2023 (DEMO)',
    authorized: true,
    validFrom: '2023-08-15',
    validUntil: '2028-08-14',
    materialsAccepted: ['PCB', 'CABLE', 'CRT', 'LCD', 'MIXED_PLASTIC'],
    distanceKm: 7.8,
    offeredRatePerKg: {
      PCB: 202,
      CABLE: 338,
      BATTERY: 120,
      MOTOR: 85,
      CRT: 32,
      LCD: 55,
      MAGNET: 270,
      MIXED_PLASTIC: 42,
      OTHER: 62
    },
    pickupAvailable: true,
    serviceArea: 'Navi Mumbai, Chembur, Mankhurd, Thane South',
    contact: '+91 98190 22319',
    rating: 4.7,
    matchScore: 88,
    scoreBreakdown: {
      materialMatch: 30,
      authorization: 25,
      distance: 14,
      price: 15,
      pickup: 4
    }
  },
  {
    id: 'REC-METALLOCORP',
    name: 'METALLOCORP PRECIOUS EXTRACTION HUB',
    facility: 'Bhiwandi Logistic Hub, Thane District',
    registrationRef: 'CPCB-REG-EW/TH-4901/2025 (DEMO)',
    authorized: true,
    validFrom: '2025-01-10',
    validUntil: '2030-01-09',
    materialsAccepted: ['PCB', 'MAGNET', 'MOTOR'],
    distanceKm: 13.0,
    offeredRatePerKg: {
      PCB: 218,
      CABLE: 325,
      BATTERY: 115,
      MOTOR: 92,
      CRT: 20,
      LCD: 48,
      MAGNET: 295,
      MIXED_PLASTIC: 38,
      OTHER: 60
    },
    pickupAvailable: false,
    serviceArea: 'Thane, Kalyan, Bhiwandi, North Mumbai',
    contact: '+91 98670 99182',
    rating: 4.8,
    matchScore: 82,
    scoreBreakdown: {
      materialMatch: 30,
      authorization: 25,
      distance: 9,
      price: 18,
      pickup: 0
    }
  },
  {
    id: 'REC-SCRAPNEXUS',
    name: 'SHREE BALAJI TRADERS & AGGREGATORS',
    facility: 'Chhatrapati Shivaji Scrap Market, Kurla',
    registrationRef: 'PENDING_DOCUMENTATION (DEMO)',
    authorized: false,
    validFrom: '2022-02-01',
    validUntil: '2024-02-01',
    materialsAccepted: ['PCB', 'CABLE', 'BATTERY', 'CRT', 'MOTOR'],
    distanceKm: 2.1,
    offeredRatePerKg: {
      PCB: 190,
      CABLE: 330,
      BATTERY: 110,
      MOTOR: 82,
      CRT: 22,
      LCD: 45,
      MAGNET: 260,
      MIXED_PLASTIC: 35,
      OTHER: 55
    },
    pickupAvailable: false,
    serviceArea: 'Kurla West, Dharavi, Sion',
    contact: '+91 99201 00293',
    rating: 3.8,
    matchScore: 61,
    scoreBreakdown: {
      materialMatch: 25,
      authorization: 0,
      distance: 20,
      price: 13,
      pickup: 3
    }
  }
];

export const INITIAL_LOTS: MaterialLot[] = [
  {
    id: 'KL-2026-004821',
    collectorId: 'COL-MH-4421',
    category: 'PCB',
    subcategory: 'Green Motherboard & Server Scrap',
    weightKg: 18.5,
    condition: 'Mixed',
    locationName: 'Dharavi 90ft Road, Mumbai',
    gpsCoordinates: { lat: 19.0435, lng: 72.8567 },
    createdAt: '2026-09-29 09:30 AM',
    photoSvgType: 'pcb',
    aiConfidence: 91,
    estimatedValue: 3792,
    quotedRatePerKg: 210,
    matchedRecyclerId: 'REC-GREENLOOP',
    status: 'HANDOVER_COMPLETED',
    handoverRef: 'KL-HO-842193',
    handoverTimestamp: '2026-09-29 11:15 AM',
    paymentMethod: 'CASH',
    paymentReference: 'CASH-RCPT-8421',
    paymentAmount: 3885
  },
  {
    id: 'KL-2026-004790',
    collectorId: 'COL-MH-4421',
    category: 'CABLE',
    subcategory: 'Stripped Telecom & Heavy Copper',
    weightKg: 24.0,
    condition: 'Good',
    locationName: 'Kurla West Scrap Yard',
    gpsCoordinates: { lat: 19.0657, lng: 72.8792 },
    createdAt: '2026-09-28 02:40 PM',
    photoSvgType: 'cable',
    aiConfidence: 96,
    estimatedValue: 8160,
    quotedRatePerKg: 345,
    matchedRecyclerId: 'REC-GREENLOOP',
    status: 'PAID',
    handoverRef: 'KL-HO-773102',
    handoverTimestamp: '2026-09-28 04:30 PM',
    paymentMethod: 'UPI',
    paymentReference: 'UPI-DEMO-991204X',
    paymentAmount: 8280
  },
  {
    id: 'KL-2026-004712',
    collectorId: 'COL-MH-4421',
    category: 'BATTERY',
    subcategory: 'Intact Sealed Telecom SLA',
    weightKg: 32.0,
    condition: 'Good',
    locationName: 'Bandra Reclamation Collection Point',
    gpsCoordinates: { lat: 19.0381, lng: 72.8312 },
    createdAt: '2026-09-26 11:10 AM',
    photoSvgType: 'battery',
    aiConfidence: 89,
    estimatedValue: 4000,
    quotedRatePerKg: 130,
    matchedRecyclerId: 'REC-GREENLOOP',
    status: 'PAID',
    handoverRef: 'KL-HO-661908',
    handoverTimestamp: '2026-09-26 01:20 PM',
    paymentMethod: 'CASH',
    paymentReference: 'CASH-RCPT-6619',
    paymentAmount: 4160
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-9941',
    lotId: 'KL-2026-004821',
    collectorId: 'COL-MH-4421',
    collectorName: 'Rameshwar Shinde',
    recyclerId: 'REC-GREENLOOP',
    recyclerName: 'GREENLOOP RECYCLING PVT LTD',
    material: 'PCB',
    weightKg: 18.5,
    ratePerKg: 210,
    totalAmount: 3885,
    paymentStatus: 'PAID',
    paymentMethod: 'CASH',
    paymentRef: 'CASH-RCPT-8421',
    timestamp: '2026-09-29 11:15 AM',
    handoverLocation: 'Kanjurmarg Facility Gate #2',
    recyclerConfirmed: true
  },
  {
    id: 'TXN-9890',
    lotId: 'KL-2026-004790',
    collectorId: 'COL-MH-4421',
    collectorName: 'Rameshwar Shinde',
    recyclerId: 'REC-GREENLOOP',
    recyclerName: 'GREENLOOP RECYCLING PVT LTD',
    material: 'CABLE',
    weightKg: 24.0,
    ratePerKg: 345,
    totalAmount: 8280,
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    paymentRef: 'UPI-DEMO-991204X',
    timestamp: '2026-09-28 04:30 PM',
    handoverLocation: 'Kurla On-Site Mobile Van',
    recyclerConfirmed: true
  },
  {
    id: 'TXN-9801',
    lotId: 'KL-2026-004712',
    collectorId: 'COL-MH-4421',
    collectorName: 'Rameshwar Shinde',
    recyclerId: 'REC-GREENLOOP',
    recyclerName: 'GREENLOOP RECYCLING PVT LTD',
    material: 'BATTERY',
    weightKg: 32.0,
    ratePerKg: 130,
    totalAmount: 4160,
    paymentStatus: 'PAID',
    paymentMethod: 'CASH',
    paymentRef: 'CASH-RCPT-6619',
    timestamp: '2026-09-26 01:20 PM',
    handoverLocation: 'Kanjurmarg Facility Gate #1',
    recyclerConfirmed: true
  },
  {
    id: 'TXN-9755',
    lotId: 'KL-2026-004655',
    collectorId: 'COL-MH-4421',
    collectorName: 'Rameshwar Shinde',
    recyclerId: 'REC-ECOSHRED',
    recyclerName: 'ECOSHRED AUTHORIZED RE-PROCESSORS',
    material: 'MOTOR',
    weightKg: 25.0,
    ratePerKg: 85,
    totalAmount: 2125,
    paymentStatus: 'PAID',
    paymentMethod: 'CASH',
    paymentRef: 'CASH-RCPT-5512',
    timestamp: '2026-09-24 03:00 PM',
    handoverLocation: 'Turbhe MIDC Gate #4',
    recyclerConfirmed: true
  }
];

export const SAFETY_GUIDES: SafetyGuide[] = [
  {
    id: 'SAFE-CABLE',
    icon: '🔥',
    code: 'SEC-01',
    hazardColor: 'signal-red',
    title: {
      hi: 'केबल मत जलाओ',
      mr: 'केबल जाळू नका',
      en: 'DO NOT BURN CABLES'
    },
    warning: {
      hi: 'तार जलाने से निकलने वाला धुआं फेफड़ों और आंखों के लिए जानलेवा है। अधिकृत रिसायकलर बिना जलाए ज्यादा दाम देते हैं।',
      mr: 'केबल जाळल्याने विषारी वायू फुफ्फुसांना हानी पोहोचवतो. अधिकृत रिसायकलर न जाळता जास्त भाव देतात.',
      en: 'Open burning of insulated cables releases cancer-causing dioxins. Authorized recyclers pay more for unburnt wires.'
    },
    audioScript: {
      hi: 'सावधान! तांबे की तार को कभी मत जलाएं। जहरीले धुएं से फेफड़ों का कैंसर हो सकता है। अधिकृत केंद्र छिलके सहित तार के पूरे पैसे देता है।',
      mr: 'सावधान! तांब्याची वायर कधीही जाळू नका. विषारी धुरामुळे गंभीर आजार होतात. मान्यताप्राप्त केंद्र वायर न जाळता चांगला भाव देते.',
      en: 'Warning: Never burn electrical wires. Burning produces toxic dioxins. Authorized recyclers accept unburnt wire at full fair price.'
    },
    actionAllowed: {
      hi: 'सीधे बंडल बनाकर अधिकृत केंद्र को दें',
      mr: 'तसेच बंडल करून अधिकृत केंद्राला द्या',
      en: 'Bundle as-is and handover to authorized recycler'
    },
    actionProhibited: {
      hi: 'आग लगाना या प्लास्टिक पिघलाना',
      mr: 'आग लावणे किंवा प्लास्टिक वितळवणे',
      en: 'Open pit burning or torch melting'
    }
  },
  {
    id: 'SAFE-ACID',
    icon: '🧪',
    code: 'SEC-02',
    hazardColor: 'signal-red',
    title: {
      hi: 'एसिड से PCB मत तोड़ो',
      mr: 'ॲसिडने PCB तोडू नका',
      en: 'NO ACID LEACHING'
    },
    warning: {
      hi: 'तेजाब से सोना-चांदी निकालने की कोशिश में हाथ जलते हैं और नदियां गंदी होती हैं। रिसायकलर वैज्ञानिक मशीन से शुद्ध भाव देते हैं।',
      mr: 'ॲसिडमध्ये पीसीबी धुवून सोने काढू नका. हात भाजतात आणि किडनी खराब होते. रिसायकलर यंत्राने योग्य दर देतात.',
      en: 'Acid bath extraction causes severe chemical burns and cyanide poisoning. Smelting must be done in closed-loop automated facilities.'
    },
    audioScript: {
      hi: 'चेतावनी: मदरबोर्ड पर तेजाब मत डालिए। इससे अंधापन और किडनी की बीमारी हो सकती है। कबाड़ी लिंक पर पूरा बोर्ड बेचें।',
      mr: 'इशारा: मदरबोर्डवर ॲसिड टाकू नका. यामुळे अंधत्व आणि किडनीचे आजार होऊ शकतात. संपूर्ण बोर्ड रिसायकलरला द्या.',
      en: 'Alert: Do not treat circuit boards with acid. Chemical fumes destroy lungs and skin. Hand over intact boards for automated recovery.'
    },
    actionAllowed: {
      hi: 'सूखे बक्से में सुरक्षित रखें',
      mr: 'कोरड्या पेटीत सुरक्षित ठेवा',
      en: 'Keep boards dry in sturdy crates'
    },
    actionProhibited: {
      hi: 'घर पर तेजाब में धोना',
      mr: 'घरी ॲसिडने धुणे किंवा जाळणे',
      en: 'Home acid baths or open-flame desoldering'
    }
  },
  {
    id: 'SAFE-BATTERY',
    icon: '🔋',
    code: 'SEC-03',
    hazardColor: 'safety-orange',
    title: {
      hi: 'बैटरी मत खोलना',
      mr: 'बॅटरी उघडू नका',
      en: 'DO NOT PUNCTURE BATTERY'
    },
    warning: {
      hi: 'मोबाइल और इन्वर्टर की बैटरी में छेद होने से अचानक धमाका और आग लग सकती है। टर्मिनल पर टेप लगाकर दें।',
      mr: 'मोबाईल किंवा इन्व्हर्टरची बॅटरी तोडू नका. तीव्र स्फोट व आग लागू शकते. सुरक्षितपणे वेगळी ठेवा.',
      en: 'Puncturing lithium-ion or lead batteries causes instantaneous thermal fires and toxic acid spills.'
    },
    audioScript: {
      hi: 'ध्यान दें! मोबाइल की फूली हुई बैटरी पर कभी हथौड़ा या पेचकस मत मारें। यह अचानक फट सकती है। इसे अलग सुरक्षित डिब्बे में रखें।',
      mr: 'लक्ष द्या! फुगलेली बॅटरी कधीही फोडू नका. ती अचानक पेट घेऊ शकते. सुरक्षित स्वतंत्र पेटीत ठेवा.',
      en: 'Notice: Never puncture swollen batteries. They can explode into flames. Store in a cool insulated container.'
    },
    actionAllowed: {
      hi: 'टर्मिनल्स पर बिजली का टेप लगाएं',
      mr: 'टर्मिनल्सवर इन्सुलेशन टेप लावा',
      en: 'Cover connection terminals with insulating tape'
    },
    actionProhibited: {
      hi: 'हथौड़े से तोड़ना या पानी में डालना',
      mr: 'हातोड्याने फोडणे किंवा पाण्यात टाकणे',
      en: 'Crushing with hammer or dumping in water'
    }
  },
  {
    id: 'SAFE-CRT',
    icon: '🖥️',
    code: 'SEC-04',
    hazardColor: 'safety-orange',
    title: {
      hi: 'CRT मॉनिटर मत फोड़ो',
      mr: 'CRT काच फोडू नका',
      en: 'DO NOT SMASH CRT GLASS'
    },
    warning: {
      hi: 'पुराने टीवी और कंप्यूटर स्क्रीन के शीशे में भारी लेड और जहरीला फॉस्फोरस पाउडर होता है। फूटने पर सांस में जहर घुलता है।',
      mr: 'जुन्या टीव्हीच्या काचेमध्ये विषारी शिसे असते. काच फुटल्यास डोळे आणि फुफ्फुसांना तीव्र इजा होते.',
      en: 'Cathode ray tubes contain 1.5–3kg of neurotoxic lead and vacuum implosion hazards if broken casually.'
    },
    audioScript: {
      hi: 'सावधान! पुराने कांच वाले टीवी को कभी मत फोड़िए। इसका कांच फटने से घातक शीशा और जहरीला पाउडर फैलता है। इसे साबुत रखें।',
      mr: 'सावधान! जुना टीव्ही काच फोडू नका. काच फुटल्यास तीव्र विषारी वायू पसरतो. संपूर्ण संच केंद्रात सुपूर्द करा.',
      en: 'Warning: Never smash CRT picture tubes. Implosion releases heavy lead particles. Hand over whole display unit.'
    },
    actionAllowed: {
      hi: 'कांच को बिना तोड़े सुरक्षित रखें',
      mr: 'काच न फोडता संपूर्ण संच ठेवा',
      en: 'Transport intact without breaking vacuum seal'
    },
    actionProhibited: {
      hi: 'हथौड़े से तांबा निकालने के लिए फोड़ना',
      mr: 'तांबे काढण्यासाठी काच फोडणे',
      en: 'Smashing neck funnel to extract copper yoke'
    }
  }
];

export const INITIAL_ANOMALIES: AnomalyAlert[] = [
  {
    id: 'ANOM-2026-081',
    lotId: 'KL-2026-004902',
    riskLevel: 'HIGH',
    flagReason: 'Price is 31% below recent local buying range',
    quotedPrice: 145,
    localMarketRange: { min: 185, max: 220 },
    historicalMedian: 205,
    deviationPct: -29.2,
    material: 'PCB',
    recyclerName: 'SHREE BALAJI TRADERS (UNVERIFIED)',
    timestamp: '2026-09-29 10:45 AM',
    status: 'REQUIRES_VERIFICATION',
    explanation: 'Quoted price of ₹145/KG is significantly lower than current market median of ₹205/KG. May indicate predatory pricing or low-grade misclassification. Requires verification, not marked as confirmed fraud.'
  },
  {
    id: 'ANOM-2026-079',
    lotId: 'KL-2026-004889',
    riskLevel: 'MEDIUM',
    flagReason: 'Repeated high-frequency lots within 2 hours',
    quotedPrice: 345,
    localMarketRange: { min: 310, max: 365 },
    historicalMedian: 340,
    deviationPct: 1.4,
    material: 'CABLE',
    recyclerName: 'GREENLOOP RECYCLING PVT LTD',
    timestamp: '2026-09-29 08:30 AM',
    status: 'REQUIRES_VERIFICATION',
    explanation: 'Collector submitted 3 separate 20kg lots in quick succession from same GPS coordinates. Potential batch splitting to stay under single-slip threshold. Verification suggested.'
  }
];

export const SAMPLE_TRACEABILITY_RECORD: TraceabilityRecord = {
  lotId: 'KL-2026-004821',
  handoverRef: 'KL-HO-842193',
  material: 'PCB',
  weightKg: 18.5,
  finalDestiny: 'CPCB-Authorized Hydrometallurgical Copper & Gold Extraction',
  recyclingFacility: 'GreenLoop R-Facility #4, Kanjurmarg West, Mumbai',
  steps: [
    {
      stage: 'COLLECTED',
      label: 'Field Collection & Aggregation',
      timestamp: '2026-09-29 08:45 AM',
      location: 'Dharavi 90ft Road, Sector 3',
      completed: true,
      details: 'Collected from informal e-scrap repair shops and household segregation.',
      actor: 'Rameshwar Shinde (Collector)',
      hash: '0x9fa1..4821'
    },
    {
      stage: 'LOT_CREATED',
      label: 'AI Photo & Weight Lot Logged',
      timestamp: '2026-09-29 09:30 AM',
      location: 'Kabadi Link Mobile App (GPS: 19.0435, 72.8567)',
      completed: true,
      details: 'AI verified Green Motherboards (91% confidence). Approx weight 18.5 KG logged.',
      actor: 'System / Computer Vision',
      hash: '0x882c..0048'
    },
    {
      stage: 'PRICE_QUOTED',
      label: 'Fair Market Price Quoted',
      timestamp: '2026-09-29 09:32 AM',
      location: 'Market Rate Engine (MMR Index)',
      completed: true,
      details: 'Local fair benchmark ₹205/KG. Estimated lot value ₹3,792.',
      actor: 'Kabadi Link Price Engine',
      hash: '0x331e..9901'
    },
    {
      stage: 'RECYCLER_MATCHED',
      label: 'Authorized Recycler Match (94% Score)',
      timestamp: '2026-09-29 09:35 AM',
      location: 'GreenLoop Recycling Pvt Ltd',
      completed: true,
      details: 'Matched offer of ₹210/KG (+₹5 above avg) with on-site facility handover.',
      actor: 'Matching Engine',
      hash: '0x12dc..9412'
    },
    {
      stage: 'HANDOVER',
      label: 'Digital Verified Handover',
      timestamp: '2026-09-29 11:15 AM',
      location: 'Kanjurmarg Facility Gate #2',
      completed: true,
      details: 'Physical weighment matched 18.5 KG. Photo & GPS verified. Handover Ref KL-HO-842193.',
      actor: 'Recycler Officer & Collector',
      hash: '0x77ee..8421'
    },
    {
      stage: 'PAYMENT',
      label: 'Instant Cash Receipt & Ledger Update',
      timestamp: '2026-09-29 11:18 AM',
      location: 'Facility Cash Counter',
      completed: true,
      details: '₹3,885 paid in full. Receipt CASH-RCPT-8421 generated and synced.',
      actor: 'Disbursement Ledger',
      hash: '0x55aa..3885'
    },
    {
      stage: 'RECYCLING_STATUS',
      label: 'Depopulation & Scientific Smelting',
      timestamp: '2026-09-29 02:00 PM',
      location: 'ISO 14001 Closed-Loop Smelting Chamber',
      completed: true,
      details: 'Solder stripped at 260°C. 3.4kg Copper, 120g Silver trace, 1.8g Gold recovered without open burning.',
      actor: 'GreenLoop Chief Metallurgist',
      hash: '0x44bb..9923'
    }
  ]
};

export const UNIT_ECONOMICS_DATA = {
  assumptions: {
    avgLotWeightKg: 18.5,
    avgPricePerKg: 205,
    avgTransactionValue: 3792.5,
    platformFeePct: 1.5,
    recyclerSubsidyPerKg: 1.0,
    fieldSupportCostPerTxn: 18.0,
    cloudAndSmsCostPerTxn: 4.5
  },
  scenarios: [
    {
      tier: 'LOW_VOLUME',
      name: 'Pilot Phase (100 lots/day)',
      lotsPerMonth: 3000,
      turnoverInr: 11377500,
      platformFeeInr: 170662,
      operationalCostInr: 67500,
      netContributionInr: 103162,
      marginPct: 60.4
    },
    {
      tier: 'BASE',
      name: 'Ward Scaling (1,200 lots/day)',
      lotsPerMonth: 36000,
      turnoverInr: 136530000,
      platformFeeInr: 2047950,
      operationalCostInr: 540000,
      netContributionInr: 1507950,
      marginPct: 73.6
    },
    {
      tier: 'HIGH_VOLUME',
      name: 'Metro Coverage (8,000 lots/day)',
      lotsPerMonth: 240000,
      turnoverInr: 910200000,
      platformFeeInr: 13653000,
      operationalCostInr: 2400000,
      netContributionInr: 11253000,
      marginPct: 82.4
    }
  ]
};

export const INITIAL_AUDITOR_TICKETS: AuditorTicket[] = [
  {
    id: 'TCK-2026-081',
    anomalyId: 'ANOM-2026-081',
    lotId: 'KL-2026-004902',
    riskLevel: 'HIGH',
    flagReason: 'Predatory under-pricing (-29.2% deviation from local benchmark)',
    material: 'PCB',
    subcategory: 'Green Motherboard & High-grade Telecom',
    reportedWeightKg: 28.0,
    quotedRatePerKg: 145,
    fairBenchmarkRate: 205,
    totalQuotedAmount: 4060,
    collectorName: 'Anand Patil (COL-MH-5519)',
    collectorContact: '+91 98204 88129',
    recyclerName: 'SHREE BALAJI TRADERS (UNVERIFIED AGGREGATOR)',
    facilityLocation: 'Chhatrapati Shivaji Scrap Market, Kurla West',
    coordinates: { lat: 19.0657, lng: 72.8792 },
    distanceKm: 2.1,
    assignedAuditor: 'Inspector Anil Gaikwad',
    auditorBadge: 'AUD-MPCB-0941',
    status: 'INVESTIGATION_ACTIVE',
    createdAt: '2026-09-29 10:45 AM',
    inspectionNotes: 'Dealer claimed boards are single-sided low grade; AI vision classified FR-4 dual-layer green boards with gold fingers.',
    scaleCalibrationValid: false,
    materialPurityMatch: true
  },
  {
    id: 'TCK-2026-079',
    anomalyId: 'ANOM-2026-079',
    lotId: 'KL-2026-004889',
    riskLevel: 'MEDIUM',
    flagReason: 'Rapid identical GPS lot submissions (batch splitting risk)',
    material: 'CABLE',
    subcategory: 'Insulated Copper & Power Harness',
    reportedWeightKg: 20.0,
    quotedRatePerKg: 345,
    fairBenchmarkRate: 340,
    totalQuotedAmount: 6900,
    collectorName: 'Rameshwar Shinde (COL-MH-4421)',
    collectorContact: '+91 98201 44821',
    recyclerName: 'GREENLOOP RECYCLING PVT LTD',
    facilityLocation: 'Dharavi 90ft Road Aggregation Hub',
    coordinates: { lat: 19.0435, lng: 72.8567 },
    distanceKm: 0.8,
    assignedAuditor: 'Inspector Anil Gaikwad',
    auditorBadge: 'AUD-MPCB-0941',
    status: 'PENDING_DISPATCH',
    createdAt: '2026-09-29 08:30 AM',
    inspectionNotes: 'Verify whether multiple bundles belong to distinct collection rounds or artificial slip fragmentation.'
  },
  {
    id: 'TCK-2026-074',
    anomalyId: 'ANOM-2026-074',
    lotId: 'KL-2026-004755',
    riskLevel: 'HIGH',
    flagReason: 'Suspected hazardous acid leaching setup at unverified scrap shed',
    material: 'PCB',
    subcategory: 'Telecom Server Backplanes',
    reportedWeightKg: 45.0,
    quotedRatePerKg: 130,
    fairBenchmarkRate: 205,
    totalQuotedAmount: 5850,
    collectorName: 'Mohan Lal (COL-MH-3312)',
    collectorContact: '+91 97690 11982',
    recyclerName: 'NOOR ELECTRONICS & SCRAP YARD',
    facilityLocation: 'Bhiwandi Khani Road Shed #4',
    coordinates: { lat: 19.2967, lng: 73.0631 },
    distanceKm: 14.5,
    assignedAuditor: 'Inspector Meera Sen',
    auditorBadge: 'AUD-MPCB-1102',
    status: 'PENDING_DISPATCH',
    createdAt: '2026-09-28 04:15 PM',
    inspectionNotes: 'Informal report of open chemical drums on perimeter. Urgent site visit mandated.'
  },
  {
    id: 'TCK-2026-068',
    anomalyId: 'ANOM-2026-068',
    lotId: 'KL-2026-004680',
    riskLevel: 'LOW',
    flagReason: 'Weight discrepancy: weighbridge reported 34kg vs initial estimate 40kg',
    material: 'BATTERY',
    subcategory: 'Sealed Lead Acid (SLA) Telecom Cells',
    reportedWeightKg: 40.0,
    verifiedWeightKg: 34.2,
    quotedRatePerKg: 125,
    fairBenchmarkRate: 125,
    totalQuotedAmount: 4275,
    collectorName: 'Sanjay Jadhav (COL-MH-2980)',
    collectorContact: '+91 98199 44321',
    recyclerName: 'ECOSHRED AUTHORIZED RE-PROCESSORS',
    facilityLocation: 'Turbhe MIDC Plot 88',
    coordinates: { lat: 19.0760, lng: 73.0083 },
    distanceKm: 8.4,
    assignedAuditor: 'Inspector Anil Gaikwad',
    auditorBadge: 'AUD-MPCB-0941',
    status: 'RESOLVED_LEGITIMATE',
    createdAt: '2026-09-27 11:20 AM',
    updatedAt: '2026-09-28 02:00 PM',
    inspectionNotes: 'Physical scale check verified calibrated Avery Weigh-Tronix load cell. Discrepancy caused by tare weight of plastic crates initially included by collector.',
    scaleCalibrationValid: true,
    materialPurityMatch: true,
    actionTaken: 'Collector briefed on gross vs tare deductions. Transaction adjusted to 34.2kg and approved.'
  }
];

export const DEMO_ACCOUNTS: UserAccount[] = [
  {
    id: 'USR-AUD-01',
    role: 'AUDITOR',
    name: 'Inspector Anil Gaikwad',
    phone: '+91 98200 44921',
    email: 'anil.gaikwad@mpcb.gov.in',
    organization: 'Maharashtra Pollution Control Board (E-Waste Cell)',
    badgeNumber: 'AUD-MPCB-0941',
    wardArea: 'Mumbai Central / Kurla / Dharavi Zone',
    verified: true
  },
  {
    id: 'USR-COL-01',
    role: 'COLLECTOR',
    name: 'Rameshwar "Kaka" Shinde',
    phone: '+91 98201 44821',
    wardArea: 'Dharavi 90ft Road & Kurla MIDC',
    verified: true
  },
  {
    id: 'USR-REC-01',
    role: 'RECYCLER',
    name: 'Vikram Merchant (GreenLoop Facility Head)',
    phone: '+91 98201 10920',
    email: 'operations@greenloop.in',
    organization: 'GreenLoop Recycling Pvt Ltd',
    badgeNumber: 'CPCB-REG-EW/MH-1092/2024',
    wardArea: 'Kanjurmarg West Industrial Zone',
    verified: true
  },
  {
    id: 'USR-ADM-01',
    role: 'ADMIN',
    name: 'Dr. Sunita Kulkarni',
    phone: '+91 98190 00192',
    email: 's.kulkarni@cpcb.nic.in',
    organization: 'Central Pollution Control Board',
    badgeNumber: 'CPCB-HQ-ADM-02',
    wardArea: 'National E-Waste Oversight',
    verified: true
  }
];

