"use client";

import { MapPin, Building2, GraduationCap, School } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { DatabaseBranch } from "@/types/database";
import { FilterSelectField } from "@/features/colleges/components/FilterSelectField";
import { OWNERSHIP_OPTIONS } from "@/features/colleges/data/collegeFilterConfig";

export interface CollegeFiltersProps {
  branches: DatabaseBranch[];
  collegeTypes: string[];
  locations: string[]; // Districts
  states: string[];    // States
  degrees: string[];
  ownerships: string[];
  selectedCategory: string;
  selectedDistrict: string;
  selectedState: string;
  selectedDegree: string;
  selectedOwnership: string;
  showFilters: boolean;
  onCategoryChange: (category: string) => void;
  onDistrictChange: (district: string) => void;
  onStateChange: (state: string) => void;
  onDegreeChange: (degree: string) => void;
  onOwnershipChange: (ownership: string) => void;
  onToggleFilters: () => void;
}

export const CollegeFilters = ({
  collegeTypes,
  locations,
  states,
  degrees,
  selectedCategory,
  selectedDistrict,
  selectedState,
  selectedDegree,
  selectedOwnership,
  showFilters,
  onCategoryChange,
  onDistrictChange,
  onStateChange,
  onDegreeChange,
  onOwnershipChange,
}: CollegeFiltersProps) => {
  // Normalize selected values case-insensitively so they accurately match dropdown items
  const normalizedCategory =
    collegeTypes.find(
      (t) =>
        t.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory.toLowerCase() === "mba" &&
          (t.toLowerCase().includes("manage") ||
            /\bmba\b/i.test(t.toLowerCase().replace(/coimbatore/gi, " "))))
    ) || (selectedCategory.toLowerCase() === "all" ? "all" : selectedCategory);

  const normalizedDistrict =
    locations.find((l) => l.toLowerCase() === selectedDistrict.toLowerCase()) ||
    (selectedDistrict.toLowerCase() === "all" ? "all" : selectedDistrict);

  const normalizedState =
    states.find((s) => s.toLowerCase() === selectedState.toLowerCase()) ||
    (selectedState.toLowerCase() === "all" ? "all" : selectedState);

  return (
    <div className="w-full">
      <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
        {/* Category Filter */}
        <FilterSelectField
          label="Category"
          icon={<School className="w-4 h-4 text-orange-600" />}
          value={normalizedCategory}
          onValueChange={onCategoryChange}
          placeholder="Select Category"
          allLabel="All Categories"
          options={collegeTypes}
        />

        <Separator />

        {/* State Filter */}
        <FilterSelectField
          label="State"
          icon={<MapPin className="w-4 h-4 text-orange-600" />}
          value={normalizedState}
          onValueChange={onStateChange}
          placeholder="Select State"
          allLabel="All States"
          options={states}
        />

        {/* City Filter (formerly District) */}
        <FilterSelectField
          label="City"
          icon={<Building2 className="w-4 h-4 text-orange-600" />}
          value={normalizedDistrict}
          onValueChange={onDistrictChange}
          placeholder="Select City"
          allLabel="All Cities"
          options={locations}
        />

        <Separator />

        {/* Degree Filter */}
        <FilterSelectField
          label="Degree"
          icon={<GraduationCap className="w-4 h-4 text-orange-600" />}
          value={selectedDegree}
          onValueChange={onDegreeChange}
          placeholder="Select Degree"
          allLabel="All Degrees"
          options={degrees}
        />

        <Separator />

        {/* Ownership Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm uppercase tracking-wide">
            <School className="w-4 h-4 text-orange-600" />
            Type of College
          </div>
          <RadioGroup
            value={selectedOwnership}
            onValueChange={onOwnershipChange}
            className="space-y-2"
          >
            {OWNERSHIP_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={option.id}
                  className="text-orange-600 border-slate-300"
                />
                <Label htmlFor={option.id} className="text-slate-700 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default CollegeFilters;

