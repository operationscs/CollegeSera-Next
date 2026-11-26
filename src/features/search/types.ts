import { ReactNode } from "react";

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'college' | 'location' | 'course' | 'district';
  icon: ReactNode;
}

export interface SearchAutocompleteProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  showIcon?: boolean;
  onSearch?: (query: string) => void;
  onEmptySubmit?: () => void;
  searchPathBuilder?: (query: string) => string;
  variant?: 'hero' | 'header';
  formId?: string;
  colleges?: any[];
  collegeOnlySuggestions?: boolean;
}
