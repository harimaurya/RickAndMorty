"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";

interface ProfileFormProps {
  isRegister?: boolean;
  onSuccess?: () => void;
}

export default function ProfileForm({
  isRegister,
  onSuccess,
}: ProfileFormProps) {
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch existing profile data on mount
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/register", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok) {
          setUsername(data.username || "");
          setJobTitle(data.jobTitle || "");
        }
      } catch {
        // Handle fetch error silently
      }
    };

    if (!isRegister) {
      fetchProfile();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Important: include credentials so the browser will accept Set-Cookie from the response
        credentials: "same-origin",
        body: JSON.stringify({ username, jobTitle }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.message || "Failed to register");
      } else {
        setSuccess("Profile updated successfully!");
        if (onSuccess) onSuccess();
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const saveButtonText = isRegister ? "Let's go!" : "Save Changes";

  return (
    <Card className="w-full max-w-md p-6 mx-auto">
      {isRegister && (
        <CardDescription>
          <p>Please enter below information to access the application.</p>
        </CardDescription>
      )}

      <CardContent className="p-0">
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  value={username}
                  placeholder="Enter your username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="jobtitle">Job Title</FieldLabel>
                <Input
                  id="jobtitle"
                  value={jobTitle}
                  placeholder="Enter your job title"
                  type="text"
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field className="mt-6">
            <Button
              type="submit"
              className="bg-lime-500 hover:bg-lime-600"
              disabled={loading}
            >
              {loading ? "Saving..." : saveButtonText}
            </Button>
          </Field>
        </form>
        <div className="mt-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
