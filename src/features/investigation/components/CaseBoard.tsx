import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

import { activeCaseFile } from "../../cases/data/activeCase";
import { getNewEvidenceUnlocks } from "../../cases/engine/resolveEvidenceUnlocks";
import { useCaseProgress } from "../../cases/engine/useCaseProgress";
import type { InvestigationBoardLink } from "../../cases/engine/caseProgress.types";
import { useLocale } from "../../localization/hooks/useLocale";

type BoardNodeKind = "person" | "evidence" | "event";

interface BoardNode {
  id: string;
  label: string;
  kind: BoardNodeKind;
}

const relationOptions: InvestigationBoardLink["relation"][] = [
  "knows",
  "was-at",
  "contradicts",
  "owns",
  "motive",
  "alibi",
];

const nodeKindStyles: Record<BoardNodeKind, string> = {
  person: "text-foreground",
  evidence: "text-evidence",
  event: "text-signal",
};

export function CaseBoard() {
  const { locale, t } = useLocale();
  const { progress, setProgress } = useCaseProgress();

  const [sourceId, setSourceId] = useState<string | null>(null);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [relation, setRelation] =
    useState<InvestigationBoardLink["relation"]>("knows");

  const discoveredEvidenceIds = new Set(progress.discoveredEvidenceIds);

  const visibleEvidence = activeCaseFile.evidence.filter((evidence) =>
    discoveredEvidenceIds.has(evidence.id),
  );

  const visibleTimelineEvents = activeCaseFile.timeline.filter((event) =>
    event.relatedEvidenceIds.every((evidenceId) =>
      discoveredEvidenceIds.has(evidenceId),
    ),
  );

  const personNodes = activeCaseFile.people.map<BoardNode>((person) => ({
    id: person.id,
    label: person.name[locale],
    kind: "person",
  }));

  const evidenceNodes = visibleEvidence.map<BoardNode>((evidence) => ({
    id: evidence.id,
    label: `${evidence.catalogNumber} — ${evidence.title[locale]}`,
    kind: "evidence",
  }));

  const eventNodes = visibleTimelineEvents.map<BoardNode>((event) => ({
    id: event.id,
    label: `${event.occurredAt} — ${event.title[locale]}`,
    kind: "event",
  }));

  const nodes = [...personNodes, ...evidenceNodes, ...eventNodes];

  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  const sourceLabel = sourceId
    ? nodeById.get(sourceId)?.label ?? sourceId
    : t.case.boardWorkspace.notSelected;

  const targetLabel = targetId
    ? nodeById.get(targetId)?.label ?? targetId
    : t.case.boardWorkspace.notSelected;

  const hasDuplicateLink =
    sourceId !== null &&
    targetId !== null &&
    progress.boardLinks.some(
      (link) =>
        ((link.sourceId === sourceId && link.targetId === targetId) ||
          (link.sourceId === targetId && link.targetId === sourceId)) &&
        link.relation === relation,
    );

  const canCreateLink =
    sourceId !== null &&
    targetId !== null &&
    sourceId !== targetId &&
    !hasDuplicateLink;

  function handleNodeClick(nodeId: string) {
    if (nodeId === sourceId) {
      setSourceId(null);
      return;
    }

    if (!sourceId || targetId) {
      setSourceId(nodeId);
      setTargetId(null);
      return;
    }

    setTargetId(nodeId);
  }

  function handleCreateLink() {
    if (!sourceId || !targetId || !canCreateLink) {
      return;
    }

    const newLink = {
      id: crypto.randomUUID(),
      sourceId,
      targetId,
      relation,
    } satisfies InvestigationBoardLink;

    const nextProgress = {
      ...progress,
      phase:
        progress.phase === "briefing"
          ? "investigating"
          : progress.phase,
      boardLinks: [...progress.boardLinks, newLink],
    };

    const newEvidenceIds = getNewEvidenceUnlocks(
      nextProgress,
      activeCaseFile.evidenceUnlockRules,
    );

    setProgress({
      ...nextProgress,
      discoveredEvidenceIds: [
        ...new Set([
          ...progress.discoveredEvidenceIds,
          ...newEvidenceIds,
        ]),
      ],
    });

    setSourceId(null);
    setTargetId(null);
  }

  function handleRemoveLink(linkId: string) {
    setProgress((currentProgress) => ({
      ...currentProgress,
      boardLinks: currentProgress.boardLinks.filter(
        (link) => link.id !== linkId,
      ),
    }));
  }

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="case-board-title">
        <div className="border-b border-border pb-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-evidence">
            {t.case.boardWorkspace.eyebrow}
          </p>

          <h2
            id="case-board-title"
            className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl"
          >
            {t.case.boardWorkspace.title}
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-7 text-foreground-secondary">
            {t.case.boardWorkspace.description}
          </p>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {t.case.boardWorkspace.availableCards}
            </p>

            <p className="mt-3 text-sm leading-6 text-foreground-secondary">
              {t.case.boardWorkspace.selectionHint}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {nodes.map((node) => {
                const isSource = node.id === sourceId;
                const isTarget = node.id === targetId;

                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    onClick={() => handleNodeClick(node.id)}
                    aria-pressed={isSource || isTarget}
                    layout
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={[
                      "min-h-28 border p-4 text-left transition-colors duration-200",
                      "focus-visible:relative focus-visible:z-10",
                      isSource
                        ? "border-signal bg-signal/10"
                        : isTarget
                          ? "border-evidence bg-evidence/10"
                          : "border-border bg-surface hover:border-foreground-secondary",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "font-mono text-[0.625rem] font-semibold uppercase tracking-[0.12em]",
                        nodeKindStyles[node.kind],
                      ].join(" ")}
                    >
                      {t.case.boardWorkspace.nodeTypes[node.kind]}
                    </span>

                    <span className="mt-3 block font-display text-2xl font-bold uppercase leading-none tracking-[-0.02em] text-foreground">
                      {node.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <aside className="border border-border bg-surface p-5 sm:p-6">
            <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
              {t.case.boardWorkspace.connectionBuilder}
            </p>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {t.case.boardWorkspace.source}
                </dt>

                <dd className="mt-2 text-sm leading-6 text-foreground">
                  {sourceLabel}
                </dd>
              </div>

              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {t.case.boardWorkspace.target}
                </dt>

                <dd className="mt-2 text-sm leading-6 text-foreground">
                  {targetLabel}
                </dd>
              </div>
            </dl>

            <label
              htmlFor="board-relation"
              className="mt-7 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {t.case.boardWorkspace.relation}
            </label>

            <select
              id="board-relation"
              value={relation}
              onChange={(event) =>
                setRelation(
                  event.target.value as InvestigationBoardLink["relation"],
                )
              }
              className="mt-2 min-h-11 w-full border border-border bg-background px-3 font-mono text-xs uppercase tracking-[0.08em] text-foreground"
            >
              {relationOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {t.case.boardWorkspace.relations[option]}
                </option>
              ))}
            </select>

            <motion.button
              type="button"
              onClick={handleCreateLink}
              disabled={!canCreateLink}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mt-5 flex min-h-11 w-full items-center justify-center bg-signal px-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-background transition-colors duration-200 hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.case.boardWorkspace.createConnection}
            </motion.button>
          </aside>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
            {t.case.boardWorkspace.connections}
          </p>

          {progress.boardLinks.length > 0 ? (
            <ol className="mt-5 grid gap-3">
              <AnimatePresence initial={false}>
                {progress.boardLinks.map((link) => {
                  const linkSource =
                    nodeById.get(link.sourceId)?.label ?? link.sourceId;

                  const linkTarget =
                    nodeById.get(link.targetId)?.label ?? link.targetId;

                  return (
                    <motion.li
                      key={link.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="flex flex-col gap-4 border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="text-sm leading-6 text-foreground">
                        <span>{linkSource}</span>

                        <span className="mx-2 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-evidence">
                          {t.case.boardWorkspace.relations[link.relation]}
                        </span>

                        <span>{linkTarget}</span>
                      </p>

                      <button
                        type="button"
                        onClick={() => handleRemoveLink(link.id)}
                        aria-label={[
                          t.case.boardWorkspace.removeConnection,
                          linkSource,
                          linkTarget,
                        ].join(": ")}
                        className="min-h-11 shrink-0 border border-border px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-200 hover:border-critical hover:text-critical"
                      >
                        {t.case.boardWorkspace.removeConnection}
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ol>
          ) : (
            <p className="mt-5 border border-dashed border-border p-5 text-sm leading-6 text-muted-foreground">
              {t.case.boardWorkspace.noConnections}
            </p>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}