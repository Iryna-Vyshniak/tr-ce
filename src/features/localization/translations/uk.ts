export const uk = {
  navigation: {
    hq: "Бюро",
    cases: "Справи",
    archive: "Архів",
  },

  system: {
    label: "Система",
    online: "Онлайн",
  },

  hq: {
    eyebrow: "Детективне бюро",
    title: "Йди за доказами.",
    description:
      "Кожне свідчення залишає слід. Кожен слід створює зв’язок. Досліджуй докази, став під сумнів версії та з’ясуй, що сталося насправді.",
    activeCases: "Активні справи",
    evidence: "Докази",
    contradictions: "Суперечності",
  },

  case: {
    case: "Справа",
    active: "Активна",
    pending: "Очікує",
    solved: "Розкрита",
    archived: "Архівна",

    classification: "Класифікація",
    location: "Локація",
    reportedTime: "Час події",

    openCase: "Відкрити справу",

    evidence: "Докази",
    suspects: "Підозрювані",
    conflicts: "Суперечності",

    investigation: "Розслідування",
    latestTrace: "Останній слід",

    workspace: {
      backToHQ: "Повернутися до штабу",
      overview: "Огляд",
      evidence: "Докази",
      people: "Особи",
      timeline: "Хронологія",
      board: "Дошка",
      progress: "Прогрес справи",
    },

    evidenceWorkspace: {
      eyebrow: "Картотека доказів",
      title: "Доступні матеріали",
      description:
        "Нові матеріали відкриватимуться під час огляду локацій, перевірки версій і допитів.",
      discovered: "Відкрито",
      undiscovered: "Не виявлено",
      foundAt: "Зафіксовано",
      location: "Локація",
      relatedPeople: "Пов’язані особи",
      status: {
        verified: "Перевірено",
        lead: "Потребує перевірки",
      },
    },
  },
} as const;