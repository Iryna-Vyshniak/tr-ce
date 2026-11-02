import type { CaseGroundTruth } from "../../../features/cases/types/case.types";

export const case001GroundTruth = {
  culpritId: "andrii-holub",
  narrative: {
    uk: "Андрій сфальсифікував раннє блокування номера, щоб приховати повторний вхід із майстер-карткою. Він шукав матеріали Марти про контракти на реконструкцію, а сцену з доставкою чаю використав, щоби пояснити активність у системі. Олег бреше про час від’їзду, але не причетний до зникнення.",
    en: "Andrii falsified the early lock time to conceal a second entry with the master keycard. He was searching for Marta's records on redevelopment contracts and used the tea delivery to explain the system activity. Oleh lies about when he left, but was not involved in the disappearance.",
  },
  facts: [
    {
      id: "fact-andrii-master-card",
      text: {
        uk: "Андрій забрав майстер-картку о 23:41 і сам увійшов до номера після заявленого блокування.",
        en: "Andrii took the master keycard at 23:41 and entered the room himself after the reported lock.",
      },
    },
    {
      id: "fact-marta-contracts",
      text: {
        uk: "Марта зібрала матеріали, що пов’язують Андрія з непрозорими контрактами на реконструкцію Подолу.",
        en: "Marta gathered material linking Andrii to opaque Podil redevelopment contracts.",
      },
    },
    {
      id: "fact-oleh-alibi",
      text: {
        uk: "Олег збрехав про час від’їзду, але не заходив до номера після 23:28.",
        en: "Oleh lied about when he left, but did not enter the room after 23:28.",
      },
    },
  ],
  characterStates: [
    {
      characterId: "andrii-holub",
      personality: [
        {
          uk: "Контролює розмову й відповідає формально.",
          en: "Controls the conversation and answers formally.",
        },
        {
          uk: "Різко реагує на згадки про журнали доступу.",
          en: "React sharply to mentions of access logs.",
        },
      ],
      relationships: [
        {
          characterId: "marta-chorna",
          relationship: {
            uk: "Боявся її розслідування.",
            en: "Feared her investigation.",
          },
        },
      ],
      knownFactIds: ["fact-andrii-master-card", "fact-marta-contracts"],
      secretFactIds: ["fact-andrii-master-card"],
      actualTimelineEventIds: ["tl-003-lock-report", "tl-004-master-card", "tl-006-call-cuts"],
      lieStatementIds: ["st-001-andrii"],
      unknownFactIds: ["fact-oleh-alibi"],
      emotionalState: {
        uk: "Напружений, але прагне зберегти професійний вигляд.",
        en: "Tense, but determined to appear professional.",
      },
    },
    {
      characterId: "nina-orlenko",
      personality: [
        {
          uk: "Обережна й схильна уникати конфлікту.",
          en: "Careful and inclined to avoid conflict.",
        },
      ],
      relationships: [
        {
          characterId: "andrii-holub",
          relationship: {
            uk: "Підлегла в готелі.",
            en: "His subordinate at the hotel.",
          },
        },
      ],
      knownFactIds: ["fact-andrii-master-card"],
      secretFactIds: [],
      actualTimelineEventIds: ["tl-005-service-order"],
      lieStatementIds: [],
      unknownFactIds: ["fact-marta-contracts", "fact-oleh-alibi"],
      emotionalState: {
        uk: "Налякана наслідками, але не хоче приховувати власну помилку.",
        en: "Afraid of the consequences, but unwilling to hide her own mistake.",
      },
    },
    {
      characterId: "oleh-bereza",
      personality: [
        {
          uk: "Самовпевнений і вибірково щирий.",
          en: "Self-assured and selectively truthful.",
        },
      ],
      relationships: [
        {
          characterId: "marta-chorna",
          relationship: {
            uk: "Вона розслідувала його контракти.",
            en: "She was investigating his contracts.",
          },
        },
      ],
      knownFactIds: ["fact-oleh-alibi"],
      secretFactIds: ["fact-oleh-alibi"],
      actualTimelineEventIds: ["tl-001-meeting", "tl-002-oleh-leaves"],
      lieStatementIds: ["st-003-oleh"],
      unknownFactIds: ["fact-andrii-master-card"],
      emotionalState: {
        uk: "Роздратований підозрою й зосереджений на власній репутації.",
        en: "Irritated by suspicion and focused on his own reputation.",
      },
    },
    {
      characterId: "viktoriia-senyk",
      personality: [
        {
          uk: "Спостережлива, але емоційно виснажена.",
          en: "Observant, but emotionally exhausted.",
        },
      ],
      relationships: [
        {
          characterId: "marta-chorna",
          relationship: {
            uk: "Її асистентка та близька колега.",
            en: "Her assistant and close colleague.",
          },
        },
      ],
      knownFactIds: ["fact-andrii-master-card"],
      secretFactIds: [],
      actualTimelineEventIds: ["tl-006-call-cuts"],
      lieStatementIds: [],
      unknownFactIds: ["fact-oleh-alibi"],
      emotionalState: {
        uk: "Налякана за Марту та готова співпрацювати після встановлення довіри.",
        en: "Frightened for Marta and ready to cooperate once trust is established.",
      },
    },
  ],
  contradictions: [
    {
      id: "ct-001-sealed-room",
      title: {
        uk: "«Замкнений» номер не міг прийняти доставку",
        en: "A “sealed” room could not receive a delivery",
      },
      description: {
        uk: "Андрій називає 23:35 остаточним часом блокування, але о 23:47 його система ще оформлює доставку до номера. Журнал майстер-картки перекриває цей проміжок.",
        en: "Andrii calls 23:35 the final lock time, yet his system still processes a delivery to the room at 23:47. The master-keycard log overlaps that interval.",
      },
      evidenceIds: ["ev-001-lock-log", "ev-002-receipt", "ev-004-master-key-log"],
      statementIds: ["st-001-andrii", "st-002-nina"],
    },
  ],
  resolutionCriteria: {
    requiredCulpritId: "andrii-holub",
    requiredMotiveFactIds: ["fact-marta-contracts"],
    requiredTimelineEventIds: ["tl-003-lock-report", "tl-004-master-card", "tl-005-service-order"],
    requiredEvidenceIds: ["ev-001-lock-log", "ev-002-receipt", "ev-004-master-key-log"],
  },
} satisfies CaseGroundTruth;
