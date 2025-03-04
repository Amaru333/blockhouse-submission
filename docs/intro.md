---
id: project-documentation
title: Project Documentation
sidebar_label: Project Documentation
---

# Project Documentation

This documentation provides an overview of the project’s setup, API integration details, state management strategy, and the challenges encountered during development along with their solutions.

## 1. Project Setup Guide

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **Yarn**

### Repository Structure

The project is organized into separate folders for the web and mobile applications. The web application is built with Next.js, and the mobile app uses React Native.

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Amaru333/blockhouse-submission.git
   cd blockhouse-submission
   ```

2. **Install Dependencies**

   For the **web app**:

   ```bash
   cd web-app
   npm install
   # or using yarn: yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the web directory and add your Coingecko API Key. For example:

   ```
   NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
   ```

4. **Run the Applications**

   - **Web App:**

     ```bash
     npm run dev
     ```

     This will start the Next.js development server at [http://localhost:3000](http://localhost:3000).

## 2. API Integration Details

The project uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency market data. Data is fetched via Axios and managed using React Query.

### Data Fetching Flow

- **API Function:**  
  The function `fetchAssets` (located in `functions.ts`) makes an HTTP GET request to the CoinGecko API:

  ```js
  import axios from "axios";
  import { Asset } from "./types";

  export async function fetchAssets(): Promise<Asset[]> {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,monero,chainlink,solana",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
        },
      }
    );
    return response.data;
  }
  ```

- **React Query Integration:**  
  In your `HomePage` component, the data is fetched using the `useQuery` hook:

  ```jsx
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchAssets,
  });
  ```

  This approach ensures that:

  - Data is cached and automatically refreshed.
  - Loading and error states are managed effectively.
  - The UI remains responsive as new data arrives.

## 3. State Management Explanation

The project employs a combination of **React Query** and the **Context API**:

- **React Query:**

  - **Why:** It simplifies asynchronous data fetching and caching, provides features like background data refetching, and handles loading/error states.
  - **Usage:** The `useQuery` hook is used in the main components to manage the API data, ensuring the UI is always up to date.

- **Context API:**
  - **Why:** It offers a lightweight solution for sharing global state, such as the current theme (light or dark mode), across components.
  - **Usage:** A custom hook (e.g., `useTheme`) leverages React’s Context API to manage and toggle themes without resorting to prop drilling.

Additionally, a custom hook (`useShortcut`) is used to set up keyboard shortcuts, with logic to detect the operating system (via `getOS`) so that the UI correctly displays keys (e.g., "META" on macOS vs. "CTRL" on Windows).

## 4. Challenges & Solutions

### Cross-Platform Keyboard Shortcuts

- **Challenge:**  
  Ensuring that keyboard shortcuts work seamlessly across different operating systems.
- **Solution:**  
  A helper function (`getOS`) detects the current OS and adjusts the displayed keys accordingly. For instance, the Command key (⌘) is shown on macOS:
  ```js
  const ctrlButtonText = getOS() === "MacOS" ? "\u2318" : "Ctrl";
  ```
  This logic guarantees that shortcuts such as "⌘ K" for focusing the search field are displayed correctly.

### Data Fetching and Caching

- **Challenge:**  
  Efficiently managing frequent API calls while keeping the UI responsive.
- **Solution:**  
  React Query was integrated to manage data fetching, caching, and automatic refetching. This minimizes redundant API calls and improves the overall user experience.

### Responsive Design

- **Challenge:**  
  Creating a UI that works well on both web and mobile platforms.
- **Solution:**  
  Tailwind CSS is used for responsive design. Components are conditionally rendered based on screen size (e.g., different layouts for mobile vs. desktop).

### Error Handling & User Feedback

- **Challenge:**  
  Managing errors from API calls and providing clear feedback to users.
- **Solution:**  
  Toast notifications (using the Sonner library) are implemented to inform users when data is successfully refetched or when an error occurs.

### API Rate Limits and Security

- **Challenge:**  
  Protecting sensitive API keys and managing rate limits.
- **Solution:**  
  API keys are stored securely in environment variables, and the API integration is optimized to reduce unnecessary calls.
