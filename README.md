# Yevhenii Voronianskyi | Cybersecurity Portfolio

![Cybersecurity Portfolio](https://img.shields.io/badge/Security-Blue%20Team%20%7C%20Red%20Team-success?style=for-the-badge&color=00ff88)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A high-performance, interactive personal portfolio website designed with a cyberpunk aesthetic to showcase my skills, certifications, and achievements in the cybersecurity field. 

Currently a 3rd-year cadet at KNUIA (Kharkiv National University of Internal Affairs), specializing in penetration testing, DevOps, and digital forensics.

## ✨ Features

- **Profile statistics:** TryHackMe and Hack The Box public profile statistics and CryptoHack profile data are refreshed on the server, with a 15-minute revalidation interval. If a source is unavailable, a dated snapshot is shown instead. Training lists and other certificates remain curated records.
- **Interactive UI:** Smooth reveal animations, custom cursor interactions, and terminal emulations built with **Framer Motion**.
- **Cyberpunk Aesthetic:** Minimalist dark mode with glowing glassmorphism effects, neon accents, and a custom CSS radial background matrix.
- **Mobile First:** Fully responsive design adapting flawlessly to both desktop and mobile devices.
- **Performance Optimized:** Built on Next.js App Router with server-side revalidation on Vercel.

## Running locally

Install dependencies with `npm ci`, then start the development server with `npm run dev`. Use `npm run build` to verify the production build. Deploy as a Next.js application on Vercel; a static export cannot refresh these server-side statistics.

The site reads only public profile data and does not require account credentials. Hack The Box public activity and CryptoHack solved challenges are refreshed alongside profile statistics; the older curated Hack The Box lists remain as a separate archive. TryHackMe rooms and badges are fetched when its public profile API is accessible, with the curated archive shown if it is not. TryHackMe can block server requests with a security checkpoint, so verify availability from the deployment. CryptoHack's public HTML is parsed and may need maintenance if its markup changes. The HTB Academy, Cisco and CyLab lists are curated and do not automatically include newly completed items.

## 💻 Tech Stack

- **Framework:** React 19 + Next.js 16 (App Router)
- **Styling:** Tailwind CSS (v4) + Vanilla CSS Modules
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

## 🌐 Live Demo
[*(Link will be updated upon Vercel deployment)*]

## 📫 Connect
- **GitHub:** [kavein0](https://github.com/kavein0)
- **Telegram:** [@Ranelin](https://t.me/Ranelin)
- **Email:** bprooturbo@gmail.com
