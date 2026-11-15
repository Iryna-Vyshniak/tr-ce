export const uk = {
  navigation: {
    ariaLabel: 'Головна навігація',
    hq: 'Бюро',
    cases: 'Справи',
    archive: 'Архів',
  },

  system: {
    label: 'Система',
    online: 'Онлайн',
  },

  hq: {
    eyebrow: 'Детективне бюро',
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
      backToHQ: 'Повернутися до бюро',
      overview: 'Огляд',
      evidence: 'Докази',
      people: 'Особи',
      timeline: 'Хронологія',
      board: 'Дошка',
      progress: 'Прогрес справи',
      interrogation: 'Допит',
      scene: 'Огляд місця',
      theory: 'Теорія',
      report: 'Звіт',
    },

    evidenceWorkspace: {
      eyebrow: 'Картотека доказів',
      title: 'Доступні матеріали',
      description:
        'Нові матеріали відкриватимуться під час огляду локацій, перевірки версій і допитів.',
      discovered: 'Відкрито',
      undiscovered: 'Не виявлено',
      foundAt: 'Зафіксовано',
      location: 'Локація',
      relatedPeople: 'Пов’язані особи',
      status: {
        verified: 'Перевірено',
        lead: 'Потребує перевірки',
      },
    },

    sceneWorkspace: {
      eyebrow: 'Огляд локації',
      title: 'Номер 714',
      description:
        'Вивчай кімнату послідовно. Не кожна деталь є доказом, але кожна може змінити твою версію подій.',
      roomLabel: 'Схема номера 714',
      examined: 'Оглянуто',
      selectedPoint: 'Точка огляду',
      observation: 'Спостереження',
      examine: 'Оглянути',
      selectPoint: 'Обери точку на схемі, щоб почати огляд.',
      materialUnlocked:
        'Новий речовий доказ додано до картотеки.',
    },

    peopleWorkspace: {
      eyebrow: 'Досьє осіб',
      title: 'Особи у справі',
      description:
        'Порівнюй зв’язки, профілі та показання. Розбіжність між словами й фактами може стати ключем до справи.',
      connection: 'Зв’язок зі справою',
      statements: 'Зафіксовані показання',
      noStatements: 'Для цієї особи ще немає зафіксованих показань.',
      claimedTime: 'Заявлений час',
      recordedAt: 'Записано',
      roles: {
        victim: 'Потерпіла',
        suspect: 'Підозрюваний',
        witness: 'Свідок',
        'person-of-interest': 'Особа інтересу',
      },
    },
        interrogationWorkspace: {
      eyebrow: "Кімната допиту",
      title: "Постав питання",
      description:
        "Показання — це не істина, а версія людини. Порівнюй відповіді з доказами та фіксуй нові зачіпки.",
      targets: "Особи для допиту",
      availableQuestions: "Доступні питання",
      question: "Питання",
      response: "Відповідь",
      askQuestion: "Поставити питання",
      noQuestions:
        "Для цієї особи поки немає доступних питань. Перевір інші матеріали справи.",
      materialUnlocked:
        "Новий матеріал додано до картотеки доказів.",
    },

    theoryWorkspace: {
      eyebrow: 'Конструктор теорії',
      title: 'Збери власну версію',
      description:
        'Обери підозрюваного, мотив і матеріали, які підтримують твою версію. Чернетка ще не є обвинуваченням.',
      autosave: 'Чернетка теорії зберігається автоматично в цій справі.',
      suspect: 'Головний підозрюваний',
      motive: 'Ймовірний мотив',
      supportingEvidence: 'Докази на підтримку',
      timeline: 'Ключові події',
      rejectedEvidence: 'Контрдокази та обмеження',
      alternativeHypotheses: 'Конкурентні гіпотези',
      alternativeHypothesesDescription:
        'Познач реалістичні альтернативи, які ще потребують пояснення у звіті.',
      rationale: 'Обґрунтування',
      rationalePlaceholder:
        'Опиши, як обрані докази, мотив і хронологія пояснюють зникнення Марти.',
      finalized:
        'Звіт уже зафіксовано. Ця чернетка лишається доступною лише для читання.',
    },

    reportWorkspace: {
      eyebrow: 'Фінальний case report',
      title: 'Перевір і зафіксуй висновок',
      description:
        'Клієнт перевіряє повноту та походження матеріалів. Він не знає Ground Truth і не оцінює, чи висновок є правильним.',
      readiness: 'Готовність до review',
      complete: 'Усі вимоги до структури звіту виконані.',
      incomplete: 'Доповни обов’язкові елементи перед фіксацією звіту.',
      requirements: {
        subject: 'Визначено суб’єкта claim',
        motive: 'Позначено мотив або інтерес',
        evidence: 'Є щонайменше два перевірені докази',
        timeline: 'Обрано підтверджену подію хронології',
        countercase: 'Розглянуто альтернативу або контрдоказ',
        graph: 'Граф пов’язує claim з обраним доказом',
        rationale: 'Обґрунтування містить щонайменше 120 символів',
      },
      finalize: 'Зафіксувати case report',
      finalizationNote:
        'Після фіксації створюється незмінний локальний snapshot. Для нового висновку потрібна нова версія report.',
      reportLocked: 'Case report зафіксовано',
      reportId: 'Ідентифікатор snapshot',
      createdAt: 'Зафіксовано',
      policy: 'Політика',
      evidenceGraph: 'Ланцюг обґрунтування',
      source: 'Джерело',
      observation: 'Спостереження',
      inference: 'Інтерпретація',
      conclusion: 'Висновок',
      noEvidence: 'У snapshot немає обраних доказів.',
      primaryClaim: 'Основний claim',
      alternatives: 'Розглянуті альтернативи',
      limitations: 'Контрдокази та обмеження',
      noAlternatives: 'Не зафіксовано',
      groundTruthBoundary:
        'Ground Truth ізольовано поза клієнтом. Остаточна звірка можлива лише у захищеному серверному контурі.',
    },

    timelineWorkspace: {
      eyebrow: 'Хронологія подій',
      title: 'Відновлена послідовність',
      description:
        'Події стають доступними лише тоді, коли їх можна обґрунтувати відкритими матеріалами справи.',
      reconstructed: 'Відновлено',
      hidden: 'Приховано',
      relatedPeople: 'Пов’язані особи',
      relatedEvidence: 'Пов’язані докази',
      noEvidence: 'Немає',
      status: {
        confirmed: 'Підтверджено',
        disputed: 'Суперечливо',
        inferred: 'Відтворено',
      },
    },

    boardWorkspace: {
      eyebrow: 'Детективна дошка',
      title: 'Побудуй власну версію',
      description:
        'Створюй зв’язки між доступними особами, доказами та подіями. Дошка фіксує твою версію, але не підказує, чи вона правильна.',
      availableCards: 'Доступні картки',
      selectionHint:
        'Обери першу картку, потім другу. Повторне натискання на першу скасовує вибір.',
      connectionBuilder: 'Новий зв’язок',
      source: 'Перша картка',
      target: 'Друга картка',
      notSelected: 'Не обрано',
      relation: 'Тип зв’язку',
      createConnection: 'Створити зв’язок',
      connections: 'Побудовані зв’язки',
      noConnections: 'Дошка ще порожня. Побудуй перший зв’язок між доступними матеріалами.',
      removeConnection: 'Видалити',
      nodeTypes: {
        person: 'Особа',
        evidence: 'Доказ',
        event: 'Подія',
      },
      relations: {
        knows: 'знає',
        'was-at': 'був / була в',
        contradicts: 'суперечить',
        owns: 'володіє',
        motive: 'має мотив',
        alibi: 'має алібі',
      },
    },
  },
} as const;
