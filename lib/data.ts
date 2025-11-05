// Product data for Captain Shop
export interface Product {
  id: string
  name: string
  nameEn?: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  description: string
  division: string
  district: string
  category: string
  discount: number
}

export interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  text: string
  date: string
  replies: Reply[]
}

export interface Reply {
  id: string
  userName: string
  text: string
  date: string
}

// Bangladesh divisions and districts
export const divisionsData = [
  {
    name: "দোকান অর্ডার",
    nameEn: "Dhaka",
    slug: "dhaka",
    districts: [ ],
  },
  {
    name: "প্রোডাক্ট সার্ভিস",
    nameEn: "Chattogram",
    slug: "chattogram",
    districts: [],
  },
  {
    name: "পরিবহন সার্ভিস",
    nameEn: "Rajshahi",
    slug: "rajshahi",
    districts: [],
  },
  {
    name: "সুপারশপ",
    nameEn: "Khulna",
    slug: "khulna",
    districts: [],
  },
  {
    name: "ফার্মেসী সার্ভিস",
    nameEn: "Barishal",
    slug: "barishal",
    districts: [],
  },
  {
    name: "হোটেল এন্ড রেস্টুরেন্ট",
    nameEn: "Sylhet",
    slug: "sylhet",
    districts: [],
  },
  {
    name: "বিউটি পার্লার এন্ড হেয়ার স্টাইল সেলুন",
    nameEn: "Rangpur",
    slug: "rangpur",
    districts: [],
  },
  {
    name: "থানার নাম ও মোবাইল",
    nameEn: "Mymensingh",
    slug: "mymensingh",
    districts: [],
  },
]

// Sample products data
export const productsData: Product[] = [
  // দোকান অর্ডার
  {
    id: "1",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-premium-t-shirt-navy.jpg",
    rating: 4.5,
    reviews: 128,
    description: "উচ্চমানের কটন থেকে তৈরি comfortable এবং টেকসই প্রিমিয়াম টি-শার্ট",
    division: "দোকান অর্ডার",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  {
    id: "2",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-t-shirt-orange.jpg",
    rating: 4.3,
    reviews: 95,
    description: "সফট এবং breathable ফেব্রিক সহ দীর্ঘস্থায়ী টি-শার্ট",
    division: "দোকান অর্ডার",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  {
    id: "3",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-t-shirt-white.jpg",
    rating: 4.6,
    reviews: 156,
    description: "ক্লাসিক ডিজাইন এবং নিখুঁত ফিটিং সহ প্রিমিয়াম টি-শার্ট",
    division: "দোকান অর্ডার",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  // প্রোডাক্ট সার্ভিস
  {
    id: "4",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-premium-tshirt.jpg",
    rating: 4.4,
    reviews: 112,
    description: "প্রাকৃতিক রঙ এবং আরামদায়ক ফেব্রিক",
    division: "প্রোডাক্ট সার্ভিস",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  {
    id: "5",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-tshirt-quality.jpg",
    rating: 4.2,
    reviews: 87,
    description: "দীর্ঘস্থায়ী এবং সহজ রক্ষণাবেক্ষণযোগ্য",
    division: "প্রোডাক্ট সার্ভিস",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  // Additional products for other divisions
  {
    id: "6",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-apparel.jpg",
    rating: 4.7,
    reviews: 203,
    description: "সর্বোত্তম মানের কাপড় এবং নির্ভুল কারুকাজ",
    division: "পরিবহন সার্ভিস",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  {
    id: "6",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-apparel.jpg",
    rating: 4.7,
    reviews: 203,
    description: "সর্বোত্তম মানের কাপড় এবং নির্ভুল কারুকাজ",
    division: "পরিবহন সার্ভিস",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  {
    id: "7",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-shirt.jpg",
    rating: 4.1,
    reviews: 76,
    description: "স্টাইলিশ এবং আরামদায়ক প্রতিদিনের পরিধান",
    division: "সুপারশপ",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  {
    id: "8",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-casual-shirt.jpg",
    rating: 4.5,
    reviews: 134,
    description: "প্রিমিয়াম কোয়ালিটি এবং ট্রেন্ডি ডিজাইন",
    division: "ফার্মেসী সার্ভিস",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  {
    id: "9",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-modern-shirt.jpg",
    rating: 4.3,
    reviews: 98,
    description: "আধুনিক ডিজাইন এবং আরামদায়ক ফিটিং",
    division: "হোটেল এন্ড রেস্টুরেন্ট",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  {
    id: "10",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-fabric.jpg",
    rating: 4.6,
    reviews: 167,
    description: "সূক্ষ্ম ফেব্রিক এবং নিখুঁত সেলাই",
    division: "বিউটি পার্লার এন্ড হেয়ার স্টাইল সেলুন",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
  {
    id: "11",
    name: "Captain প্রিমিয়াম টি-শার্ট",
    nameEn: "Captain Premium T-Shirt",
    price: 80,
    originalPrice: 100,
    image: "/captain-wear.jpg",
    rating: 4.4,
    reviews: 121,
    description: "প্রতিটি ঋতুর জন্য উপযুক্ত",
    division: "থানার নাম ও মোবাইল",
    district: "",
    category: "পোশাক",
    discount: 20,
  },
]

export const reviewsData: Review[] = [
  {
    id: "1",
    productId: "1",
    userName: "আহমেদ করিম",
    rating: 5,
    text: "অসাধারণ পণ্য! দারুণ কোয়ালিটি এবং দ্রুত ডেলিভারি। সবাইকে সুপারিশ করছি।",
    date: "2024-11-01",
    replies: [
      {
        id: "r1",
        userName: "Captain Shop",
        text: "আপনার মতামতের জন্য ধন্যবাদ। আবার অর্ডার করুন।",
        date: "2024-11-02",
      },
    ],
  },
  {
    id: "2",
    productId: "1",
    userName: "ফাতিমা বেগম",
    rating: 4,
    text: "খুবই ভালো পণ্য। ফিটিং একেবারে পারফেক্ট।",
    date: "2024-10-28",
    replies: [],
  },
]
