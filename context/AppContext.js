import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  user: 'ss_user',
  bookings: 'ss_bookings',
  chats: 'ss_chats',
  notifications: 'ss_notifications',
  reviews: 'ss_reviews',
};

const defaultUser = {
  id: 'me',
  name: 'You',
  bio: 'Passionate learner and sharer.',
  skillsOffered: ['Guitar', 'React'],
  skillsWanted: ['Spanish', 'Design'],
  avatar: null,
};

export const mockSkills = [
  {
    id: '1',
    user: 'Sneha Sharma',
    avatar: null,
    skill: 'Guitar Lessons',
    description: 'Learn acoustic guitar from basics to intermediate level. 5+ years experience.',
    rating: 4.8,
    location: 'Delhi',
    category: 'Music',
    price: '₹500/hour',
  },
  {
    id: '2',
    user: 'Priyanshu Kumar',
    avatar: null,
    skill: 'Web Design Help',
    description: 'Professional web designer offering portfolio reviews and design tips.',
    rating: 4.5,
    location: 'Meerut',
    category: 'Design',
    price: '₹800/hour',
  },
  {
    id: '3',
    user: 'Arun Patel',
    avatar: null,
    skill: 'Spanish Conversation',
    description: 'Native Spanish speaker for conversational practice and grammar help.',
    rating: 4.7,
    location: 'Remote',
    category: 'Language',
    price: '₹600/hour',
  },
  {
    id: '4',
    user: 'Maya Singh',
    avatar: null,
    skill: 'Yoga & Meditation',
    description: 'Certified yoga instructor with 8 years experience. All levels welcome.',
    rating: 4.9,
    location: 'Mumbai',
    category: 'Fitness',
    price: '₹400/session',
  },
  {
    id: '5',
    user: 'Rahul Gupta',
    avatar: null,
    skill: 'Python Programming',
    description: 'Software engineer teaching Python from basics to advanced concepts.',
    rating: 4.6,
    location: 'Bangalore',
    category: 'Technology',
    price: '₹1000/hour',
  },
  {
    id: '6',
    user: 'Anita Verma',
    avatar: null,
    skill: 'Digital Marketing',
    description: 'Marketing expert helping with social media strategy and SEO basics.',
    rating: 4.4,
    location: 'Pune',
    category: 'Business',
    price: '₹750/hour',
  },
  {
    id: '7',
    user: 'Vikash Yadav',
    avatar: null,
    skill: 'Photography',
    description: 'Professional photographer teaching composition and editing techniques.',
    rating: 4.7,
    location: 'Jaipur',
    category: 'Arts',
    price: '₹650/hour',
  },
  {
    id: '8',
    user: 'Priya Joshi',
    avatar: null,
    skill: 'French Language',
    description: 'French tutor with DELF certification. Beginner to intermediate levels.',
    rating: 4.8,
    location: 'Remote',
    category: 'Language',
    price: '₹700/hour',
  },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [bookings, setBookings] = useState([]);
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 'n1', type: 'booking', text: 'Booking confirmed with Sneha', read: false },
  ]);
  const [reviews, setReviews] = useState({}); // key: skillId, value: array of {rating, text}

  useEffect(() => {
    (async () => {
      try {
        const [u, b, c, n, r] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.user),
          AsyncStorage.getItem(STORAGE_KEYS.bookings),
          AsyncStorage.getItem(STORAGE_KEYS.chats),
          AsyncStorage.getItem(STORAGE_KEYS.notifications),
          AsyncStorage.getItem(STORAGE_KEYS.reviews),
        ]);
        if (u) setUser(JSON.parse(u));
        if (b) setBookings(JSON.parse(b));
        if (c) setChats(JSON.parse(c));
        if (n) setNotifications(JSON.parse(n));
        if (r) setReviews(JSON.parse(r));
      } catch (e) {
        // noop
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
  }, [bookings]);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.chats, JSON.stringify(chats));
  }, [chats]);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(reviews));
  }, [reviews]);

  const auth = useMemo(() => ({
    login: (email) => {
      setUser((prev) => ({ ...prev, email }));
    },
    logout: () => {
      setUser(defaultUser);
    },
    signup: (data) => setUser({ ...defaultUser, ...data }),
  }), []);

  const skills = useMemo(() => ({ list: mockSkills }), []);

  const bookingApi = useMemo(() => ({
    book: ({ skillId, date, time }) => {
      const booking = { id: Date.now().toString(), skillId, date, time, status: 'confirmed' };
      setBookings((prev) => [...prev, booking]);
      setNotifications((prev) => [
        { id: 'n' + Date.now(), type: 'booking', text: 'Booking confirmed', read: false },
        ...prev,
      ]);
      const skill = mockSkills.find((s) => s.id === skillId);
      if (skill) {
        setChats((prev) => {
          if (prev.find((c) => c.skillId === skillId)) return prev;
          return [
            { id: 'c' + Date.now(), skillId, title: skill.skill, messages: [] },
            ...prev,
          ];
        });
      }
    },
  }), []);

  const chatApi = useMemo(() => ({
    sendMessage: ({ skillId, text }) => {
      setChats((prev) => prev.map((c) => c.skillId === skillId ? {
        ...c,
        messages: [...c.messages, { id: 'm' + Date.now(), text, mine: true, ts: new Date().toISOString() }],
      } : c));
    },
  }), []);

  const reviewApi = useMemo(() => ({
    addReview: ({ skillId, rating, text }) => {
      setReviews((prev) => {
        const arr = prev[skillId] || [];
        return { ...prev, [skillId]: [...arr, { rating, text }] };
      });
    },
    getAverage: (skillId) => {
      const arr = reviews[skillId] || [];
      if (!arr.length) return null;
      const sum = arr.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
      return Math.round((sum / arr.length) * 10) / 10;
    },
  }), [reviews]);

  const value = useMemo(() => ({
    user, setUser,
    skills,
    bookings, setBookings,
    chats, setChats,
    notifications, setNotifications,
    reviews,
    auth,
    bookingApi,
    chatApi,
    reviewApi,
  }), [user, skills, bookings, chats, notifications, reviews, auth, bookingApi, chatApi, reviewApi]);

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}


