import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generation History</h1>
        <p className="text-gray-500 mt-2">View all your past content generations.</p>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Card key={item}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Content Title #{item}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">Instagram</span>
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> 2 days ago</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 max-w-md hidden md:block truncate">
                This is a preview of the generated content that starts here...
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
