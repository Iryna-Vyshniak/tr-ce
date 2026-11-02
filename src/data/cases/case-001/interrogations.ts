import type {
  InterrogationTopic,
} from "../../../features/cases/types/case.types";

export const case001InterrogationTopics = [
  {
    id: "int-001-oleh-departure",
    personId: "oleh-bereza",
    question: {
      uk: "Ви сказали, що поїхали о 23:28. Де ви були о 23:43?",
      en: "You said you left at 23:28. Where were you at 23:43?",
    },
    response: {
      uk: "Я не поїхав одразу. Мене затримав дзвінок у холі. Але на сьомий поверх я не повертався.",
      en: "I did not leave immediately. A call kept me in the lobby. But I did not return to the seventh floor.",
    },
    requiredEvidenceIds: [],
  },
  {
    id: "int-002-viktoriia-last-call",
    personId: "viktoriia-senyk",
    question: {
      uk: "Що саме Марта сказала під час останнього дзвінка?",
      en: "What exactly did Marta say during her last call?",
    },
    response: {
      uk: "Вона сказала, що Андрій зайшов без попередження. Я почула суперечку, а потім — звук розбитого скла. Після цього зв’язок урвався.",
      en: "She said Andrii came in without warning. I heard an argument, then glass breaking. After that, the call cut off.",
    },
    requiredEvidenceIds: ["ev-004-master-key-log"],
  },
  {
    id: "int-003-nina-delivery",
    personId: "nina-orlenko",
    question: {
      uk: "Чому в системі є доставка, якщо таця лишилася в коридорі?",
      en: "Why does the system show a delivery if the tray remained in the corridor?",
    },
    response: {
      uk: "Я провела замовлення заздалегідь. Коли підійшла до номера, побачила табличку «Не турбувати» й не стала стукати.",
      en: "I processed the order in advance. When I reached the room, I saw the Do Not Disturb sign and did not knock.",
    },
    requiredEvidenceIds: ["ev-002-receipt", "ev-003-tea-tray"],
  },
  {
    id: "int-004-andrii-master-key",
    personId: "andrii-holub",
    question: {
      uk: "Хто взяв майстер-картку між 23:41 і 23:50?",
      en: "Who took the master keycard between 23:41 and 23:50?",
    },
    response: {
      uk: "Картку могли брати для звичайної перевірки обладнання. Журнал док-станції не пояснює, хто саме нею користувався.",
      en: "The card may have been taken for a routine equipment check. The docking log does not establish who used it.",
    },
    requiredEvidenceIds: ["ev-004-master-key-log"],
  },
] satisfies InterrogationTopic[];