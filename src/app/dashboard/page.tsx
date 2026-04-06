import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap, FileText, ArrowRight, History } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { DAILY_GENERATION_LIMIT, CONTENT_TYPE_LABELS } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const firstName = user?.firstName || "there";

  let totalCount: number | null = 0;
  let todayCount: number | null = 0;
  let recent: { id: string; content_type: string; topic: string; created_at: string }[] | null = null;

  try {
    const { count, error: totalError } = await supabase
      .from("generations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);
    if (!totalError) totalCount = count;

    const todayUTC = new Date();
    todayUTC.setUTCHours(0, 0, 0, 0);
    const { count: tCount, error: todayError } = await supabase
      .from("generations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", todayUTC.toISOString());
    if (!todayError) todayCount = tCount;

    const { data, error: recentError } = await supabase
      .from("generations")
      .select("id, content_type, topic, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(3);
    if (!recentError) recent = data;
  } catch (err) {
    console.error("Failed to fetch dashboard data:", err);
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {firstName}!</h1>
          <p className="text-gray-500 mt-2">Here&apos;s what&apos;s happening with your content today.</p>
        </div>
        <Link href="/dashboard/generate">
          <Button variant="gradient" size="lg">
            Create New Content <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Usage</CardTitle>
            <Zap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayCount ?? 0}/{DAILY_GENERATION_LIMIT}</div>
            <p className="text-xs text-muted-foreground">Generations used today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Generated</CardTitle>
            <FileText className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">Lifetime content pieces</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">History</CardTitle>
            <History className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">Saved in history</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Generation History</h2>
        <Card>
          <CardContent className="p-0">
            {!recent || recent.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                No generations yet. Create your first content!
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recent.map((item) => {
                  const label = CONTENT_TYPE_LABELS[item.content_type] || item.content_type;
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.content_type === "instagram" ? "bg-purple-100 text-purple-600" :
                          item.content_type === "website" ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600"
                        }`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.topic}</p>
                          <p className="text-sm text-gray-500">{label} &bull; {timeAgo(item.created_at)}</p>
                        </div>
                      </div>
                      <Link href="/dashboard/history">
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
