import type { ReactNode } from "react";
import {
  ArtsMega,
  EngineeringMega,
  ExamsMega,
  MbaMega,
  ParamedicalMega,
  UniversitiesMega,
} from "./MegaMenus";
import type { MenuKey } from "@/types/navigation";

export const menuContent: Record<MenuKey, ReactNode> = {
  universities: <UniversitiesMega />,
  engineering: <EngineeringMega />,
  arts: <ArtsMega />,
  mba: <MbaMega />,
  paramedical: <ParamedicalMega />,
  exams: <ExamsMega />,
};
