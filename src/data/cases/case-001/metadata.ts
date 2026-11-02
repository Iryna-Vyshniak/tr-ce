import type { CaseMetadata } from "../../../features/cases/types/case.types";

export const case001Metadata = {
  id: "the-glass-room",
  caseNumber: "001",

  title: {
    uk: "Скляна кімната",
    en: "The Glass Room",
  },

  status: "active",

  classification: {
    uk: "Нерозкрита справа",
    en: "Unresolved Case",
  },

  location: {
    uk: "Київ · Поділ · готель «Вежа» · номер 714",
    en: "Kyiv · Podil · Hotel Vezha · Room 714",
  },

  occurredOn: "2026-10-31",
  occurredAt: "23:47",

  description: {
    uk: "Замкнений готельний номер. Чотири суперечливі свідчення. Сім доказів. Хтось бреше про те, що сталося до того, як двері були замкнені.",
    en: "A locked hotel room. Four conflicting statements. Seven pieces of evidence. Someone is lying about what happened before the door was locked.",
  },

  progress: 34,
  knownContradictionCount: 1,

  lastTrace: {
    uk: "Чек обслуговування номера був надрукований через дванадцять хвилин після заявленого часу блокування дверей.",
    en: "The room service receipt was printed twelve minutes after the reported lock time.",
  },
} satisfies CaseMetadata;
