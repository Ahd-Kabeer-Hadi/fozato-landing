"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserCurrency, formatPrice, type Currency } from "@/lib/utils/currency";

const plans = [
  {
    name: "Basic",
    description: "Perfect for getting started",
    priceUSD: 19,
    priceINR: 799,
    features: [
      "1 YouTube Channel",
      "1 User",
      "20 AI SEO Credits",
      "Basic Analytics",
    ],
  },
  {
    name: "Creator",
    description: "Best for growing channels",
    priceUSD: 39,
    priceINR: 1799,
    features: [
      "3 YouTube Channels",
      "3 Users",
      "60 AI SEO Credits",
      "Advanced Analytics",
      "Priority Support",
    ],
  },
  {
    name: "Premium",
    description: "For professional creators",
    priceUSD: 99,
    priceINR: 2999,
    features: [
      "Unlimited YouTube Channels",
      "50 Users",
      "400 AI SEO Credits",
      "Premium Analytics",
      "24/7 Priority Support",
      "Custom Branding",
    ],
  },
];

export function PricingSection() {
  const [currency, setCurrency] = useState<Currency | null>(null);

  useEffect(() => {
    getUserCurrency().then(setCurrency);
  }, []);

  if (!currency) return null;

  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Flexible Plans for Every YouTube Creator
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const price = currency.code === "INR" ? plan.priceINR : plan.priceUSD;
            return (
              <Card key={plan.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{formatPrice(price, currency)}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose {plan.name}</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}