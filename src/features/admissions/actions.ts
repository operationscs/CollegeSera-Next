'use server';

import { z } from 'zod';
import { SecurityUtils, validateInput } from '@/utils/securityUtils';
import { submitLeadForm } from '@/services/crmService';
import { saveUserData } from '@/services/userService';

const leadSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long')
    .transform((val) => SecurityUtils.sanitizeText(val)),
  email: z
    .string()
    .min(1, 'Email is required')
    .transform((val) => SecurityUtils.sanitizeText(val))
    .refine((val) => SecurityUtils.isValidEmail(val), {
      message: 'Invalid email address',
    }),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .transform((val) => SecurityUtils.sanitizeText(val))
    .refine((val) => validateInput.phone(val), {
      message: 'Invalid phone number',
    }),
  city: z
    .string()
    .min(1, 'City is required')
    .max(100, 'City is too long')
    .transform((val) => SecurityUtils.sanitizeText(val)),
  course: z
    .string()
    .min(1, 'Course is required')
    .max(150, 'Course is too long')
    .transform((val) => SecurityUtils.sanitizeText(val)),
  source: z
    .string()
    .optional()
    .transform((val) => (val ? SecurityUtils.sanitizeText(val) : 'website_popup')),
  notes: z
    .string()
    .optional()
    .transform((val) => (val ? SecurityUtils.sanitizeText(val) : undefined)),
  alsoSaveUserData: z.boolean().optional(),
});

export type SubmitLeadActionInput = {
  name: string;
  email: string;
  phone: string;
  city: string;
  course: string;
  source?: string;
  notes?: string;
  alsoSaveUserData?: boolean;
};

export async function submitPublicLeadAction(input: SubmitLeadActionInput) {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    throw new Error(firstIssue?.message || 'Invalid form input');
  }

  const data = parsed.data;

  const result = await submitLeadForm({
    name: data.name,
    email: data.email,
    phone: data.phone,
    city: data.city,
    course: data.course,
    source: data.source || 'website_popup',
    notes: data.notes,
  });

  if (data.alsoSaveUserData) {
    try {
      await saveUserData({
        name: data.name,
        phone_number: data.phone,
        email: data.email,
        course: data.course,
        city: data.city,
      });
    } catch {
      // Non-fatal if userdata fallback table fails
    }
  }

  return { success: true, data: result };
}
