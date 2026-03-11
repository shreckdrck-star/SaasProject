import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap, Clock, FileText, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-500 mt-2">Here's what's happening with your content today.</p>
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
            <div className="text-2xl font-bold">1/3</div>
            <p className="text-xs text-muted-foreground">Generations used today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Generated</CardTitle>
            <FileText className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Lifetime content pieces</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Drafts saved in history</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Generation History</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {[
                { title: "Summer Sale Instagram Post", type: "Instagram", date: "2 mins ago" },
                { title: "Product Launch Landing Page", type: "Website", date: "2 hours ago" },
                { title: "Black Friday Ad Copy", type: "Ad Campaign", date: "Yesterday" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.type === 'Instagram' ? 'bg-purple-100 text-purple-600' :
                      item.type === 'Website' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.type === 'Instagram' ? <FileText className="w-5 h-5" /> :
                       item.type === 'Website' ? <FileText className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.type} • {item.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
