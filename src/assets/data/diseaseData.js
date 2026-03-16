// ========== Disease Data for EWARS Bangladesh Dashboard ==========

// ========== DENGUE ==========
const dengueDistrictData = [
  { district: "Dhaka", division: "Dhaka", cases: 891, deaths: 12, previousWeekCases: 765, lat: 23.81, lng: 90.41 },
  { district: "Chattogram", division: "Chittagong", cases: 234, deaths: 3, previousWeekCases: 210, lat: 22.34, lng: 91.83 },
  { district: "Mymensingh", division: "Mymensingh", cases: 223, deaths: 2, previousWeekCases: 166, lat: 24.75, lng: 90.41 },
  { district: "Patuakhali", division: "Barisal", cases: 298, deaths: 4, previousWeekCases: 189, lat: 22.35, lng: 90.33 },
  { district: "Sylhet", division: "Sylhet", cases: 87, deaths: 1, previousWeekCases: 94, lat: 24.90, lng: 91.87 },
  { district: "Rajshahi", division: "Rajshahi", cases: 45, deaths: 0, previousWeekCases: 52, lat: 24.37, lng: 88.60 },
  { district: "Khulna", division: "Khulna", cases: 120, deaths: 1, previousWeekCases: 135, lat: 22.82, lng: 89.53 },
  { district: "Rangpur", division: "Rangpur", cases: 33, deaths: 0, previousWeekCases: 41, lat: 25.74, lng: 89.25 },
  { district: "Barisal", division: "Barisal", cases: 67, deaths: 1, previousWeekCases: 72, lat: 22.70, lng: 90.37 },
  { district: "Gazipur", division: "Dhaka", cases: 312, deaths: 4, previousWeekCases: 278, lat: 24.00, lng: 90.43 },
  { district: "Narayanganj", division: "Dhaka", cases: 245, deaths: 3, previousWeekCases: 218, lat: 23.63, lng: 90.50 },
  { district: "Comilla", division: "Chittagong", cases: 156, deaths: 2, previousWeekCases: 142, lat: 23.46, lng: 91.18 },
  { district: "Tangail", division: "Dhaka", cases: 89, deaths: 1, previousWeekCases: 95, lat: 24.25, lng: 89.92 },
  { district: "Dinajpur", division: "Rangpur", cases: 53, deaths: 1, previousWeekCases: 39, lat: 25.63, lng: 88.64 },
  { district: "Feni", division: "Chittagong", cases: 78, deaths: 1, previousWeekCases: 66, lat: 23.02, lng: 91.40 },
  { district: "Jessore", division: "Khulna", cases: 64, deaths: 0, previousWeekCases: 71, lat: 23.17, lng: 89.21 },
  { district: "Rangamati", division: "Chittagong", cases: 11, deaths: 0, previousWeekCases: 17, lat: 22.73, lng: 92.20 },
  { district: "Bandarban", division: "Chittagong", cases: 7, deaths: 0, previousWeekCases: 8, lat: 22.20, lng: 92.22 },
  { district: "Cox's Bazar", division: "Chittagong", cases: 42, deaths: 0, previousWeekCases: 63, lat: 21.43, lng: 92.01 },
  { district: "Bogra", division: "Rajshahi", cases: 38, deaths: 0, previousWeekCases: 29, lat: 24.85, lng: 89.37 },
  { district: "Narsingdi", division: "Dhaka", cases: 178, deaths: 2, previousWeekCases: 155, lat: 23.92, lng: 90.72 },
  { district: "Munshiganj", division: "Dhaka", cases: 134, deaths: 1, previousWeekCases: 119, lat: 23.54, lng: 90.53 },
  { district: "Manikganj", division: "Dhaka", cases: 56, deaths: 0, previousWeekCases: 48, lat: 23.86, lng: 90.00 },
  { district: "Madaripur", division: "Dhaka", cases: 41, deaths: 0, previousWeekCases: 37, lat: 23.16, lng: 90.19 },
  { district: "Brahmanbaria", division: "Chittagong", cases: 95, deaths: 1, previousWeekCases: 88, lat: 23.96, lng: 91.11 },
  { district: "Noakhali", division: "Chittagong", cases: 72, deaths: 1, previousWeekCases: 79, lat: 22.87, lng: 91.10 },
  { district: "Lakshmipur", division: "Chittagong", cases: 58, deaths: 0, previousWeekCases: 51, lat: 22.94, lng: 90.83 },
  { district: "Chandpur", division: "Chittagong", cases: 83, deaths: 1, previousWeekCases: 76, lat: 23.23, lng: 90.67 },
  { district: "Kishoreganj", division: "Dhaka", cases: 67, deaths: 1, previousWeekCases: 74, lat: 24.44, lng: 90.78 },
  { district: "Netrokona", division: "Mymensingh", cases: 34, deaths: 0, previousWeekCases: 29, lat: 24.88, lng: 90.73 },
  { district: "Jamalpur", division: "Mymensingh", cases: 28, deaths: 0, previousWeekCases: 33, lat: 24.94, lng: 89.94 },
  { district: "Sherpur", division: "Mymensingh", cases: 19, deaths: 0, previousWeekCases: 22, lat: 25.02, lng: 90.01 },
  { district: "Habiganj", division: "Sylhet", cases: 45, deaths: 0, previousWeekCases: 52, lat: 24.38, lng: 91.42 },
  { district: "Moulvibazar", division: "Sylhet", cases: 31, deaths: 0, previousWeekCases: 28, lat: 24.48, lng: 91.77 },
  { district: "Sunamganj", division: "Sylhet", cases: 22, deaths: 0, previousWeekCases: 26, lat: 25.07, lng: 91.40 },
  { district: "Khagrachhari", division: "Chittagong", cases: 15, deaths: 0, previousWeekCases: 12, lat: 23.12, lng: 91.95 },
  { district: "Kurigram", division: "Rangpur", cases: 18, deaths: 0, previousWeekCases: 14, lat: 25.81, lng: 89.64 },
  { district: "Satkhira", division: "Khulna", cases: 27, deaths: 0, previousWeekCases: 31, lat: 22.31, lng: 89.10 },
  { district: "Bagerhat", division: "Khulna", cases: 35, deaths: 0, previousWeekCases: 39, lat: 22.65, lng: 89.79 },
  { district: "Gopalganj", division: "Dhaka", cases: 22, deaths: 0, previousWeekCases: 18, lat: 23.00, lng: 89.83 },
  { district: "Shariatpur", division: "Dhaka", cases: 31, deaths: 0, previousWeekCases: 27, lat: 23.24, lng: 90.36 },
  { district: "Faridpur", division: "Dhaka", cases: 47, deaths: 0, previousWeekCases: 42, lat: 23.61, lng: 89.84 },
  { district: "Rajbari", division: "Dhaka", cases: 25, deaths: 0, previousWeekCases: 21, lat: 23.76, lng: 89.64 },
  { district: "Pabna", division: "Rajshahi", cases: 32, deaths: 0, previousWeekCases: 36, lat: 24.01, lng: 89.23 },
  { district: "Sirajganj", division: "Rajshahi", cases: 41, deaths: 0, previousWeekCases: 38, lat: 24.45, lng: 89.70 },
  { district: "Natore", division: "Rajshahi", cases: 18, deaths: 0, previousWeekCases: 21, lat: 24.42, lng: 89.00 },
  { district: "Naogaon", division: "Rajshahi", cases: 23, deaths: 0, previousWeekCases: 27, lat: 24.81, lng: 88.94 },
  { district: "Chapainawabganj", division: "Rajshahi", cases: 14, deaths: 0, previousWeekCases: 17, lat: 24.60, lng: 88.27 },
  { district: "Nawabganj", division: "Rajshahi", cases: 12, deaths: 0, previousWeekCases: 15, lat: 24.59, lng: 88.28 },
  { district: "Joypurhat", division: "Rajshahi", cases: 9, deaths: 0, previousWeekCases: 11, lat: 25.10, lng: 89.02 },
  { district: "Kushtia", division: "Khulna", cases: 29, deaths: 0, previousWeekCases: 25, lat: 23.90, lng: 89.12 },
  { district: "Meherpur", division: "Khulna", cases: 8, deaths: 0, previousWeekCases: 10, lat: 23.76, lng: 88.63 },
  { district: "Chuadanga", division: "Khulna", cases: 13, deaths: 0, previousWeekCases: 16, lat: 23.64, lng: 88.82 },
  { district: "Jhenaidah", division: "Khulna", cases: 21, deaths: 0, previousWeekCases: 24, lat: 23.54, lng: 89.18 },
  { district: "Magura", division: "Khulna", cases: 11, deaths: 0, previousWeekCases: 14, lat: 23.49, lng: 89.42 },
  { district: "Narail", division: "Khulna", cases: 16, deaths: 0, previousWeekCases: 19, lat: 23.17, lng: 89.51 },
  { district: "Pirojpur", division: "Barisal", cases: 24, deaths: 0, previousWeekCases: 28, lat: 22.58, lng: 89.97 },
  { district: "Jhalokathi", division: "Barisal", cases: 15, deaths: 0, previousWeekCases: 18, lat: 22.64, lng: 90.20 },
  { district: "Bhola", division: "Barisal", cases: 38, deaths: 0, previousWeekCases: 42, lat: 22.69, lng: 90.65 },
  { district: "Barguna", division: "Barisal", cases: 29, deaths: 0, previousWeekCases: 33, lat: 22.15, lng: 90.12 },
  { district: "Nilphamari", division: "Rangpur", cases: 12, deaths: 0, previousWeekCases: 15, lat: 25.93, lng: 88.86 },
  { district: "Lalmonirhat", division: "Rangpur", cases: 9, deaths: 0, previousWeekCases: 11, lat: 25.92, lng: 89.45 },
  { district: "Gaibandha", division: "Rangpur", cases: 16, deaths: 0, previousWeekCases: 19, lat: 25.33, lng: 89.53 },
  { district: "Thakurgaon", division: "Rangpur", cases: 7, deaths: 0, previousWeekCases: 9, lat: 26.03, lng: 88.46 },
  { district: "Panchagarh", division: "Rangpur", cases: 5, deaths: 0, previousWeekCases: 6, lat: 26.33, lng: 88.56 },
];

const dengueWeeklyTrend = [
  { week: "W1", cases: 120, predicted: 115 }, { week: "W5", cases: 95, predicted: 100 },
  { week: "W9", cases: 78, predicted: 82 }, { week: "W13", cases: 145, predicted: 140 },
  { week: "W17", cases: 310, predicted: 295 }, { week: "W21", cases: 580, predicted: 560 },
  { week: "W25", cases: 1200, predicted: 1150 }, { week: "W29", cases: 2800, predicted: 2650 },
  { week: "W33", cases: 4500, predicted: 4200 }, { week: "W37", cases: 5800, predicted: 5500 },
  { week: "W41", cases: 4136, predicted: 4000 }, { week: "W44", cases: 3200, predicted: 3100 },
  { week: "W48", cases: null, predicted: 2400, upperCI: 3200, lowerCI: 1600 },
  { week: "W52", cases: null, predicted: 1800, upperCI: 2600, lowerCI: 1000 },
];

const dengueClimate = Array.from({ length: 52 }, (_, i) => ({
  week: `W${i + 1}`,
  cases: Math.round(200 + 4300 * Math.pow(Math.sin(((i - 10) / 52) * Math.PI), 2) * (i > 15 && i < 45 ? 1 : 0.15) + Math.random() * 300),
  temp: +(22 + 10 * Math.sin(((i - 5) / 52) * 2 * Math.PI) + Math.random() * 2).toFixed(1),
  humidity: +(65 + 20 * Math.sin(((i - 2) / 52) * 2 * Math.PI) + Math.random() * 5).toFixed(1),
  rainfall: +(Math.max(0, 80 * Math.sin(((i - 15) / 52) * Math.PI) + Math.random() * 40 - 10)).toFixed(1),
}));

// ========== MALARIA PF ==========
const malariaPFDistrictData = [
  { district: "Rangamati", division: "Chittagong", cases: 145, deaths: 3, previousWeekCases: 132, lat: 22.73, lng: 92.20 },
  { district: "Bandarban", division: "Chittagong", cases: 98, deaths: 2, previousWeekCases: 105, lat: 22.20, lng: 92.22 },
  { district: "Khagrachhari", division: "Chittagong", cases: 76, deaths: 1, previousWeekCases: 82, lat: 23.12, lng: 91.95 },
  { district: "Cox's Bazar", division: "Chittagong", cases: 52, deaths: 1, previousWeekCases: 48, lat: 21.43, lng: 92.01 },
  { district: "Chattogram", division: "Chittagong", cases: 34, deaths: 0, previousWeekCases: 31, lat: 22.34, lng: 91.83 },
  { district: "Sylhet", division: "Sylhet", cases: 28, deaths: 0, previousWeekCases: 32, lat: 24.90, lng: 91.87 },
  { district: "Moulvibazar", division: "Sylhet", cases: 22, deaths: 0, previousWeekCases: 25, lat: 24.48, lng: 91.77 },
  { district: "Habiganj", division: "Sylhet", cases: 18, deaths: 0, previousWeekCases: 20, lat: 24.38, lng: 91.42 },
  { district: "Sunamganj", division: "Sylhet", cases: 12, deaths: 0, previousWeekCases: 14, lat: 25.07, lng: 91.40 },
  { district: "Mymensingh", division: "Mymensingh", cases: 15, deaths: 0, previousWeekCases: 18, lat: 24.75, lng: 90.41 },
  { district: "Netrokona", division: "Mymensingh", cases: 11, deaths: 0, previousWeekCases: 13, lat: 24.88, lng: 90.73 },
  { district: "Sherpur", division: "Mymensingh", cases: 8, deaths: 0, previousWeekCases: 9, lat: 25.02, lng: 90.01 },
  { district: "Dhaka", division: "Dhaka", cases: 5, deaths: 0, previousWeekCases: 7, lat: 23.81, lng: 90.41 },
  { district: "Gazipur", division: "Dhaka", cases: 3, deaths: 0, previousWeekCases: 4, lat: 24.00, lng: 90.43 },
  { district: "Kurigram", division: "Rangpur", cases: 6, deaths: 0, previousWeekCases: 5, lat: 25.81, lng: 89.64 },
];

const malariaPFWeekly = [
  { week: "W1", cases: 8, predicted: 9 }, { week: "W5", cases: 12, predicted: 11 },
  { week: "W9", cases: 18, predicted: 16 }, { week: "W13", cases: 35, predicted: 32 },
  { week: "W17", cases: 58, predicted: 55 }, { week: "W21", cases: 85, predicted: 80 },
  { week: "W25", cases: 120, predicted: 115 }, { week: "W29", cases: 95, predicted: 100 },
  { week: "W33", cases: 72, predicted: 75 }, { week: "W37", cases: 48, predicted: 50 },
  { week: "W41", cases: 25, predicted: 28 }, { week: "W44", cases: 15, predicted: 18 },
  { week: "W48", cases: null, predicted: 10, upperCI: 18, lowerCI: 4 },
  { week: "W52", cases: null, predicted: 7, upperCI: 14, lowerCI: 2 },
];

const malariaPFClimate = Array.from({ length: 52 }, (_, i) => ({
  week: `W${i + 1}`,
  cases: Math.round(5 + 115 * Math.pow(Math.sin(((i - 8) / 52) * Math.PI), 2) * (i > 10 && i < 40 ? 1 : 0.1) + Math.random() * 15),
  temp: +(24 + 8 * Math.sin(((i - 5) / 52) * 2 * Math.PI) + Math.random() * 2).toFixed(1),
  humidity: +(70 + 18 * Math.sin(((i - 2) / 52) * 2 * Math.PI) + Math.random() * 5).toFixed(1),
  rainfall: +(Math.max(0, 100 * Math.sin(((i - 12) / 52) * Math.PI) + Math.random() * 30 - 5)).toFixed(1),
}));

// ========== MALARIA PV ==========
const malariaPVDistrictData = [
  { district: "Rangamati", division: "Chittagong", cases: 210, deaths: 1, previousWeekCases: 195, lat: 22.73, lng: 92.20 },
  { district: "Bandarban", division: "Chittagong", cases: 165, deaths: 1, previousWeekCases: 178, lat: 22.20, lng: 92.22 },
  { district: "Khagrachhari", division: "Chittagong", cases: 132, deaths: 0, previousWeekCases: 140, lat: 23.12, lng: 91.95 },
  { district: "Cox's Bazar", division: "Chittagong", cases: 88, deaths: 0, previousWeekCases: 82, lat: 21.43, lng: 92.01 },
  { district: "Chattogram", division: "Chittagong", cases: 54, deaths: 0, previousWeekCases: 49, lat: 22.34, lng: 91.83 },
  { district: "Sylhet", division: "Sylhet", cases: 42, deaths: 0, previousWeekCases: 47, lat: 24.90, lng: 91.87 },
  { district: "Moulvibazar", division: "Sylhet", cases: 35, deaths: 0, previousWeekCases: 38, lat: 24.48, lng: 91.77 },
  { district: "Habiganj", division: "Sylhet", cases: 28, deaths: 0, previousWeekCases: 31, lat: 24.38, lng: 91.42 },
  { district: "Sunamganj", division: "Sylhet", cases: 19, deaths: 0, previousWeekCases: 22, lat: 25.07, lng: 91.40 },
  { district: "Mymensingh", division: "Mymensingh", cases: 23, deaths: 0, previousWeekCases: 26, lat: 24.75, lng: 90.41 },
  { district: "Netrokona", division: "Mymensingh", cases: 16, deaths: 0, previousWeekCases: 18, lat: 24.88, lng: 90.73 },
  { district: "Sherpur", division: "Mymensingh", cases: 12, deaths: 0, previousWeekCases: 14, lat: 25.02, lng: 90.01 },
  { district: "Dhaka", division: "Dhaka", cases: 8, deaths: 0, previousWeekCases: 10, lat: 23.81, lng: 90.41 },
  { district: "Kurigram", division: "Rangpur", cases: 10, deaths: 0, previousWeekCases: 8, lat: 25.81, lng: 89.64 },
  { district: "Comilla", division: "Chittagong", cases: 7, deaths: 0, previousWeekCases: 9, lat: 23.46, lng: 91.18 },
];

const malariaPVWeekly = [
  { week: "W1", cases: 12, predicted: 13 }, { week: "W5", cases: 18, predicted: 16 },
  { week: "W9", cases: 28, predicted: 25 }, { week: "W13", cases: 52, predicted: 48 },
  { week: "W17", cases: 88, predicted: 82 }, { week: "W21", cases: 135, predicted: 128 },
  { week: "W25", cases: 180, predicted: 172 }, { week: "W29", cases: 155, predicted: 160 },
  { week: "W33", cases: 110, predicted: 115 }, { week: "W37", cases: 72, predicted: 78 },
  { week: "W41", cases: 38, predicted: 42 }, { week: "W44", cases: 20, predicted: 24 },
  { week: "W48", cases: null, predicted: 14, upperCI: 24, lowerCI: 6 },
  { week: "W52", cases: null, predicted: 10, upperCI: 18, lowerCI: 4 },
];

const malariaPVClimate = Array.from({ length: 52 }, (_, i) => ({
  week: `W${i + 1}`,
  cases: Math.round(8 + 172 * Math.pow(Math.sin(((i - 8) / 52) * Math.PI), 2) * (i > 10 && i < 40 ? 1 : 0.12) + Math.random() * 20),
  temp: +(24 + 8 * Math.sin(((i - 5) / 52) * 2 * Math.PI) + Math.random() * 2).toFixed(1),
  humidity: +(70 + 18 * Math.sin(((i - 2) / 52) * 2 * Math.PI) + Math.random() * 5).toFixed(1),
  rainfall: +(Math.max(0, 100 * Math.sin(((i - 12) / 52) * Math.PI) + Math.random() * 30 - 5)).toFixed(1),
}));

// ========== ACUTE WATERY DIARRHOEA ==========
const diarrhoeaDistrictData = [
  { district: "Dhaka", division: "Dhaka", cases: 425, deaths: 5, previousWeekCases: 398, lat: 23.81, lng: 90.41 },
  { district: "Chattogram", division: "Chittagong", cases: 312, deaths: 3, previousWeekCases: 335, lat: 22.34, lng: 91.83 },
  { district: "Mymensingh", division: "Mymensingh", cases: 189, deaths: 2, previousWeekCases: 175, lat: 24.75, lng: 90.41 },
  { district: "Rajshahi", division: "Rajshahi", cases: 145, deaths: 1, previousWeekCases: 158, lat: 24.37, lng: 88.60 },
  { district: "Khulna", division: "Khulna", cases: 178, deaths: 2, previousWeekCases: 192, lat: 22.82, lng: 89.53 },
  { district: "Sylhet", division: "Sylhet", cases: 134, deaths: 1, previousWeekCases: 128, lat: 24.90, lng: 91.87 },
  { district: "Rangpur", division: "Rangpur", cases: 98, deaths: 1, previousWeekCases: 105, lat: 25.74, lng: 89.25 },
  { district: "Barisal", division: "Barisal", cases: 156, deaths: 2, previousWeekCases: 168, lat: 22.70, lng: 90.37 },
  { district: "Gazipur", division: "Dhaka", cases: 205, deaths: 2, previousWeekCases: 188, lat: 24.00, lng: 90.43 },
  { district: "Narayanganj", division: "Dhaka", cases: 178, deaths: 2, previousWeekCases: 165, lat: 23.63, lng: 90.50 },
  { district: "Comilla", division: "Chittagong", cases: 132, deaths: 1, previousWeekCases: 142, lat: 23.46, lng: 91.18 },
  { district: "Bogra", division: "Rajshahi", cases: 89, deaths: 1, previousWeekCases: 95, lat: 24.85, lng: 89.37 },
  { district: "Jessore", division: "Khulna", cases: 112, deaths: 1, previousWeekCases: 120, lat: 23.17, lng: 89.21 },
  { district: "Dinajpur", division: "Rangpur", cases: 67, deaths: 0, previousWeekCases: 72, lat: 25.63, lng: 88.64 },
  { district: "Tangail", division: "Dhaka", cases: 94, deaths: 1, previousWeekCases: 88, lat: 24.25, lng: 89.92 },
  { district: "Cox's Bazar", division: "Chittagong", cases: 145, deaths: 1, previousWeekCases: 155, lat: 21.43, lng: 92.01 },
  { district: "Brahmanbaria", division: "Chittagong", cases: 78, deaths: 0, previousWeekCases: 82, lat: 23.96, lng: 91.11 },
  { district: "Noakhali", division: "Chittagong", cases: 95, deaths: 1, previousWeekCases: 102, lat: 22.87, lng: 91.10 },
  { district: "Pabna", division: "Rajshahi", cases: 56, deaths: 0, previousWeekCases: 61, lat: 24.01, lng: 89.23 },
  { district: "Kushtia", division: "Khulna", cases: 72, deaths: 0, previousWeekCases: 78, lat: 23.90, lng: 89.12 },
  { district: "Faridpur", division: "Dhaka", cases: 65, deaths: 0, previousWeekCases: 58, lat: 23.61, lng: 89.84 },
  { district: "Patuakhali", division: "Barisal", cases: 88, deaths: 1, previousWeekCases: 95, lat: 22.35, lng: 90.33 },
  { district: "Bhola", division: "Barisal", cases: 105, deaths: 1, previousWeekCases: 112, lat: 22.69, lng: 90.65 },
  { district: "Sirajganj", division: "Rajshahi", cases: 68, deaths: 0, previousWeekCases: 73, lat: 24.45, lng: 89.70 },
  { district: "Satkhira", division: "Khulna", cases: 82, deaths: 1, previousWeekCases: 88, lat: 22.31, lng: 89.10 },
];

const diarrhoeaWeekly = [
  { week: "W1", cases: 280, predicted: 270 }, { week: "W5", cases: 350, predicted: 340 },
  { week: "W9", cases: 420, predicted: 400 }, { week: "W13", cases: 520, predicted: 500 },
  { week: "W17", cases: 380, predicted: 390 }, { week: "W21", cases: 290, predicted: 300 },
  { week: "W25", cases: 250, predicted: 260 }, { week: "W29", cases: 310, predicted: 300 },
  { week: "W33", cases: 450, predicted: 430 }, { week: "W37", cases: 380, predicted: 370 },
  { week: "W41", cases: 170, predicted: 180 }, { week: "W44", cases: 145, predicted: 155 },
  { week: "W48", cases: null, predicted: 200, upperCI: 280, lowerCI: 120 },
  { week: "W52", cases: null, predicted: 250, upperCI: 350, lowerCI: 150 },
];

const diarrhoeaClimate = Array.from({ length: 52 }, (_, i) => ({
  week: `W${i + 1}`,
  cases: Math.round(100 + 420 * (Math.sin(((i + 5) / 26) * Math.PI) * 0.5 + 0.5) + Math.random() * 80),
  temp: +(22 + 10 * Math.sin(((i - 5) / 52) * 2 * Math.PI) + Math.random() * 2).toFixed(1),
  humidity: +(65 + 20 * Math.sin(((i - 2) / 52) * 2 * Math.PI) + Math.random() * 5).toFixed(1),
  rainfall: +(Math.max(0, 80 * Math.sin(((i - 15) / 52) * Math.PI) + Math.random() * 40 - 10)).toFixed(1),
}));

// ========== DISEASE PROFILES ==========
export const diseaseProfiles = {
  dengue: {
    key: "dengue",
    label: "Dengue",
    totalCases: 119702,
    currentWeekCases: 4136,
    previousWeekCases: 3600,
    latestDataWeek: "Week 44, 2025",
    percentChange: 14.9,
    peakYear: 2024,
    peakCases: 76160,
    districtData: dengueDistrictData,
    weeklyTrend: dengueWeeklyTrend,
    climateCorrelation: dengueClimate,
    modelMetrics: {
      r2: 99.3,
      smape: 116.1,
      coverage90: 94.7,
      predictionWindow: "7-14 days",
      climateFactors: [
        { name: "Temperature", lag: "12w rolling mean", value: 0.13, positive: true },
        { name: "Rainfall", lag: "6w rolling std", value: 0.12, positive: true },
        { name: "Humidity", lag: "lag 12w", value: 0.04, positive: false },
      ],
    },
    alertDistrictsCount: 4,
    totalDistricts: 28,
  },
  malariaPF: {
    key: "malariaPF",
    label: "Malaria (P. falciparum)",
    totalCases: 4823,
    currentWeekCases: 553,
    previousWeekCases: 588,
    latestDataWeek: "Week 44, 2025",
    percentChange: -5.9,
    peakYear: 2023,
    peakCases: 6210,
    districtData: malariaPFDistrictData,
    weeklyTrend: malariaPFWeekly,
    climateCorrelation: malariaPFClimate,
    modelMetrics: {
      r2: 97.8,
      smape: 82.4,
      coverage90: 91.2,
      predictionWindow: "7-14 days",
      climateFactors: [
        { name: "Rainfall", lag: "8w rolling mean", value: 0.18, positive: true },
        { name: "Temperature", lag: "4w rolling mean", value: 0.11, positive: true },
        { name: "Humidity", lag: "lag 8w", value: 0.09, positive: true },
      ],
    },
    alertDistrictsCount: 3,
    totalDistricts: 15,
    totalUpazilas: 37,
  },
  malariaPV: {
    key: "malariaPV",
    label: "Malaria (P. vivax)",
    totalCases: 7245,
    currentWeekCases: 849,
    previousWeekCases: 892,
    latestDataWeek: "Week 44, 2025",
    percentChange: -4.8,
    peakYear: 2022,
    peakCases: 9870,
    districtData: malariaPVDistrictData,
    weeklyTrend: malariaPVWeekly,
    climateCorrelation: malariaPVClimate,
    modelMetrics: {
      r2: 98.1,
      smape: 78.9,
      coverage90: 92.5,
      predictionWindow: "7-14 days",
      climateFactors: [
        { name: "Rainfall", lag: "10w rolling mean", value: 0.16, positive: true },
        { name: "Humidity", lag: "lag 6w", value: 0.14, positive: true },
        { name: "Temperature", lag: "8w rolling mean", value: 0.08, positive: true },
      ],
    },
    alertDistrictsCount: 2,
    totalDistricts: 15,
    totalUpazilas: 37,
  },
  diarrhoea: {
    key: "diarrhoea",
    label: "Acute Watery Diarrhoea",
    totalCases: 45230,
    currentWeekCases: 3578,
    previousWeekCases: 3852,
    latestDataWeek: "Week 40, 2025",
    percentChange: -7.1,
    peakYear: 2024,
    peakCases: 52400,
    districtData: diarrhoeaDistrictData,
    weeklyTrend: diarrhoeaWeekly,
    climateCorrelation: diarrhoeaClimate,
    modelMetrics: {
      r2: 96.5,
      smape: 95.3,
      coverage90: 89.8,
      predictionWindow: "7-14 days",
      climateFactors: [
        { name: "Temperature", lag: "4w rolling mean", value: 0.21, positive: true },
        { name: "Rainfall", lag: "2w rolling sum", value: 0.17, positive: true },
        { name: "Humidity", lag: "lag 4w", value: 0.06, positive: false },
      ],
    },
    alertDistrictsCount: 5,
    totalDistricts: 25,
  },
};

export const diseaseOptions = [
  { value: "dengue", label: "Dengue" },
  { value: "malariaPF", label: "Malaria PF" },
  { value: "malariaPV", label: "Malaria PV" },
  { value: "diarrhoea", label: "Acute Watery Diarrhoea" },
];

export function getTopDistricts(disease, count = 6) {
  return [...diseaseProfiles[disease].districtData]
    .sort((a, b) => b.cases - a.cases)
    .slice(0, count)
    .map((d) => {
      const change = d.previousWeekCases === 0
        ? 100
        : Math.round(((d.cases - d.previousWeekCases) / d.previousWeekCases) * 100);
      return {
        name: d.district,
        week: diseaseProfiles[disease].latestDataWeek,
        thisWeek: d.cases,
        lastWeek: d.previousWeekCases,
        change,
        trend: change > 0 ? "Rising" : change < 0 ? "Declining" : "Stable",
      };
    });
}

export function getAlertDistricts(disease) {
  return diseaseProfiles[disease].districtData
    .filter((d) => d.cases > d.previousWeekCases * 1.15)
    .sort((a, b) => b.cases - a.cases);
}

// Helper to get heatmap color based on case count & disease max
export function getHeatmapColor(cases, maxCases) {
  const ratio = cases / maxCases;
  if (ratio < 0.05) return "hsl(50,80%,92%)";
  if (ratio < 0.1) return "hsl(45,85%,80%)";
  if (ratio < 0.2) return "hsl(40,90%,72%)";
  if (ratio < 0.3) return "hsl(35,90%,65%)";
  if (ratio < 0.45) return "hsl(25,90%,60%)";
  if (ratio < 0.6) return "hsl(15,85%,55%)";
  if (ratio < 0.8) return "hsl(5,80%,50%)";
  return "hsl(0,75%,40%)";
}