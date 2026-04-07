import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentUser } from "@clerk/nextjs/server";
import { DAILY_GENERATION_LIMIT } from "@/lib/constants";

export default async function SettingsPage() {
  let fullName = "";
  let email = "";
  try {
    const user = await currentUser();
    fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "";
    email = user?.emailAddresses?.[0]?.emailAddress || "";
  } catch (e) {
    console.error("Failed to fetch user:", e);
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl overflow-x-hidden">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">Manage your account settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Your profile is managed through Clerk authentication.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input defaultValue={fullName} disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue={email} disabled />
            </div>
          </div>
          <p className="text-xs text-gray-500">To update your profile, use the avatar menu in the sidebar.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Manage your billing and plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <p className="font-semibold text-purple-900">Free Plan</p>
              <p className="text-sm text-purple-700">{DAILY_GENERATION_LIMIT} generations per day</p>
            </div>
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-100 w-full sm:w-auto min-h-[44px]">Upgrade Plan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
