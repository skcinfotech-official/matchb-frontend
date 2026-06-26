"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Edit, Settings, CheckCircle, Star, UserPlus, AlertCircle } from "lucide-react";
import { UserProfile } from "../../types/types";

interface ProfileCardProps {
  userProfile: UserProfile | null;
  onEditProfile: () => void;
  onChangePassword: () => void;
  onCompleteProfile?: () => void;
  profileExists: boolean;
}

export default function ProfileCard({
  userProfile,
  onEditProfile,
  onChangePassword,
  onCompleteProfile,
  profileExists = true
}: ProfileCardProps) {
  const isProfileComplete = userProfile &&
    userProfile.age &&
    userProfile.gender &&
    userProfile.caste &&
    userProfile.religion &&
    userProfile.education &&
    userProfile.occupation &&
    userProfile.state &&
    userProfile.city &&
    userProfile.marital_status;

  // Add cache-busting to image URL
  const getImageUrl = (url: string | undefined) => {
    if (!url) return "/placeholder.svg";

    // If URL already has query params, append timestamp with &
    if (url.includes('?')) {
      return `${url}&t=${Date.now()}`;
    }
    // Otherwise add timestamp with ?
    return `${url}?t=${Date.now()}`;
  };

  return (
    <Card className="border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="text-center mb-5">
          <div className="relative inline-block">
            <Avatar className="h-20 w-20 mx-auto mb-3 ring-4 ring-rose-100 shadow-lg">
              <AvatarImage
                src={getImageUrl(userProfile?.profile_photo)}
                className="object-cover"
                key={userProfile?.profile_photo || 'default'}
              />
              <AvatarFallback className="text-lg bg-rose-100 text-rose-600 font-semibold">
                {userProfile?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 rounded-full p-1 shadow-lg ${
              isProfileComplete ? 'bg-green-500' : 'bg-orange-500'
            }`}>
              {isProfileComplete ? (
                <CheckCircle className="h-4 w-4 text-white" />
              ) : (
                <AlertCircle className="h-4 w-4 text-white" />
              )}
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate px-2">
            {userProfile?.name || "User"}
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-2">
            {userProfile?.age && (
              <p className="text-sm text-gray-600">{userProfile.age} years old</p>
            )}
            <Badge variant="outline" className={`text-xs border-rose-200 ${
              isProfileComplete
                ? 'bg-green-50 text-green-600 border-green-200'
                : 'bg-orange-50 text-orange-600 border-orange-200'
            }`}>
              <Star className="h-3 w-3 mr-1" />
              {isProfileComplete ? 'Complete' : 'Incomplete'}
            </Badge>
          </div>
        </div>

        {profileExists && userProfile ? (
          <div className="space-y-3 mb-5">
            <div className="flex items-center text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
              <MapPin className="h-4 w-4 mr-3 text-rose-500 flex-shrink-0" />
              <span className="truncate font-medium">
                {userProfile?.city || 'Not specified'}, {userProfile?.state || 'Not specified'}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
              <Briefcase className="h-4 w-4 mr-3 text-rose-500 flex-shrink-0" />
              <span className="truncate font-medium">{userProfile?.occupation || 'Not specified'}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mb-5">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
              <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-orange-700 font-medium">Profile Not Complete</p>
              <p className="text-xs text-orange-600 mt-1">Complete your profile to find matches</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-2">
          {!profileExists || !isProfileComplete ? (
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium h-10"
              onClick={onCompleteProfile}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Complete Profile
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full border-rose-200 text-rose-700 hover:bg-rose-50 font-medium h-10"
              onClick={onEditProfile}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}

          <Button
            variant="outline"
            className="w-full border-rose-200 text-rose-700 hover:bg-rose-50 font-medium h-10"
            onClick={onChangePassword}
          >
            <Settings className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
