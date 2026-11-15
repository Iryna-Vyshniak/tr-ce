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
        verified: 'Підтверджений матеріал',
        lead: 'Зачіпка',
      },
      inspectionHint:
        'Відкрий матеріал, щоб переглянути його зміст і походження.',
      inspect: 'Оглянути матеріал',
      finishInspection: 'Завершити огляд',
      inspected: 'Огляд завершено',
      materialUnlocked: 'Новий матеріал додано до картотеки доказів.',
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
      viewPortrait: 'Відкрити портрет',
      closePortrait: 'Закрити портрет',
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
      listenResponse: "Прослухати відповідь",
      pauseResponse: "Призупинити відповідь",
      audioProgress: "Хід відтворення відповіді",
      audioUnavailable: "Запис відповіді тимчасово недоступний.",
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
      autosave: 'Твоя версія зберігається в матеріалах справи.',
      suspect: 'Головний підозрюваний',
      motive: 'Ймовірний мотив',
      observations: 'Перевірені спостереження',
      supportingEvidence: 'Докази на підтримку',
      interpretations: 'Інтерпретації',
      interpretationsDescription:
        'Інтерпретація пояснює, що можуть означати спостереження. Це ще не встановлений факт.',
      groundedIn: 'Спирається на',
      noInterpretations:
        'Заверши огляд пов’язаних матеріалів, щоб з’явилися обґрунтовані інтерпретації.',
      supportsHypothesis: 'Підтримують версію',
      challengesHypothesis: 'Ставлять версію під сумнів',
      noSupport: 'Поки немає перевірених підстав',
      noChallenges: 'Поки не виявлено',
      timeline: 'Ключові події',
      rejectedEvidence: 'Контрдокази та обмеження',
      alternativeHypotheses: 'Конкурентні гіпотези',
      alternativeHypothesesDescription:
        'Познач реалістичні альтернативи, які ще потребують пояснення у звіті.',
      rationale: 'Обґрунтування',
      rationalePlaceholder:
        'Опиши, як обрані докази, мотив і хронологія пояснюють зникнення Марти.',
      finalized: 'Висновок уже збережено. Цю версію більше не можна змінити.',
    },

    reportWorkspace: {
      eyebrow: 'Підсумок справи',
      title: 'Зроби висновок',
      description:
        'Збери версію подій, яку витримують докази.',
      readiness: 'Що ще перевірити',
      complete: 'Твою версію можна зберегти.',
      incomplete: 'Додай відсутні деталі, перш ніж зберегти висновок.',
      requirements: {
        subject: 'Визначено, на кого вказують докази',
        motive: 'Визначено можливий мотив',
        evidence: 'Обрано щонайменше два оглянуті докази',
        interpretation: 'Обрано інтерпретацію, що спирається на оглянуті спостереження',
        timeline: 'Додано подію з хронології',
        countercase: 'Враховано альтернативу або контрдоказ',
        graph: 'Граф проводить шлях: спостереження → інтерпретація → висновок',
        rationale: 'Додано обґрунтування версії',
      },
      finalize: 'Зберегти висновок',
      finalizationNote: 'Збережений висновок уже не змінити.',
      reportLocked: 'Висновок збережено',
      evidenceGraph: 'Ланцюг доказів',
      source: 'Доказ',
      observation: 'Що ми знаємо',
      inference: 'Як це підтримує версію',
      conclusion: 'Висновок',
      noEvidence: 'У цій версії не вибрано доказів.',
      primaryConclusion: 'Твій висновок',
      alternatives: 'Інші версії',
      limitations: 'Що не збігається',
      noAlternatives: 'Не зафіксовано',
      reviewReminder:
        'Перевір усі зв’язки: сильна версія пояснює і докази, і сумніви.',
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
      eyebrow: 'Граф доказів',
      title: 'Простеж шлях до висновку',
      description:
        'Поєднуй спостереження з інтерпретаціями, а інтерпретації — з людьми та подіями. Не стрибай від доказу прямо до висновку.',
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
        interpretation: 'Інтерпретація',
        event: 'Подія',
      },
      relations: {
        knows: 'знає',
        'was-at': 'був / була в',
        contradicts: 'суперечить',
        owns: 'володіє',
        motive: 'має мотив',
        alibi: 'має алібі',
        supports: 'підтримує',
        explains: 'пояснює',
      },
    },
  },
} as const;
