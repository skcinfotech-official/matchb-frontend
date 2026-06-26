// components/dashboard/QuickActions.tsx
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface QuickActionsProps {
  onViewPlans: () => void;
}

export default function QuickActions({ onViewPlans }: QuickActionsProps) {
  return (
    <Button onClick={onViewPlans} className="w-full bg-rose-600 hover:bg-rose-700 text-white">
      <CreditCard className="h-4 w-4 mr-2" />
      View Plans
    </Button>
  );
}
