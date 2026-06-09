"use client";

import { ChildrenProps } from "@/types/ChildrenProps";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const StripeProvider = ({ children }: ChildrenProps) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
      .then((instance) => {
        if (!cancelled && instance) setStripe(instance);
        if (!cancelled && !instance) setLoadError(true);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // If Stripe failed to load (ad blocker, network issue), render fallback content
  if (loadError) {
    return <>{children}</>;
  }

  // While loading, render children without Stripe context
  if (!stripe) {
    return <>{children}</>;
  }

  return <Elements stripe={stripe}>{children}</Elements>;
};

export default StripeProvider;
