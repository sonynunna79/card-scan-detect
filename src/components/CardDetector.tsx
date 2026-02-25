import { useState } from "react";
import { detectCard, type CardInfo } from "@/lib/cardDetector";
import CardPreview from "./CardPreview";
import { CheckCircle2, XCircle, CreditCard, Hash, Shield, Ruler } from "lucide-react";

export default function CardDetector() {
  const [number, setNumber] = useState("");
  const [cardInfo, setCardInfo] = useState<CardInfo>(detectCard(""));

  const handleChange = (val: string) => {
    // Only allow digits and spaces, max 23 chars (19 digits + 4 spaces)
    const clean = val.replace(/[^\d\s]/g, "").slice(0, 23);
    setNumber(clean);
    setCardInfo(detectCard(clean));
  };

  const digits = number.replace(/\D/g, "");

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-slide-up">
      {/* Card Preview */}
      <CardPreview cardInfo={cardInfo} number={number} />

      {/* Input */}
      <div className="glass rounded-xl p-6 space-y-4">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Enter card number
        </label>
        <div className="relative">
          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            value={cardInfo.formatted || number}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded-lg py-4 pl-12 pr-12 font-mono text-lg tracking-widest text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/50 transition-all"
          />
          {digits.length >= 12 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {cardInfo.valid ? (
                <CheckCircle2 className="w-5 h-5 text-accent" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Detection Results */}
      {digits.length > 0 && (
        <div className="glass rounded-xl p-6 animate-slide-up">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Detection Results
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoTile
              icon={<CreditCard className="w-4 h-4" />}
              label="Brand"
              value={cardInfo.brandName}
              accent={cardInfo.brand !== "unknown"}
            />
            <InfoTile
              icon={<Shield className="w-4 h-4" />}
              label="Valid (Luhn)"
              value={digits.length >= 12 ? (cardInfo.valid ? "Yes ✓" : "No ✗") : "—"}
              accent={cardInfo.valid}
            />
            <InfoTile
              icon={<Hash className="w-4 h-4" />}
              label="Digits"
              value={`${digits.length}`}
            />
            <InfoTile
              icon={<Ruler className="w-4 h-4" />}
              label="CVV Length"
              value={cardInfo.brand !== "unknown" ? `${cardInfo.cvvLength} digits` : "—"}
            />
          </div>
        </div>
      )}

      {/* Supported brands */}
      <div className="text-center space-y-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Supported Networks</p>
        <div className="flex flex-wrap justify-center gap-3">
          {["Visa", "Mastercard", "Amex", "Discover", "JCB", "UnionPay", "Maestro", "Diners"].map(
            (b) => (
              <span
                key={b}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-300 ${
                  cardInfo.brandName === b || (b === "Amex" && cardInfo.brandName === "American Express") || (b === "Diners" && cardInfo.brandName === "Diners Club")
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-secondary text-muted-foreground border border-border"
                }`}
              >
                {b}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <p className={`font-mono text-sm font-semibold ${accent ? "text-accent" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}
