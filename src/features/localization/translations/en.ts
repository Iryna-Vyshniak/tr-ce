export const en = {
  navigation: {
    hq: "HQ",
    cases: "Cases",
    archive: "Archive",
  },

  system: {
    label: "System",
    online: "Online",
  },

  hq: {
    eyebrow: "Detective Headquarters",
    title: "Follow the evidence.",
    description:
      "Every statement leaves a trace. Every trace creates a connection. Examine the evidence, question the story, and decide what really happened.",
    activeCases: "Active cases",
    evidence: "Evidence",
    contradictions: "Contradictions",
  },

  case: {
    case: "Case",
    active: "Active",
    pending: "Pending",
    solved: "Solved",
    archived: "Archived",

    classification: "Classification",
    location: "Location",
    reportedTime: "Reported time",

    openCase: "Open case",

    evidence: "Evidence",
    suspects: "Suspects",
    conflicts: "Conflicts",

    investigation: "Investigation",
    latestTrace: "Latest trace",

    workspace: {
      backToHQ: "Back to HQ",
      overview: "Overview",
      evidence: "Evidence",
      people: "People",
      timeline: "Timeline",
      board: "Board",
      progress: "Case progress",
    },

    evidenceWorkspace: {
      eyebrow: "Evidence archive",
      title: "Available material",
      description:
        "New material will unlock through location searches, theory checks, and interrogations.",
      discovered: "Discovered",
      undiscovered: "Undiscovered",
      foundAt: "Recorded at",
      location: "Location",
      relatedPeople: "Related people",
      status: {
        verified: "Verified",
        lead: "Needs review",
      },
    },

    peopleWorkspace: {
      eyebrow: "People dossier",
      title: "People in the case",
      description:
        "Compare connections, profiles, and statements. A mismatch between words and facts may be the key to the case.",
      connection: "Connection to the case",
      statements: "Recorded statements",
      noStatements: "There are no recorded statements from this person yet.",
      claimedTime: "Claimed time",
      recordedAt: "Recorded at",
      roles: {
        victim: "Victim",
        suspect: "Suspect",
        witness: "Witness",
        "person-of-interest": "Person of interest",
      },
    },
  },
} as const;