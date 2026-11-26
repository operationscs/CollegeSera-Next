"use client";

import React, { useState } from "react";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitPublicLeadAction } from "@/features/admissions/actions";
import type { AdvisorCounsellingContent } from "@/types/home";

export interface AdvisorCounsellingCardProps {
  content: AdvisorCounsellingContent;
}

export const AdvisorCounsellingCard: React.FC<AdvisorCounsellingCardProps> = ({
  content,
}) => {
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(
    content.courseOptions[0]?.value ?? ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = studentName.trim();
    const cleanedPhone = phoneNumber.replace(/[^\d+]/g, "").trim();
    const digitsOnly = cleanedPhone.replace(/\D/g, "");

    if (!trimmedName || digitsOnly.length < 10) {
      setErrorMessage(content.validationErrorMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const normalizedTenDigit = digitsOnly.slice(-10);
      await submitPublicLeadAction({
        name: trimmedName,
        phone: normalizedTenDigit,
        email: `student.${normalizedTenDigit}@${content.defaultEmailDomain}`,
        city: content.defaultCity,
        course: selectedCourse || content.courseOptions[0]?.value || "General",
        source: content.defaultSource,
      });

      setIsSubmitted(true);
      setStudentName("");
      setPhoneNumber("");
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setErrorMessage(content.submitErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,31,61,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-7 md:p-8">
      <div>
        <CardHeader className="space-y-0 p-0 pb-5">
          <div className="mb-2">
            <span className="font-jakarta text-[11px] font-extrabold uppercase tracking-wider text-[#ff861c] dark:text-[#ff861c]">
              {content.eyebrow}
            </span>
          </div>

          <CardTitle className="font-jakarta text-xl font-extrabold tracking-tight text-[#065893] dark:text-slate-100 sm:text-2xl">
            {content.title}
          </CardTitle>

          <CardDescription className="mt-2 font-jakarta text-xs leading-relaxed text-[#64748B] dark:text-slate-400 sm:text-sm">
            {content.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder={content.namePlaceholder}
              aria-label={content.namePlaceholder}
              required
              className="h-11 rounded-xl border-slate-200/90 bg-white px-3.5 font-jakarta text-xs font-medium text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:border-slate-300 focus-visible:ring-1 focus-visible:ring-slate-200 focus-visible:ring-offset-0 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-slate-600 dark:focus-visible:ring-slate-700"
            />

            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={content.phonePlaceholder}
              aria-label={content.phonePlaceholder}
              required
              className="h-11 rounded-xl border-slate-200/90 bg-white px-3.5 font-jakarta text-xs font-medium text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:border-slate-300 focus-visible:ring-1 focus-visible:ring-slate-200 focus-visible:ring-offset-0 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-slate-600 dark:focus-visible:ring-slate-700"
            />

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger
                aria-label={content.coursePlaceholder}
                className="h-11 w-full rounded-xl border-slate-200/90 bg-white px-3.5 font-jakarta text-xs font-semibold text-[#0F1F3D] shadow-none focus:border-slate-300 focus:ring-1 focus:ring-slate-200 focus:ring-offset-0 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-600 dark:focus:ring-slate-700"
              >
                <SelectValue placeholder={content.coursePlaceholder} />
              </SelectTrigger>
              <SelectContent className="border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                {content.courseOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="font-jakarta text-xs font-medium"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errorMessage && (
              <p className="font-jakarta text-xs font-medium text-red-500">
                {errorMessage}
              </p>
            )}

            {isSubmitted && (
              <p className="font-jakarta text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {content.submitSuccessMessage}
              </p>
            )}

            <div className="pt-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full gap-2 rounded-xl bg-[#ff861c] font-jakarta text-xs font-extrabold text-white shadow-sm transition-colors duration-200 hover:bg-[#e67310] dark:bg-[#ff861c] dark:text-white dark:hover:bg-[#e67310]"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>
                  {isSubmitting
                    ? content.submittingButtonLabel
                    : isSubmitted
                      ? content.submittedButtonLabel
                      : content.submitButtonLabel}
                </span>
              </Button>
            </div>

            <p className="pt-1 text-center font-jakarta text-[11px] font-medium text-[#64748B] dark:text-slate-400">
              {content.responseTimePrefix}{" "}
              <span className="font-extrabold text-[#0F1F3D] dark:text-slate-200">
                {content.responseTimeHighlight}
              </span>
            </p>
          </form>
        </CardContent>
      </div>
    </Card>
  );
};

export default AdvisorCounsellingCard;
