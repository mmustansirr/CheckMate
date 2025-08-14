# CheckMate Frontend

A stunning, AI-powered fact-checking web application built with Next.js, featuring professional UI/UX with smooth animations and real-time news verification.

## 🚀 Features

- **Beautiful UI/UX**: Professional design with smooth animations using Framer Motion
- **Real-time Fact Checking**: Instant AI-powered news headline verification
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI
- **API Integration**: Seamless integration with FastAPI backend using TanStack Query
- **Form Validation**: Robust form handling with React Hook Form and Zod validation
- **Status Monitoring**: Real-time API health monitoring with visual indicators
- **Accessibility**: Built with accessibility best practices in mind

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd CheckMate/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- CheckMate backend API running (see backend README)

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components (Header, Footer)
│   └── ui/                # Reusable UI components (Shadcn)
├── contexts/              # React contexts (QueryProvider)
├── hooks/                 # Custom React hooks
├── lib/
│   └── api/              # API client and utilities
└── types/                # TypeScript type definitions
```

## 🎨 Key Components

### **HeroSection**
- Animated landing section with gradient backgrounds
- Feature highlights with smooth hover effects
- Responsive grid layout with statistics

### **PredictionForm**
- Real-time form validation with Zod schema
- Beautiful animations for form states
- Progress indicators and confidence scoring

### **StatusIndicator**
- Real-time API health monitoring
- Animated status badges
- Automatic reconnection handling

## 🌐 API Integration

The frontend communicates with the CheckMate FastAPI backend:

- **Endpoint**: `/predict` - Submit headlines for fact-checking
- **Health Check**: `/` - Monitor API availability
- **Error Handling**: Comprehensive error states with user-friendly messages

## 🎯 Features in Detail

### **Fact-Checking Flow**
1. User enters a news headline (min 3 words, max 500 characters)
2. Form validation ensures quality input
3. API call with loading states and animations
4. Results displayed with confidence scores and visual indicators
5. Error handling for offline/failed states

### **UI/UX Highlights**
- Smooth page transitions and micro-interactions
- Professional color scheme with gradient accents
- Responsive design that works on all devices
- Loading states with custom animations
- Toast notifications for user feedback

## 🚀 Deployment to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add CheckMate frontend"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - Deploy automatically on push to main branch

3. **Environment Variables for Production**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-api.com
   ```

## 🔧 Configuration

### **Environment Variables**
- `NEXT_PUBLIC_API_URL`: Backend API base URL (required)

### **Customization**
- Colors: Modify `tailwind.config.js` and CSS variables
- Animations: Adjust Framer Motion configurations in components
- API endpoints: Update `src/lib/api/client.ts`

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build and test production bundle
npm run build
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the CheckMate application for AI-powered fact-checking.

---

**Built with ❤️ for a better internet**
