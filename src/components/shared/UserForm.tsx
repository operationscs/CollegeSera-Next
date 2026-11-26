'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { submitPublicLeadAction } from "@/features/admissions/actions";

export interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserForm = ({ isOpen, onClose }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    course: "",
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      setError("Please agree to the Terms and Conditions to proceed.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      await submitPublicLeadAction({
        name: formData.name,
        email: formData.email,
        phone: formData.phone_number,
        city: formData.city,
        course: formData.course
      });

      onClose();
      setFormData({
        name: "",
        phone_number: "",
        email: "",
        course: "",
        city: "",
      });
      setIsAgreed(false);
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[calc(100%-2rem)]
          max-h-[90dvh]
          overflow-y-auto
          md:max-h-none
          md:overflow-visible
          overflow-x-hidden
          sm:max-w-xl 
          bg-white dark:bg-slate-900
          text-slate-900 dark:text-slate-100
          p-0 
          gap-0
          rounded-2xl 
          shadow-2xl 
          border border-orange-100 dark:border-slate-800
        "
      >
        {/* HEADER */}
        <div className="bg-orange-50 dark:bg-slate-800/80 px-5 py-4 sm:px-8 sm:py-6 border-b border-orange-100 dark:border-slate-800 sm:rounded-t-2xl">
          <DialogHeader className="text-center sm:text-center">
            <img
              src="/CollegeseraLogo.png"
              className="h-10 sm:h-14 mx-auto mb-1.5 sm:mb-2 rounded-lg dark:bg-white dark:p-1"
              alt="CollegeSera Logo"
            />
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-slate-100">
              Get Expert Guidance
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 mt-1">
              Fill the form and our admission expert will contact you shortly.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* FORM BODY */}
        <div className="p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-slate-200">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-11 bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="phone_number" className="text-gray-700 dark:text-slate-200">Phone Number</Label>
                <Input
                  id="phone_number"
                  placeholder="9876543210"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-11 bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-slate-200">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-11 bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="course" className="text-gray-700 dark:text-slate-200">Course</Label>
                <Input
                  id="course"
                  placeholder="B.Tech, MBA, Nursing..."
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-11 bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="city" className="text-gray-700 dark:text-slate-200">City</Label>
              <Input
                id="city"
                placeholder="Coimbatore, Chennai, Bangalore..."
                value={formData.city}
                onChange={handleChange}
                required
                className="h-10 sm:h-11 bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="terms"
                checked={isAgreed}
                onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                className="mt-1 dark:border-slate-600 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
              />
              <Label htmlFor="terms" className="text-xs text-slate-500 dark:text-slate-400 leading-tight cursor-pointer">
                By submitting this form, you accept and agree to our <span className="text-orange-600 dark:text-orange-400 font-medium">Terms and Conditions</span> and <span className="text-orange-600 dark:text-orange-400 font-medium">Privacy Policy</span>.
              </Label>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <DialogFooter>
              <Button
                type="submit"
                className="
                  w-full 
                  h-11 
                  bg-orange-500 
                  hover:bg-orange-600 
                  text-white 
                  font-semibold
                  rounded-lg
                "
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Now"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
