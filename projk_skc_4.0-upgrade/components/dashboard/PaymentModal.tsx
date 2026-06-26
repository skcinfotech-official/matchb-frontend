import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, CreditCard, Copy, Check } from "lucide-react";
import { Plan } from "../../types/types";
import Image from "next/image";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: Plan | null;
  onPaymentComplete: () => void;
}

export default function PaymentModal({ open, onOpenChange, selectedPlan, onPaymentComplete }: PaymentModalProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center flex items-center justify-center">
            <CreditCard className="h-5 w-5 mr-2 text-rose-500" />
            Complete Payment
          </DialogTitle>
        </DialogHeader>
        {selectedPlan && (
          <div className="space-y-6">
            <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{selectedPlan.name}</h3>
                <Badge className="bg-rose-100 text-rose-700">{selectedPlan.type === "call" ? "Call Plan" : "Premium"}</Badge>
              </div>
              <p className="text-2xl font-bold text-rose-600">
                ₹{selectedPlan.price}
              </p>
              <p className="text-sm text-gray-600">
                {selectedPlan.type === "call"
                  ? `${selectedPlan.call_credits} call credits`
                  : `Valid for ${selectedPlan.duration_months} month(s)`}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-200 mb-4">
                <Image
                  src="/qr_code.png"
                  alt="QR Code for Payment"
                  width={128}
                  height={128}
                  className="mx-auto mb-2"
                />
                <p className="text-sm text-gray-500">Scan QR code to pay</p>
                <p className="text-xs text-gray-400">or use UPI details below</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg border border-rose-200">
                <div>
                  <p className="font-medium text-sm text-rose-900">UPI ID</p>
                  <p className="text-sm text-rose-700 font-mono">msmbinfotech1@sbi</p>
                </div>
                 <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard("msmbinfotech1@sbi")}
                  className="text-rose-600 hover:text-rose-700 hover:bg-rose-100"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-medium text-sm text-green-900">Amount</p>
                  <p className="text-sm text-green-700 font-mono">₹{selectedPlan.price}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(selectedPlan.price.toString())}
                  className="text-green-600 hover:text-green-700 hover:bg-green-100"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              className="w-full bg-rose-600 hover:bg-rose-700"
              onClick={onPaymentComplete}
            >
              <Check className="h-4 w-4 mr-2" />
              Payment Completed
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}