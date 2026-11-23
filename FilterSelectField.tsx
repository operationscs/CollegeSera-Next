"use client";

import type { ReactNode } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface FilterSelectFieldProps {
    label: string;
    icon: ReactNode;
    value: string;
    onValueChange: (value: string) => void;
    placeholder: string;
    allLabel: string;
    options: string[];
}

export function FilterSelectField({
    label,
    icon,
    value,
    onValueChange,
    placeholder,
    allLabel,
    options,
}: FilterSelectFieldProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm uppercase tracking-wide">
                {icon}
                {label}
            </div>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-orange-500">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{allLabel}</SelectItem>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
