import CardDetector from "@/components/CardDetector";
import { CreditCard } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <div className="container max-w-3xl mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <CreditCard className="w-4 h-4" />
            Card Detection Tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Debit Card
            <span className="block text-primary">Detector</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Enter any card number to instantly detect the brand, validate with Luhn algorithm, and see a live preview.
          </p>
        </div>

        <CardDetector />
      </div>
    </div>
  );
};

export default Index;
