import { HeroSection } from '@/components/features/HeroSection';
import { PredictionForm } from '@/components/features/PredictionForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <HeroSection />
      
      {/* Main Prediction Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <PredictionForm />
        </div>
      </section>
    </div>
  );
}
