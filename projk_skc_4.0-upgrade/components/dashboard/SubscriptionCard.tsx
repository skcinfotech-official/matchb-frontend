import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, PhoneCall, Check, TrendingUp, Zap, Calendar } from "lucide-react";
import { ActivePlan } from "../../types/types";

interface SubscriptionCardProps {
  activePlans: ActivePlan;
  onUpgrade: () => void;
  formatDate: (dateString: string) => string;
}

export default function SubscriptionCard({ activePlans, onUpgrade, formatDate }: SubscriptionCardProps) {
  return (
    <Card className="border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
          <div className="h-8 w-8 bg-rose-600 rounded-lg flex items-center justify-center mr-3">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          Your Plans
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Premium Plan Card */}
        <div className="bg-rose-50/40 rounded-xl p-4 border border-rose-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                activePlans.normal_plan?.isActive 
                  ? 'bg-amber-500'
                  : 'bg-gray-200'
              }`}>
                <Crown className={`h-5 w-5 ${
                  activePlans.normal_plan?.isActive ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Premium Access</h4>
                <p className="text-xs text-gray-600">View full profiles</p>
              </div>
            </div>
            <Badge className={`${
              activePlans.normal_plan?.isActive 
                ? 'bg-green-100 text-green-700 border-green-200' 
                : 'bg-red-100 text-red-700 border-red-200'
            } px-2 py-1 text-xs font-medium`}>
              {activePlans.normal_plan?.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          
          {activePlans.normal_plan?.isActive ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {activePlans.normal_plan.plan_name}
                </span>
                <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <Calendar className="h-3 w-3 mr-1" />
                  {activePlans.normal_plan.daysLeft} days left
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Expires: {formatDate(activePlans.normal_plan.expires_at)}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-gray-600">Unlock detailed profile information</p>
              <Button 
                size="sm" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs h-8 font-medium"
                onClick={onUpgrade}
              >
                <Crown className="h-3 w-3 mr-1" />
                Upgrade Now
              </Button>
            </div>
          )}
        </div>
        
        {/* Call Plan Card */}
        <div className="bg-rose-50/40 rounded-xl p-4 border border-rose-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                activePlans.call_plan?.isActive 
                  ? 'bg-rose-600'
                  : 'bg-gray-200'
              }`}>
                <PhoneCall className={`h-5 w-5 ${
                  activePlans.call_plan?.isActive ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Call Credits</h4>
                <p className="text-xs text-gray-600">Connect via calls</p>
              </div>
            </div>
            <Badge className={`${
              activePlans.call_plan?.isActive 
                ? 'bg-rose-100 text-rose-700 border-rose-200' 
                : 'bg-red-100 text-red-700 border-red-200'
            } px-2 py-1 text-xs font-medium`}>
              {activePlans.call_plan?.isActive 
                ? `${activePlans.call_plan.credits_remaining} left` 
                : 'No credits'
              }
            </Badge>
          </div>
          
          {activePlans.call_plan?.isActive ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {activePlans.call_plan.plan_name}
                </span>
                <div className="flex items-center text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
                  <PhoneCall className="h-3 w-3 mr-1" />
                  {activePlans.call_plan.credits_remaining} calls
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Expires: {formatDate(activePlans.call_plan.expires_at)}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-gray-600">Start meaningful conversations</p>
              <Button 
                size="sm" 
                className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs h-8 font-medium"
                onClick={onUpgrade}
              >
                <Zap className="h-3 w-3 mr-1" />
                Buy Credits
              </Button>
            </div>
          )}
        </div>

        {/* Overall upgrade button if neither plan is active */}
        {!activePlans.normal_plan?.isActive && !activePlans.call_plan?.isActive && (
          <Button
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium h-10"
            onClick={onUpgrade}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Upgrade Your Experience
          </Button>
        )}
      </CardContent>
    </Card>
  );
}