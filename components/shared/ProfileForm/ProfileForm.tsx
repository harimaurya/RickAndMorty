"use client";

import { useState, useEffect, useActionState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription } from "../../ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/store/UserContext";
import { saveProfileAction } from "@/app/actions/profile";
import { useFormStatus } from "react-dom";

const initialFormState = {
  success: false,
  message: "",
};

export interface ProfileFormProps {
  isRegister?: boolean;
  onSuccess?: () => void;
}

export default function ProfileForm({
  isRegister,
  onSuccess,
}: ProfileFormProps) {
  const [formState, formAction] = useActionState(
    saveProfileAction,
    initialFormState
  );

  const { pending } = useFormStatus();

  const user = useUserContext();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const saveButtonText = isRegister ? "Let's go!" : "Save Changes";

  // Pre-fill form fields if not in registration mode
  useEffect(() => {
    if (!isRegister && user) {
      setUsername(user.username || "");
      setJobTitle(user.jobTitle || "");
    }
  }, [isRegister, user]);

  // Handle reaction to form action state changes
  useEffect(() => {
    if (formState.success) {
      if (onSuccess) {
        onSuccess();
      }

      if (isRegister) {
        setUsername("");
        setJobTitle("");
      }

      router.refresh();
    }
  }, [formState, onSuccess, router, isRegister]);

  const displayMessage = formState.message;
  const isSuccess = formState.success;

  return (
    <Card className="w-full max-w-md p-6 mx-auto">
      {isRegister && (
        <CardDescription>
          <p>
            Please enter your details to explore the Rick and Morty universe!
          </p>
        </CardDescription>
      )}

      <CardContent className="p-0">
        <form action={formAction}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
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
                  name="jobtitle"
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
              disabled={pending}
            >
              {pending ? "Saving..." : saveButtonText}
            </Button>
          </Field>
        </form>
        <div className="mt-4">
          {displayMessage && (
            <p
              className={`text-sm ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {displayMessage}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
