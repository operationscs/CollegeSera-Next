import type { DatabaseCollege } from "@/types/database";
import { FALLBACK_EXAM_RULES } from "@/features/colleges/data/listingConstants";

export function formatCollegeSalary(college: DatabaseCollege): string | null {
    const placement = college.placements?.[0];
    const avgSalary = placement?.average_salary;
    const maxSalary = placement?.max_salary;

    if (avgSalary) return `Avg: ${avgSalary}`;
    if (maxSalary) return `Max: ${maxSalary}`;
    return null;
}

export function getCollegeExams(college: DatabaseCollege): string[] {
    const admissionBasis = college.admission_process?.admission_basis;
    if (admissionBasis) {
        return admissionBasis
            .split(/[,/]+/)
            .map((e) => e.trim())
            .filter(Boolean)
            .slice(0, 3);
    }

    const cleanTypeStr = `${college.type_collwge || ""} ${college.name || ""} ${college.type || ""}`
        .toLowerCase()
        .replace(/coimbatore/gi, " ");

    const hasMbaCourse = Boolean(
        college.courses?.some((c) => {
            const cName = (c.name || "").toLowerCase().replace(/coimbatore/gi, " ");
            return (
                /\bmba\b/i.test(cName) ||
                cName.includes("pgdm") ||
                cName.includes("management")
            );
        })
    );

    const matchedRule = FALLBACK_EXAM_RULES.find((rule) =>
        rule.matches(cleanTypeStr, hasMbaCourse)
    );
    return matchedRule ? matchedRule.exams : ["Merit-Based"];
}

export function formatCollegeRanking(college: DatabaseCollege): string | null {
    const ranking = college.rankings?.[0];
    return ranking ? `${ranking.agency} #${ranking.rank}` : null;
}
