export const en = {
  navigation: {
    hq: 'HQ',
    cases: 'Cases',
    archive: 'Archive',
  },

  system: {
    label: 'System',
    online: 'Online',
  },

  hq: {
    eyebrow: 'Detective Headquarters',
    title: 'Follow the evidence.',
    description:
      'Every statement leaves a trace. Every trace creates a connection. Examine the evidence, question the story, and decide what really happened.',
    activeCases: 'Active cases',
    evidence: 'Evidence',
    contradictions: 'Contradictions',
  },

  case: {
    case: 'Case',
    active: 'Active',
    pending: 'Pending',
    solved: 'Solved',
    archived: 'Archived',

    classification: 'Classification',
    location: 'Location',
    reportedTime: 'Reported time',

    openCase: 'Open case',

    evidence: 'Evidence',
    suspects: 'Suspects',
    conflicts: 'Conflicts',

    investigation: 'Investigation',
    latestTrace: 'Latest trace',

    workspace: {
      backToHQ: 'Back to HQ',
      overview: 'Overview',
      evidence: 'Evidence',
      people: 'People',
      timeline: 'Timeline',
      board: 'Board',
      progress: 'Case progress',
      interrogation: 'Interrogation',
      scene: 'Scene examination',
      theory: 'Theory',
    },

    evidenceWorkspace: {
      eyebrow: 'Evidence archive',
      title: 'Available material',
      description:
        'New material will unlock through location searches, theory checks, and interrogations.',
      discovered: 'Discovered',
      undiscovered: 'Undiscovered',
      foundAt: 'Recorded at',
      location: 'Location',
      relatedPeople: 'Related people',
      status: {
        verified: 'Verified',
        lead: 'Needs review',
      },
    },

    sceneWorkspace: {
      eyebrow: 'Location examination',
      title: 'Room 714',
      description:
        'Examine the room in sequence. Not every detail is evidence, but each one can change your version of events.',
      roomLabel: 'Room 714 layout',
      examined: 'Examined',
      selectedPoint: 'Examination point',
      observation: 'Observation',
      examine: 'Examine',
      selectPoint: 'Select a point on the layout to begin examining the room.',
      materialUnlocked:
        'New physical evidence has been added to the archive.',
    },

    peopleWorkspace: {
      eyebrow: 'People dossier',
      title: 'People in the case',
      description:
        'Compare connections, profiles, and statements. A mismatch between words and facts may be the key to the case.',
      connection: 'Connection to the case',
      statements: 'Recorded statements',
      noStatements: 'There are no recorded statements from this person yet.',
      claimedTime: 'Claimed time',
      recordedAt: 'Recorded at',
      roles: {
        victim: 'Victim',
        suspect: 'Suspect',
        witness: 'Witness',
        'person-of-interest': 'Person of interest',
      },
    },
    interrogationWorkspace: {
      eyebrow: 'Interrogation room',
      title: 'Ask a question',
      description:
        "A statement is not the truth; it is a person's version. Compare answers with evidence and record new leads.",
      targets: 'Interrogation targets',
      availableQuestions: 'Available questions',
      question: 'Question',
      response: 'Response',
      askQuestion: 'Ask question',
      noQuestions:
        'There are no available questions for this person yet. Review other case material.',
      materialUnlocked: 'New material has been added to the evidence archive.',
    },

    theoryWorkspace: {
      eyebrow: 'Theory builder',
      title: 'Build your version',
      description:
        'Choose a suspect, a motive, and the material that supports your version. A draft is not yet an accusation.',
      autosave: 'Your theory draft is saved automatically in this case.',
      suspect: 'Primary suspect',
      motive: 'Possible motive',
      supportingEvidence: 'Supporting evidence',
      timeline: 'Key events',
      rejectedEvidence: 'Rejected leads',
      rationale: 'Rationale',
      rationalePlaceholder:
        'Explain how the selected evidence, motive, and timeline account for Marta’s disappearance.',
    },

    timelineWorkspace: {
      eyebrow: 'Event timeline',
      title: 'Reconstructed sequence',
      description:
        'Events become available only when they can be supported by discovered case material.',
      reconstructed: 'Reconstructed',
      hidden: 'Hidden',
      relatedPeople: 'Related people',
      relatedEvidence: 'Related evidence',
      noEvidence: 'None',
      status: {
        confirmed: 'Confirmed',
        disputed: 'Disputed',
        inferred: 'Inferred',
      },
    },

    boardWorkspace: {
      eyebrow: 'Detective board',
      title: 'Build your own theory',
      description:
        'Create connections between available people, evidence, and events. The board records your theory, but does not tell you whether it is correct.',
      availableCards: 'Available cards',
      selectionHint:
        'Select the first card, then the second one. Selecting the first card again clears it.',
      connectionBuilder: 'New connection',
      source: 'First card',
      target: 'Second card',
      notSelected: 'Not selected',
      relation: 'Connection type',
      createConnection: 'Create connection',
      connections: 'Created connections',
      noConnections: 'The board is empty. Create your first connection between available material.',
      removeConnection: 'Remove',
      nodeTypes: {
        person: 'Person',
        evidence: 'Evidence',
        event: 'Event',
      },
      relations: {
        knows: 'knows',
        'was-at': 'was at',
        contradicts: 'contradicts',
        owns: 'owns',
        motive: 'has a motive',
        alibi: 'has an alibi',
      },
    },
  },
} as const;
