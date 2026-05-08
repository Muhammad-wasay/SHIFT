# SHIFT | Cognitive Load Management System

Built for the **Proxion 2026 Hackathon**.

## Core Concept
SHIFT is a cognitive mediation layer designed to reduce digital friction and reclaim attention. It filters incoming noise and surfaces only what is essential for your current flow state.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 4 + Vanilla CSS
- **Animations**: Framer Motion
- **3D Visuals**: Three.js (React Three Fiber)
- **Icons**: Lucide React

## Architecture
- `/app`: Main application routes and global styles.
- `/components`: Modular UI components.
    - `ZenSphere.tsx`: 3D Pulsing load indicator.
    - `AmbientDashboard.tsx`: High-priority information display.
    - `WaitingRoom.tsx`: The AI-powered gatekeeper (The Bouncer).
    - `FocusMode.tsx`: Fullscreen "Breathe" state for cognitive reset.
    - `ShiftLogo.tsx`: Brand identity with anti-gravity animation.

## Calm Design Philosophy
- **Ultra-Minimalist**: Removing unnecessary UI elements.
- **Glassmorphism**: Soft, layered interface for depth without clutter.
- **Organic Transitions**: Smooth, physics-based animations using Framer Motion.
- **Ambient Feedback**: 3D visuals that pulse with your system state.

## Getting Started
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Access at `http://localhost:3000`
"# SHIFT" 
