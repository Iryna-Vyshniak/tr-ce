import type { CasePerson } from "../../../features/cases/types/case.types";

export const case001People = [
  {
    id: "marta-chorna",
    name: {
      uk: "Марта Чорна",
      en: "Marta Chorna",
    },
    role: "victim",
    occupation: {
      uk: "Журналістка-розслідувачка",
      en: "Investigative journalist",
    },
    connection: {
      uk: "Гостя номера 714",
      en: "Guest in room 714",
    },
    profile: {
      uk: "Готувала матеріал про непрозорі контракти з реконструкції Подолу. Після 23:47 її не бачили.",
      en: "She was preparing a report on opaque Podil redevelopment contracts. No one saw her after 23:47.",
    },
  },
  {
    id: "andrii-holub",
    name: {
      uk: "Андрій Голуб",
      en: "Andrii Holub",
    },
    role: "suspect",
    occupation: {
      uk: "Керівник служби безпеки готелю",
      en: "Hotel security supervisor",
    },
    connection: {
      uk: "Першим заявив, що номер заблоковано",
      en: "First to report that the room was sealed",
    },
    profile: {
      uk: "Мав доступ до майстер-картки й журналу блокування. Наполягає, що після 23:35 ніхто не міг увійти до номера.",
      en: "He had access to the master keycard and the lock log. He insists no one could enter after 23:35.",
    },
  },
  {
    id: "nina-orlenko",
    name: {
      uk: "Ніна Орленко",
      en: "Nina Orlenko",
    },
    role: "suspect",
    occupation: {
      uk: "Офіціантка обслуговування номерів",
      en: "Room-service attendant",
    },
    connection: {
      uk: "Оформлювала замовлення до номера 714",
      en: "Processed the order for room 714",
    },
    profile: {
      uk: "Каже, що залишила тацю в коридорі й не торкалася дверей. Її обліковий запис створив чек о 23:47.",
      en: "She says she left the tray in the corridor and never touched the door. Her account generated a receipt at 23:47.",
    },
  },
  {
    id: "oleh-bereza",
    name: {
      uk: "Олег Береза",
      en: "Oleh Bereza",
    },
    role: "suspect",
    occupation: {
      uk: "Девелопер",
      en: "Property developer",
    },
    connection: {
      uk: "Зустрічався з Мартою перед зникненням",
      en: "Met Marta before her disappearance",
    },
    profile: {
      uk: "Стверджує, що пішов о 23:28. Телефон зафіксувався біля службового ліфта значно пізніше.",
      en: "He says he left at 23:28. His phone checked in near the service lift much later.",
    },
  },
  {
    id: "viktoriia-senyk",
    name: {
      uk: "Вікторія Сеник",
      en: "Viktoriia Senyk",
    },
    role: "suspect",
    occupation: {
      uk: "Асистентка Марти",
      en: "Marta's assistant",
    },
    connection: {
      uk: "Остання, хто говорила з Мартою телефоном",
      en: "Last person to speak with Marta by phone",
    },
    profile: {
      uk: "Чула напружену розмову близько 23:40. Не може пояснити, чому забрала резервний ключ із рецепції вдень.",
      en: "She heard a tense conversation around 23:40. She cannot explain why she collected a spare key from reception that afternoon.",
    },
  },
] satisfies CasePerson[];
