# 🌤️ CloudVibes - Best Weather Forecast

A modern, responsive weather application built with Next.js 15, TypeScript, and Tailwind CSS. CloudVibes provides accurate weather forecasts, real-time conditions, and interactive weather data to help you plan your day.

## ✨ Features

### Core Features
- **Real-time Weather Data** - Current temperature, conditions, and feels-like temperature
- **Detailed Weather Metrics** - Humidity, wind speed/direction, pressure, visibility, UV index
- **7-Day Forecast** - Extended weather outlook with detailed daily forecasts
- **Hourly Forecasts** - Detailed hourly weather for better planning
- **Location Services** - GPS auto-detection and global city search
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)

### Technical Features
- **Modern Stack** - Built with Next.js 15, TypeScript, and Tailwind CSS
- **Performance Optimized** - Server-side rendering, static generation, and optimized bundles
- **Multiple Weather APIs** - Supports OpenWeatherMap and Open-Meteo APIs
- **Smart Caching** - Intelligent data caching with React Query
- **Error Handling** - Robust error handling and fallback mechanisms
- **Accessibility** - WCAG compliant design with proper ARIA labels
- **CI/CD Pipeline** - Automated deployment with GitHub Actions and K3s
- **SSL Security** - Let's Encrypt certificates with automatic renewal

### Planned Features (Coming Soon)
- **Weather Maps** - Interactive radar and satellite maps
- **Weather Alerts** - Real-time weather warnings and notifications
- **Air Quality Data** - Air pollution index and recommendations
- **Weather Widgets** - Embeddable weather widgets
- **Historical Data** - Weather trends and historical comparisons

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, React 18, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion |
| **State Management** | Zustand, React Query |
| **APIs** | OpenWeatherMap, Open-Meteo |
| **Build Tools** | Turbopack, ESLint, PostCSS |
| **Deployment** | Docker, Kubernetes, Vercel |
| **Monetization** | Google AdSense |
| **Compliance** | Privacy Policy, COPPA |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenWeatherMap API key (optional - falls back to Open-Meteo)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cloudvibes.git
   cd cloudvibes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   # Optional: OpenWeatherMap API key for enhanced features
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_api_key
   
   # App configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=CloudVibes
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 API Keys Setup

### OpenWeatherMap (Recommended)
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key (1000 calls/day)
3. Add to `.env.local` as `NEXT_PUBLIC_OPENWEATHER_API_KEY`

**Benefits:**
- Location search functionality
- Weather alerts
- More detailed forecast data
- Higher accuracy

### Open-Meteo (Fallback)
- No API key required
- Unlimited free usage for non-commercial use
- Automatically used when OpenWeatherMap key is not provided

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx          # Home page component
│   └── viewport.ts       # Viewport configuration
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── header.tsx    # Main header with search
│   │   └── search-bar.tsx # Location search component
│   ├── ui/               # UI components
│   │   ├── loading-spinner.tsx
│   │   └── weather-icon.tsx
│   ├── weather/          # Weather-specific components
│   │   ├── current-weather.tsx
│   │   └── forecast.tsx
│   └── providers.tsx     # React Query provider
├── lib/                  # Utility libraries
│   ├── api/             # API integration
│   │   └── weather.ts   # Weather API service
│   ├── hooks/           # Custom React hooks
│   │   └── use-weather.ts
│   ├── store/           # State management
│   │   └── weather-store.ts
│   ├── types/           # TypeScript definitions
│   │   ├── api.ts       # API response types
│   │   └── weather.ts   # Weather data types
│   └── utils/           # Utility functions
│       └── index.ts     # Helper functions
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript without emitting files
```

### Code Quality

The project includes:
- **TypeScript** - Full type safety
- **ESLint** - Code linting with Next.js rules
- **Tailwind CSS** - Utility-first styling
- **Prettier** - Code formatting (via ESLint)

### Architecture Decisions

**State Management:**
- **Zustand** - Lightweight state management for weather data and user preferences
- **React Query** - Server state management with caching and background updates
- **Local Storage** - Persistence for user settings and saved locations

**API Strategy:**
- **Primary:** OpenWeatherMap for comprehensive weather data
- **Fallback:** Open-Meteo for reliable free access
- **Caching:** 5-minute stale time, 10-minute garbage collection
- **Error Handling:** Graceful fallbacks and user-friendly messages

**Performance:**
- **Next.js 15** with Turbopack for fast development and builds
- **Server Components** where possible to reduce client-side JavaScript
- **Optimized Images** with Next.js Image component
- **Code Splitting** automatic with Next.js

## 🌍 Deployment

### Vercel (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**
2. **Connect to Vercel**
   - Import your repository
   - Configure environment variables
   - Deploy automatically

3. **Environment Variables**
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   NEXT_PUBLIC_APP_NAME=CloudVibes
   ```

### Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the .next folder
```

**Docker:**
```bash
# Build the Docker image
docker build -t cloudvibes:latest .

# Run the container
docker run -p 3000:3000 cloudvibes:latest
```

**Kubernetes (with Minikube):**
```bash
# Start Minikube
minikube start --driver=docker

# Build image in Minikube context
minikube docker-env
eval $(minikube -p minikube docker-env)
docker build -t cloudvibes:latest .

# Deploy to Kubernetes
kubectl apply -f k8s/deployment.yaml

# Get service URL
minikube service cloudvibes-service --url
```

## 🎨 Customization

### Theming
- Colors defined in `tailwind.config.js`
- Dark mode support ready (add toggle component)
- Consistent design system with Tailwind utilities

### Adding Weather Providers
1. Create new API service in `src/lib/api/`
2. Implement the `WeatherAPI` interface
3. Add to the weather service with fallback logic

### Custom Components
- Follow the existing component structure
- Use TypeScript for type safety
- Implement responsive design with Tailwind

## 💰 Monetization

### Google AdSense Integration
The app is configured with Google AdSense for monetization:

1. **AdSense Script** - Automatically loaded in the app layout
2. **Privacy Policy** - Required by Google Publisher Policies at `/privacy`
3. **Footer Compliance** - Includes required privacy and data usage links
4. **COPPA Compliance** - Children's privacy protection implemented

**AdSense Configuration:**
- Client ID: `ca-pub-1091636822057337` (configured in layout)
- Privacy policy accessible at `/privacy` route
- Compliant with Google Publisher Policies
- Ready for ad placement once AdSense approval is received

**Adding Ad Units:**
```jsx
// Example ad unit placement
<ins className="adsbygoogle"
     style={{display: 'block'}}
     data-ad-client="ca-pub-1091636822057337"
     data-ad-slot="your-ad-slot-id"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

## 📱 Browser Support

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile:** iOS Safari 14+, Chrome Mobile 90+
- **Features:** Geolocation API, Fetch API, ES2020 features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Weather Data:** OpenWeatherMap and Open-Meteo
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Framework:** Next.js Team
- **Styling:** Tailwind CSS

## 📞 Support

- **Documentation:** Check this README and inline code comments
- **Issues:** Create an issue on GitHub
- **Discussions:** Use GitHub Discussions for questions

---

Built with ❤️ for the weather enthusiasts around the world.# AKS deployment ready - Fri Aug 29 18:30:56 +04 2025
