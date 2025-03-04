# Project Documentation

This documentation provides an overview of the project’s setup and API integration details.

## Project Setup Guide

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

   Create a `.env.local` file in the web directory and add your Coingecko API Key in this format:

   ```
   NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
   ```

4. **Run the Applications**

   - **Web App:**

     ```bash
     npm run dev
     ```

     This will start the Next.js development server at [http://localhost:3000](http://localhost:3000).

## API Integration Details

The project uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency market data. Data is fetched via Axios and managed using React Query. A demo API key from coingecko is required to run the application.
