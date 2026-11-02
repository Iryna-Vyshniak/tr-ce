import type {
  SceneExaminationPoint,
} from "../../../features/cases/types/case.types";

export const case001ScenePoints = [
  {
    id: "scene-001-entry-lock",
    locationId: "room-714",
    position: {
      x: 13,
      y: 72,
    },
    title: {
      uk: "Замок на вхідних дверях",
      en: "Entry-door lock",
    },
    observation: {
      uk: "На накладці замка немає слідів примусового відкриття. Двері відчиняли ключ-карткою або зсередини.",
      en: "There are no signs of forced entry on the lock plate. The door was opened with a keycard or from inside.",
    },
  },
  {
    id: "scene-002-work-desk",
    locationId: "room-714",
    position: {
      x: 66,
      y: 68,
    },
    title: {
      uk: "Робочий стіл Марти",
      en: "Marta's desk",
    },
    observation: {
      uk: "Ноутбук заблокований, а на столі лежить роздрукований список підрядників. Один рядок виділено маркером.",
      en: "The laptop is locked, and a printed list of contractors lies on the desk. One line is highlighted.",
    },
  },
  {
    id: "scene-003-panoramic-wall",
    locationId: "room-714",
    position: {
      x: 83,
      y: 24,
    },
    title: {
      uk: "Панорамна скляна стіна",
      en: "Panoramic glass wall",
    },
    observation: {
      uk: "Скло ціле. На підвіконні — свіжа волога смуга, ніби вікно ненадовго відчиняли попри нічний холод.",
      en: "The glass is intact. A fresh damp streak on the sill suggests the window was briefly opened despite the night cold.",
    },
  },
  {
    id: "scene-004-inner-wall",
    locationId: "room-714",
    position: {
      x: 45,
      y: 37,
    },
    title: {
      uk: "Внутрішня стіна біля крісла",
      en: "Inner wall by the armchair",
    },
    observation: {
      uk: "За низькою тумбою застряг тонкий уламок загартованого скла зі слідом крові. Він не міг потрапити сюди випадково.",
      en: "A thin shard of tempered glass with a blood trace is caught behind the low cabinet. It could not have ended up here by accident.",
    },
    evidenceId: "ev-006-glass-shard",
  },
] satisfies SceneExaminationPoint[];