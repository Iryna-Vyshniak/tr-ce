export const uk = {
  navigation: {
    hq: 'Штаб',
    cases: 'Справи',
    archive: 'Архів',
  },

  system: {
    label: 'Система',
    online: 'Онлайн',
  },

  hq: {
    eyebrow: 'Детективний штаб',
    title: 'Йди за доказами.',
    description:
      'Кожне свідчення залишає слід. Кожен слід створює зв’язок. Досліджуй докази, став під сумнів версії та з’ясуй, що сталося насправді.',
    activeCases: 'Активні справи',
    evidence: 'Докази',
    contradictions: 'Суперечності',
  },

  case: {
    case: 'Справа',
    active: 'Активна',
    pending: 'Очікує',
    solved: 'Розкрита',
    archived: 'Архівна',

    classification: 'Класифікація',
    location: 'Локація',
    reportedTime: 'Час події',

    openCase: 'Відкрити справу',

    evidence: 'Докази',
    suspects: 'Підозрювані',
    conflicts: 'Суперечності',

    investigation: 'Розслідування',
    latestTrace: 'Останній слід',

    workspace: {
      backToHQ: 'Повернутися до штабу',
      overview: 'Огляд',
      evidence: 'Докази',
      people: 'Особи',
      timeline: 'Хронологія',
      board: 'Дошка',
      progress: 'Прогрес справи',
    },
  },
} as const;
