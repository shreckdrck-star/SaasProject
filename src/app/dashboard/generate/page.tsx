"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, Check, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { DAILY_GENERATION_LIMIT } from "@/lib/constants";

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    contentType: "instagram",
    topic: "",
    targetAudience: "",
    tone: "professional",
    additionalRequirements: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedContent("");
    setError(null);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 429) {
          const body = await response.json();
          throw new Error(`Daily limit reached (${body.used ?? "?"}/${body.limit ?? DAILY_GENERATION_LIMIT}). Try again tomorrow.`);
        }
        throw new Error("Failed to generate content. Please try again.");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setGeneratedContent(prev => prev + text);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard. Please select and copy manually.");
    }
  };

  const isFormValid = formData.topic.trim() !== "" && formData.targetAudience.trim() !== "";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content Generator</h1>
        <p className="text-gray-500 mt-2">Create high-quality content for your business in seconds.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Content Details</CardTitle>
            <CardDescription>Tell us what you want to generate.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Type</label>
                <select 
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="instagram">Instagram Post</option>
                  <option value="website">Website Copy</option>
                  <option value="ad">Ad Campaign</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Topic</label>
                <Input 
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., Summer Fashion Sale" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <Input 
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  placeholder="e.g., Young adults 18-25" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <select 
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="persuasive">Persuasive</option>
                  <option value="witty">Witty</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Requirements</label>
                <Textarea 
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  placeholder="Any specific keywords or hashtags to include?" 
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading || !isFormValid}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Content"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Display */}
        <Card className="h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Generated Result</CardTitle>
            {generatedContent && (
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            {generatedContent ? (
              <div className="p-4 bg-gray-50 rounded-lg h-full min-h-[300px] text-sm leading-relaxed overflow-auto">
                <ReactMarkdown
                  components={{
                    h1: (props) => <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4" {...props} />,
                    h2: (props) => <h2 className="text-xl font-semibold text-gray-800 mt-5 mb-3" {...props} />,
                    h3: (props) => <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2" {...props} />,
                    strong: (props) => <strong className="font-bold text-gray-900" {...props} />,
                    ul: (props) => <ul className="list-disc pl-5 my-3 space-y-1 text-gray-700" {...props} />,
                    ol: (props) => <ol className="list-decimal pl-5 my-3 space-y-1 text-gray-700" {...props} />,
                    li: (props) => <li className="pl-1" {...props} />,
                    p: (props) => <p className="mb-4 text-gray-700 last:mb-0" {...props} />,
                    blockquote: (props) => <blockquote className="border-l-4 border-purple-500 pl-4 italic my-4 text-gray-600" {...props} />,
                    code: (props) => <code className="bg-gray-200 rounded px-1 py-0.5 text-xs font-mono text-gray-800" {...props} />,
                  }}
                >
                  {generatedContent}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
                <Loader2 className={`h-8 w-8 mb-4 ${isLoading ? "animate-spin opacity-50" : "opacity-20"}`} />
                <p>{isLoading ? "AI is thinking..." : "Your content will appear here"}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
