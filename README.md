# RSU Portfolio Tracker

A comprehensive React application for tracking Restricted Stock Unit (RSU) equity compensation. Built for tech employees at FAANG+ companies to manage and analyze their stock grants with real-time market data integration.

Built with React + TypeScript + Vite for optimal development.

## 🚀 Features

### Core Features
- **RSU Grant Management**: Add, edit, and delete stock grants with detailed information
- **Real-time Portfolio Dashboard**: Live portfolio value with gains/losses tracking
- **Vesting Timeline**: Track upcoming vests and vesting schedules
- **Company Breakdown**: Visual representation of portfolio composition

### Advanced Features
- **Tax Estimation**: Federal withholding and total tax burden calculations
- **Diversification Metrics**: Company concentration risk analysis
- **Analytics Dashboard**: Performance charts and insights
- **Dark/Light Mode**: Toggle between themes for better user experience

## 🛠 Technology Stack

- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **API Integration**: Alpha Vantage API for real-time stock prices
- **Chart** chart.js
- **Notifications**: React Toastify
- **Icons**: Lucide React

## 📊 Financial Calculations

### Tax Estimations
- **Federal Withholding**: 22% of vested value (supplemental income rate)
- **Estimated Total Tax**: 35% of vested value (approximate total burden)
- **Net Proceeds**: Vested value minus estimated taxes

### Portfolio Metrics
- **Total Portfolio Value**: Sum of all shares × current prices
- **Gain/Loss Calculation**: (Current Value - Grant Value) / Grant Value × 100
- **Company Concentration**: Individual company value / total portfolio × 100

### Risk Assessment
- **Low Risk**: < 40% concentration in any single company
- **Medium Risk**: 40-70% concentration
- **High Risk**: > 70% concentration



## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with ES6+ support

### Installation

npm install

npm run dev

