export interface CourseCatalogItem {
  id: number;
  name: string;
  type: string;
  level: string;
  collegesAvailable: string;
  mode: string;
}

export interface CourseStreamOption {
  name: string;
  count: number;
}

export interface CourseGroupOption {
  name: string;
  count: number;
}
