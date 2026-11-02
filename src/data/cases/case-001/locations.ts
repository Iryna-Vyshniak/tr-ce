import type { CaseLocation } from "../../../features/cases/types/case.types";

export const case001Locations = [
  {
    id: "room-714",
    name: {
      uk: "Номер 714",
      en: "Room 714",
    },
    description: {
      uk: "Кутовий номер із панорамною скляною стіною та одним входом із коридору сьомого поверху.",
      en: "A corner room with a panoramic glass wall and a single entrance from the seventh-floor corridor.",
    },
    relevance: {
      uk: "Звідси зникла Марта; електронний замок показує суперечливу послідовність подій.",
      en: "Marta disappeared from here; the electronic lock shows a contradictory sequence of events.",
    },
  },
  {
    id: "seventh-floor-corridor",
    name: {
      uk: "Коридор сьомого поверху",
      en: "Seventh-floor corridor",
    },
    description: {
      uk: "Камера в коридорі не бачить нішу перед дверима 714, де працівники залишають таці.",
      en: "The corridor camera misses the alcove outside room 714 where staff leave trays.",
    },
    relevance: {
      uk: "Тут знайшли тацю з недоторканим чаєм і частковий відбиток пальця.",
      en: "The tray with untouched tea and a partial fingerprint were found here.",
    },
  },
  {
    id: "service-elevator",
    name: {
      uk: "Службовий ліфт",
      en: "Service lift",
    },
    description: {
      uk: "Ведення ліфта не потрапляє до гостьового фоє та працює за картками персоналу.",
      en: "This lift bypasses the guest lobby and operates with staff keycards.",
    },
    relevance: {
      uk: "Тут востаннє зафіксували телефон Олега після часу, коли він нібито залишив готель.",
      en: "Oleh's phone was last detected here after the time he claims to have left the hotel.",
    },
  },
  {
    id: "security-office",
    name: {
      uk: "Пост охорони",
      en: "Security office",
    },
    description: {
      uk: "Приміщення з консоллю блокування номерів, журналом майстер-карток і резервним відеосервером.",
      en: "A room with the lock console, the master-keycard log, and a backup video server.",
    },
    relevance: {
      uk: "Тут Андрій зафіксував блокування номера о 23:35.",
      en: "Andrii recorded the room lock here at 23:35.",
    },
  },
] satisfies CaseLocation[];
