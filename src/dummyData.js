const monthlyDummy = [
  { name: "식비", total: 111000 },
  { name: "교통비", total: 157300 },
  { name: "기타", total: 157000 },
  { name: "공과금", total: 85200 },
  { name: "수입", total: 650000 },
];

const weeklyDummy = [
  { name: "2024-08-25", total: 144800 },
  { name: "2024-08-26", total: 164200 },
  { name: "2024-08-27", total: 2000 },
  { name: "2024-08-28", total: 2500 },
  { name: "2024-08-29", total: 27500 },
  { name: "2024-08-30", total: 36700 },
  { name: "2024-08-31", total: 35000 },
];

const historyDummy = [
  {
    ihistory: 11,
    date: "2024-08-31",
    amount: 10000,
    category: {
      createdAt: null,
      icategory: 1,
      category: "식비",
    },
    purpose: "김밥",
  },
  {
    ihistory: 12,
    date: "2024-08-31",
    amount: 100000,
    category: {
      createdAt: null,
      icategory: 5,
      category: "수입",
    },
    purpose: "용돈",
  },
  {
    ihistory: 13,
    date: "2024-08-31",
    amount: 25000,
    category: {
      createdAt: null,
      icategory: 1,
      category: "식비",
    },
    purpose: "저녁",
  },
  {
    ihistory: 7,
    date: "2024-08-30",
    amount: 6900,
    category: {
      createdAt: null,
      icategory: 1,
      category: "식비",
    },
    purpose: "햄버거",
  },
  {
    ihistory: 8,
    date: "2024-08-30",
    amount: 29800,
    category: {
      createdAt: null,
      icategory: 1,
      category: "식비",
    },
    purpose: "피자",
  },
  {
    ihistory: 2,
    date: "2024-08-29",
    amount: 8000,
    category: {
      createdAt: null,
      icategory: 2,
      category: "교통비",
    },
    purpose: "택시비",
  },
  {
    ihistory: 42,
    date: "2024-08-28",
    amount: 500000,
    category: {
      createdAt: null,
      icategory: 5,
      category: "수입",
    },
    purpose: "수입",
  },
  {
    ihistory: 4,
    date: "2024-08-29",
    amount: 19500,
    category: {
      createdAt: null,
      icategory: 3,
      category: "공과금",
    },
    purpose: "전기세",
  },
  {
    ihistory: 17,
    date: "2024-08-28",
    amount: 2500,
    category: {
      createdAt: null,
      icategory: 2,
      category: "교통비",
    },
    purpose: "지하철",
  },
  {
    ihistory: 3,
    date: "2024-08-27",
    amount: 2000,
    category: {
      createdAt: null,
      icategory: 4,
      category: "기타",
    },
    purpose: "다이소",
  },
  {
    ihistory: 24,
    date: "2024-08-27",
    amount: 50000,
    category: {
      createdAt: null,
      icategory: 5,
      category: "수입",
    },
    purpose: "장려금",
  },
  {
    ihistory: 10,
    date: "2024-08-26",
    amount: 15700,
    category: {
      createdAt: null,
      icategory: 3,
      category: "공과금",
    },
    purpose: "휴대폰 요금",
  },
  {
    ihistory: 18,
    date: "2024-08-26",
    amount: 10000,
    category: {
      createdAt: null,
      icategory: 4,
      category: "기타",
    },
    purpose: "화분",
  },
  {
    ihistory: 19,
    date: "2024-08-26",
    amount: 120000,
    category: {
      createdAt: null,
      icategory: 2,
      category: "교통비",
    },
    purpose: "비행기",
  },
  {
    ihistory: 20,
    date: "2024-08-26",
    amount: 23000,
    category: {
      createdAt: null,
      icategory: 4,
      category: "기타",
    },
    purpose: "선풍기 구매",
  },
  {
    ihistory: 21,
    date: "2024-08-26",
    amount: 2000,
    category: {
      createdAt: null,
      icategory: 4,
      category: "기타",
    },
    purpose: "문구",
  },
  {
    ihistory: 23,
    date: "2024-08-26",
    amount: 3500,
    category: {
      createdAt: null,
      icategory: 1,
      category: "식비",
    },
    purpose: "라면",
  },
  {
    ihistory: 14,
    date: "2024-08-25",
    amount: 97000,
    category: {
      createdAt: null,
      icategory: 4,
      category: "기타",
    },
    purpose: "키보드",
  },
  {
    ihistory: 15,
    date: "2024-08-25",
    amount: 20000,
    category: {
      createdAt: null,
      icategory: 4,
      category: "기타",
    },
    purpose: "마우스",
  },
  {
    ihistory: 16,
    date: "2024-08-25",
    amount: 6800,
    category: {
      createdAt: null,
      icategory: 1,
      category: "식비",
    },
    purpose: "저녁",
  },
  {
    ihistory: 1,
    date: "2024-08-25",
    amount: 21000,
    category: {
      createdAt: null,
      icategory: 1,
      category: "식비",
    },
    purpose: "치킨",
  },
  {
    ihistory: 6,
    date: "2024-08-23",
    amount: 21300,
    category: {
      createdAt: null,
      icategory: 2,
      category: "교통비",
    },
    purpose: "기차표",
  },
  {
    ihistory: 5,
    date: "2024-08-20",
    amount: 8000,
    category: {
      createdAt: null,
      icategory: 1,
      category: "식비",
    },
    purpose: "점심",
  },
  {
    ihistory: 9,
    date: "2024-08-14",
    amount: 5500,
    category: {
      createdAt: null,
      icategory: 2,
      category: "교통비",
    },
    purpose: "택시비",
  },
  {
    ihistory: 22,
    date: "2024-08-14",
    amount: 3000,
    category: {
      createdAt: null,
      icategory: 4,
      category: "기타",
    },
    purpose: "다이소",
  },
];

const categoryDummy = [
  {
    createdAt: null,
    icategory: 1,
    category: "식비",
  },
  {
    createdAt: null,
    icategory: 2,
    category: "교통비",
  },
  {
    createdAt: null,
    icategory: 3,
    category: "공과금",
  },
  {
    createdAt: null,
    icategory: 4,
    category: "기타",
  },
  {
    createdAt: null,
    icategory: 5,
    category: "수입",
  },
];

export { monthlyDummy, weeklyDummy, historyDummy, categoryDummy };
