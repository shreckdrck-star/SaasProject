"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Inbox, ChevronDown, ChevronUp, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { CONTENT_TYPE_LABELS } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";

type Generation = {
  id: string;
  content_type: string;
  topic: string;
  generated_content: string;
  created_at: string;
};

export default function HistoryPage() {
  const [generations, setGenerations] = useState<Generation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/generations");
        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();
        setGenerations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Generation History</h1>
          <p className="text-gray-500 mt-2">View all your past content generations.</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Generation History</h1>
          <p className="text-gray-500 mt-2">View all your past content generations.</p>
        </div>
        <Card>
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Failed to load history</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generation History</h1>
        <p className="text-gray-500 mt-2">View all your past content generations.</p>
      </div>

      {!generations || generations.length === 0 ? (
        <Card>
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <Inbox className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No generations yet</h3>
            <p className="text-gray-500 mb-4">Create your first piece of content to see it here.</p>
            <Link href="/dashboard/generate">
              <Button variant="gradient">Generate Content</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {generations.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-4 sm:p-6 flex items-center justify-between text-left hover:bg-gray-50 transition rounded-lg min-h-[44px] gap-3"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className="p-2.5 sm:p-3 bg-purple-100 rounded-lg text-purple-600 shrink-0">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.topic}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                          {CONTENT_TYPE_LABELS[item.content_type] || item.content_type}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {timeAgo(item.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
                    <span className="text-sm text-gray-400 max-w-xs hidden lg:block truncate">
                      {item.generated_content.slice(0, 80)}...
                    </span>
                    {expandedId === item.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                {expandedId === item.id && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 border-t border-gray-100">
                    <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap break-words leading-relaxed overflow-x-hidden">
                      {item.generated_content}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
