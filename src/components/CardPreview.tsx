import { CardInfo } from "@/lib/cardDetector";
import { Wifi } from "lucide-react";

interface CardPreviewProps {
  cardInfo: CardInfo;
  number: string;
}

const brandGradients: Record<string, string> = {
  visa: "from-[hsl(220,90%,30%)] to-[hsl(220,90%,50%)]",
  mastercard: "from-[hsl(16,80%,30%)] to-[hsl(40,100%,50%)]",
  amex: "from-[hsl(210,40%,30%)] to-[hsl(210,60%,50%)]",
  discover: "from-[hsl(25,80%,30%)] to-[hsl(25,100%,55%)]",
  diners: "from-[hsl(200,50%,30%)] to-[hsl(200,60%,50%)]",
  jcb: "from-[hsl(140,50%,25%)] to-[hsl(200,60%,45%)]",
  unionpay: "from-[hsl(0,70%,35%)] to-[hsl(210,80%,45%)]",
  maestro: "from-[hsl(210,50%,25%)] to-[hsl(0,70%,45%)]",
  unknown: "from-secondary to-muted",
};

const brandLogos: Record<string, string> = {
  visa: "VISA",
  mastercard: "MC",
  amex: "AMEX",
  discover: "DISCOVER",
  diners: "DINERS",
  jcb: "JCB",
  unionpay: "UP",
  maestro: "MAESTRO",
  unknown: "",
};

export default function CardPreview({ cardInfo, number }: CardPreviewProps) {
  const digits = number.replace(/\D/g, "");
  const display = cardInfo.formatted || "•••• •••• •••• ••••";
  const gradient = brandGradients[cardInfo.brand] || brandGradients.unknown;

  return (
    <div className="perspective-[1000px] w-full max-w-[420px] mx-auto">
      <div
        className={`relative w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br ${gradient} p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 shadow-2xl`}
      >
        {/* Shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-transparent to-transparent pointer-events-none" />

        {/* Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />

        {/* Top row */}
        <div className="relative flex justify-between items-start">
          <div className="w-10 h-7 rounded bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-90" />
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-foreground/60 rotate-90" />
            {cardInfo.brand !== "unknown" && (
              <span className="font-mono text-sm font-bold text-foreground/90 tracking-wider">
                {brandLogos[cardInfo.brand]}
              </span>
            )}
          </div>
        </div>

        {/* Card number */}
        <div className="relative">
          <p className="font-mono text-lg sm:text-xl tracking-[0.2em] text-foreground/90 transition-all duration-300">
            {digits.length === 0 ? "•••• •••• •••• ••••" : display}
          </p>
        </div>

        {/* Bottom row */}
        <div className="relative flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase text-foreground/40 tracking-wider mb-0.5">Card Holder</p>
            <p className="font-mono text-xs text-foreground/70 tracking-wider">YOUR NAME</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase text-foreground/40 tracking-wider mb-0.5">Expires</p>
            <p className="font-mono text-xs text-foreground/70">MM/YY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
