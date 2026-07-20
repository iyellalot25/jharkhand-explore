# 🌍 **Smart Digital Platform for Eco & Cultural Tourism in Jharkhand**

### *A Smart India Hackathon (SIH 2025) Internal Hackathon Project*

---

## 📌 **Overview**

This project was built as part of the **Internal Hackathon for Smart India Hackathon (SIH 2025)** at VIT-AP University.
Our team developed a **web-based tourism platform** that promotes Jharkhand’s eco-tourism, tribal culture, festivals, local experiences, and destinations — using modern AI and interactive technologies.

The goal is to create a **centralized, smart, and inclusive tourism ecosystem** that benefits both travelers and local communities.

---

## 🚀 **Features**

### 🤖 **AI-Powered Modules**

* **Multilingual AI Chatbot (Gemini API)**

  * Answers Jharkhand tourism–related queries in real time
* **AI-Based Itinerary Planner**

  * Generates personalized travel plans based on user preferences

### 🏞️ **Destination & Map System**

* **Destination Explorer**

  * Displays destinations from Supabase (with category, description, best time to visit)
* **Interactive Map (Leaflet.js)**

  * Highlights destinations, nearby attractions, and trekking routes

### 🎉 **Cultural & Festival Insights**

* **Festival Calendar**

  * Shows upcoming festivals + complete cultural events list

### 🛍️ **Local Marketplace (MVP Mockup)**

Amazon-like interface for:

* Local handicrafts
* Homestays
* Cultural experiences

### 🧭 **Local Services (MVP Mockup)**

Connect with verified:

* Local guides
* Cab services
* Hospitality providers

### 🚌 **Transport Booking (MVP Mockup)**

* Search routes
* Book tickets
* Save bookings (local storage persistence in MVP)

### 🔐 **Admin Portal**

* Manage destinations, festivals, guides, marketplace items & logistics
* Secure admin login

---

## 🏗️ **Tech Stack**

### **Frontend**

* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion

### **Backend / Database**

* Supabase

### **APIs & Integrations**

* Gemini API (AI Chatbot + Itinerary Planner)
* Leaflet.js (Maps & Trekking Routes)

---

## 🧩 **System Architecture**

```
User → Web App → (Chatbot / Itinerary / Destinations / Map / Festivals / Services)
                           ↓
                      Supabase DB
                           ↓
                     Admin Dashboard
```

---

## 🎯 **Purpose**

This platform is built to:

* Boost eco & cultural tourism in Jharkhand
* Empower local artisans, guides & tribal communities
* Provide tourists a seamless, AI-driven smart travel experience
* Modernize Jharkhand’s tourism infrastructure

---

## 🏆 **Hackathon Context**

This project was developed as part of the **Smart India Hackathon Internal Hackathon 2025** hosted by VIT-AP.
We were selected among the **top 45 teams out of 400+**, moving into the PPT screening round.

---

## 📂 **Folder Structure**

```
root/
│── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── utils/
│── public/
│── styles/
│── package.json
│── README.md
```

---

## 🛠️ **Setup Instructions**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Add Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
```

### 4️⃣ Run the Project

```bash
npm run dev
```

---

## 👨‍💻 Author

**Srijan Ghosh**

Aspiring Software Engineer focused on building production-ready full-stack applications with modern web technologies and AI-powered user experiences.

---
