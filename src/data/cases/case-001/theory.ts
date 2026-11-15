import type {
  CaseHypothesis,
  CaseInterpretation,
  TheoryMotiveOption,
} from "../../../features/cases/types/case.types";

export const case001TheoryMotiveOptions = [
  {
    id: "fact-marta-contracts",
    title: {
      uk: "Матеріали про контракти з реконструкції",
      en: "Records on redevelopment contracts",
    },
    description: {
      uk: "Марта готувала матеріал про непрозорі контракти на реконструкцію Подолу.",
      en: "Marta was preparing a report on opaque Podil redevelopment contracts.",
    },
  },
  {
    id: "motive-oleh-reputation",
    title: {
      uk: "Репутація девелопера",
      en: "The developer's reputation",
    },
    description: {
      uk: "Публікація Марти могла зашкодити бізнесу та публічному образу Олега.",
      en: "Marta's publication could have damaged Oleh's business and public image.",
    },
  },
  {
    id: "motive-nina-employment",
    title: {
      uk: "Страх втратити роботу",
      en: "Fear of losing a job",
    },
    description: {
      uk: "Ніна могла боятися наслідків помилки з обслуговуванням номера.",
      en: "Nina may have feared the consequences of her room-service error.",
    },
  },
] satisfies TheoryMotiveOption[];

export const case001Interpretations = [
  {
    id: "int-lock-report-not-final-entry",
    title: {
      uk: "Запис про блокування не встановлює останній вхід",
      en: "A lock record does not establish the last entry",
    },
    description: {
      uk: "Ручне блокування о 23:35 не виключає подальшого входу службовою карткою, яку забрали о 23:41.",
      en: "The manual lock at 23:35 does not rule out a later entry with the staff card removed at 23:41.",
    },
    observationEvidenceIds: ["ev-001-lock-log", "ev-004-master-key-log"],
  },
  {
    id: "int-service-order-breaks-seal",
    title: {
      uk: "Активність обслуговування суперечить «герметичному» номеру",
      en: "Room-service activity conflicts with a sealed room",
    },
    description: {
      uk: "Чек о 23:47 і таця в коридорі не доводять доставку до номера, але показують, що події після заявленого блокування ще потрібно пояснити.",
      en: "The 23:47 receipt and tray in the corridor do not prove an in-room delivery, but they show that events after the reported lock still need an explanation.",
    },
    observationEvidenceIds: ["ev-002-receipt", "ev-003-tea-tray"],
  },
  {
    id: "int-oleh-was-still-nearby",
    title: {
      uk: "Олег не залишив готель тоді, коли стверджує",
      en: "Oleh did not leave the hotel when he says he did",
    },
    description: {
      uk: "Сигнал телефона біля службового ліфта спростовує заявлений час від’їзду, але сам по собі не доводить вхід до номера.",
      en: "The phone signal by the service lift refutes the claimed departure time, but does not itself prove entry into the room.",
    },
    observationEvidenceIds: ["ev-005-phone-ping"],
  },
  {
    id: "int-last-call-questions-lock-story",
    title: {
      uk: "Останній дзвінок ставить під сумнів версію про остаточне блокування",
      en: "The last call challenges the final-lock story",
    },
    description: {
      uk: "Незавершене повідомлення Марти пов’язує слова про замкнені двері з подіями безпосередньо перед зникненням.",
      en: "Marta’s unfinished message links the words about locked doors to the events immediately before her disappearance.",
    },
    observationEvidenceIds: ["ev-007-voice-note"],
  },
] satisfies CaseInterpretation[];

export const case001Hypotheses = [
  {
    id: "hyp-andrii-access",
    personId: "andrii-holub",
    title: {
      uk: "Службовий доступ використали після заявленого блокування",
      en: "Staff access was used after the reported lock",
    },
    description: {
      uk: "Версія пояснює журнал картки й суперечність у часі, але має витримати факт присутності Олега в готелі.",
      en: "This account explains the card log and the time conflict, but must account for Oleh still being at the hotel.",
    },
    supportingInterpretationIds: [
      "int-lock-report-not-final-entry",
      "int-service-order-breaks-seal",
      "int-last-call-questions-lock-story",
    ],
    challengingInterpretationIds: ["int-oleh-was-still-nearby"],
  },
  {
    id: "hyp-oleh-returned",
    personId: "oleh-bereza",
    title: {
      uk: "Олег лишався в готелі й міг повернутися до номера",
      en: "Oleh remained at the hotel and could have returned to the room",
    },
    description: {
      uk: "Версія пояснює неправду про час від’їзду, але не пояснює службову картку або слова Марти про замкнені двері.",
      en: "This account explains the false departure time, but not the staff card or Marta’s words about locked doors.",
    },
    supportingInterpretationIds: ["int-oleh-was-still-nearby"],
    challengingInterpretationIds: [
      "int-lock-report-not-final-entry",
      "int-last-call-questions-lock-story",
    ],
  },
  {
    id: "hyp-nina-service-error",
    personId: "nina-orlenko",
    title: {
      uk: "Помилка з обслуговуванням змінила картину подій",
      en: "A room-service error changed the timeline",
    },
    description: {
      uk: "Версія пояснює чек і тацю, але не пояснює, чому службова картка зникла після заявленого блокування.",
      en: "This account explains the receipt and tray, but not why the staff card disappeared after the reported lock.",
    },
    supportingInterpretationIds: ["int-service-order-breaks-seal"],
    challengingInterpretationIds: ["int-lock-report-not-final-entry"],
  },
  {
    id: "hyp-viktoriia-key",
    personId: "viktoriia-senyk",
    title: {
      uk: "Вікторія приховує власний доступ до номера",
      en: "Viktoriia is concealing her own access to the room",
    },
    description: {
      uk: "Версія має слабку доказову основу: наявні матеріали не пов’язують її з подіями після 23:35.",
      en: "This account has weak evidentiary support: the available material does not connect her to events after 23:35.",
    },
    supportingInterpretationIds: [],
    challengingInterpretationIds: [
      "int-lock-report-not-final-entry",
      "int-last-call-questions-lock-story",
    ],
  },
] satisfies CaseHypothesis[];
