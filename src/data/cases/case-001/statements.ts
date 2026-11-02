import type { WitnessStatement } from "../../../features/cases/types/case.types";

export const case001Statements = [
  {
    id: "st-001-andrii",
    speakerId: "andrii-holub",
    recordedAt: "00:10",
    claimedTime: "23:35",
    text: {
      uk: "«Я заблокував номер о 23:35 після дзвінка Марти. Відтоді жодна картка не відкривала двері».",
      en: "“I locked the room at 23:35 after Marta called. No card opened that door afterwards.”",
    },
  },
  {
    id: "st-002-nina",
    speakerId: "nina-orlenko",
    recordedAt: "00:16",
    claimedTime: "23:47",
    text: {
      uk: "«Я пробила замовлення, але побачила табличку “Не турбувати” й лишила тацю в коридорі».",
      en: "“I processed the order, but saw the Do Not Disturb sign and left the tray in the corridor.”",
    },
  },
  {
    id: "st-003-oleh",
    speakerId: "oleh-bereza",
    recordedAt: "00:22",
    claimedTime: "23:28",
    text: {
      uk: "«Наша розмова закінчилася о 23:28. Я одразу поїхав додому».",
      en: "“Our conversation ended at 23:28. I went straight home.”",
    },
  },
  {
    id: "st-004-viktoriia",
    speakerId: "viktoriia-senyk",
    recordedAt: "00:29",
    claimedTime: "23:40",
    text: {
      uk: "«Марта подзвонила й сказала, що охоронець зайшов без попередження. Потім зв’язок урвався».",
      en: "“Marta called and said security had entered without warning. Then the call cut out.”",
    },
  },
] satisfies WitnessStatement[];
