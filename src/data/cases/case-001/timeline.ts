import type { TimelineEvent } from "../../../features/cases/types/case.types";

export const case001Timeline = [
  {
    id: "tl-001-meeting",
    occurredAt: "23:12",
    status: "confirmed",
    title: {
      uk: "Зустріч у номері 714",
      en: "Meeting in room 714",
    },
    description: {
      uk: "Олег заходить до номера Марти. Камера фоє фіксує його прибуття.",
      en: "Oleh enters Marta's room. The lobby camera records his arrival.",
    },
    relatedEvidenceIds: [],
    relatedPersonIds: ["marta-chorna", "oleh-bereza"],
  },
  {
    id: "tl-002-oleh-leaves",
    occurredAt: "23:28",
    status: "disputed",
    title: {
      uk: "Олег нібито залишає готель",
      en: "Oleh allegedly leaves the hotel",
    },
    description: {
      uk: "Так стверджує Олег, але його телефон з’являється біля службового ліфта о 23:43.",
      en: "Oleh says this is when he left, but his phone appears by the service lift at 23:43.",
    },
    relatedEvidenceIds: ["ev-005-phone-ping"],
    relatedPersonIds: ["oleh-bereza"],
  },
  {
    id: "tl-003-lock-report",
    occurredAt: "23:35",
    status: "disputed",
    title: {
      uk: "Охорона повідомляє про блокування",
      en: "Security reports a lock",
    },
    description: {
      uk: "Андрій вносить до системи ручне блокування номера 714.",
      en: "Andrii records a manual lock of room 714 in the system.",
    },
    relatedEvidenceIds: ["ev-001-lock-log"],
    relatedPersonIds: ["andrii-holub"],
  },
  {
    id: "tl-004-master-card",
    occurredAt: "23:41",
    status: "confirmed",
    title: {
      uk: "Майстер-картка зникає з док-станції",
      en: "Master keycard leaves its dock",
    },
    description: {
      uk: "Картка охорони не повертається до 23:50.",
      en: "The security keycard does not return until 23:50.",
    },
    relatedEvidenceIds: ["ev-004-master-key-log"],
    relatedPersonIds: ["andrii-holub"],
  },
  {
    id: "tl-005-service-order",
    occurredAt: "23:47",
    status: "confirmed",
    title: {
      uk: "Друкується чек обслуговування номера",
      en: "Room-service receipt prints",
    },
    description: {
      uk: "Система оформлює доставку чаю до 714, хоча номер вже мав бути заблокований.",
      en: "The system processes tea delivery to room 714 although the room was supposedly already locked.",
    },
    relatedEvidenceIds: ["ev-002-receipt", "ev-003-tea-tray"],
    relatedPersonIds: ["nina-orlenko"],
  },
  {
    id: "tl-006-call-cuts",
    occurredAt: "23:49",
    status: "inferred",
    title: {
      uk: "Зв’язок із Мартою обривається",
      en: "Marta's call cuts out",
    },
    description: {
      uk: "Час обриву відновлено за журналом дзвінків Вікторії та незавершеним голосовим повідомленням.",
      en: "The cut-off time is reconstructed from Viktoriia's call log and the unfinished voice note.",
    },
    relatedEvidenceIds: ["ev-007-voice-note"],
    relatedPersonIds: ["marta-chorna", "viktoriia-senyk"],
  },
] satisfies TimelineEvent[];
