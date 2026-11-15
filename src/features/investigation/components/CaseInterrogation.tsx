import { useState } from "react";

import { PortraitModal } from "../../../components/PortraitModal";
import { activeCaseFile } from "../../cases/data/activeCase";
import { personPortraits } from "../../cases/data/personPortraits";
import { useCaseProgress } from "../../cases/engine/useCaseProgress";
import { useLocale } from "../../localization/hooks/useLocale";
import { InterrogationAudioPlayer } from "./InterrogationAudioPlayer";
import { interrogationAudio } from "../data/interrogationAudio";

const waveformBars = [
  34, 52, 74, 44, 88, 60, 38, 70, 48, 80, 42, 62,
];

export function CaseInterrogation() {
  const { locale, t } = useLocale();
  const { progress, askInterrogationTopic } = useCaseProgress();
  const suspects = activeCaseFile.people.filter(
    (person) => person.role === "suspect",
  );

  const [selectedPersonId, setSelectedPersonId] = useState(() => {
    const firstPersonWithOpenTopic = activeCaseFile.people.find((person) =>
      activeCaseFile.interrogationTopics.some(
        (topic) =>
          topic.personId === person.id &&
          topic.requiredEvidenceIds.length === 0,
      ),
    );

    return firstPersonWithOpenTopic?.id ?? suspects[0]?.id ?? "";
  });

  const [lastUnlockedEvidenceIds, setLastUnlockedEvidenceIds] = useState<
    string[]
  >([]);
  const [isPortraitOpen, setIsPortraitOpen] = useState(false);
  const [playingTopicId, setPlayingTopicId] = useState<string | null>(null);

  const selectedPerson = activeCaseFile.people.find(
    (person) => person.id === selectedPersonId,
  );

  const personTopics = activeCaseFile.interrogationTopics.filter(
    (topic) => topic.personId === selectedPersonId,
  );

  const availableTopics = personTopics.filter((topic) =>
    topic.requiredEvidenceIds.every((evidenceId) =>
      progress.discoveredEvidenceIds.includes(evidenceId),
    ),
  );

  function handleAskQuestion(topicId: string) {
    setPlayingTopicId(null);
    const newEvidenceIds = askInterrogationTopic(
      selectedPersonId,
      topicId,
    );

    setLastUnlockedEvidenceIds(newEvidenceIds);
  }

  return (
    <section className="trce-interrogation" aria-labelledby="case-interrogation-title">
      <div className="section-heading-spacing border-b border-border">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-evidence">
          {t.case.interrogationWorkspace.eyebrow}
        </p>

        <h2
          id="case-interrogation-title"
          className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl"
        >
          {t.case.interrogationWorkspace.title}
        </h2>

        <p className="mt-5 max-w-3xl text-base leading-7 text-foreground-secondary">
          {t.case.interrogationWorkspace.description}
        </p>
      </div>

      <div className="section-content-spacing content-gap grid xl:grid-cols-[19rem_minmax(0,1fr)]">
        <aside>
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t.case.interrogationWorkspace.targets}
          </p>

          <div className="mt-4 grid gap-3">
            {suspects.map((person) => {
              const isSelected = person.id === selectedPersonId;

              return (
                <button
                  key={person.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedPersonId(person.id);
                    setLastUnlockedEvidenceIds([]);
                    setPlayingTopicId(null);
                  }}
                  className={[
                    "trce-interrogation-target text-left",
                    isSelected
                      ? "trce-interrogation-target--selected"
                      : "",
                  ].join(" ")}
                >
                  <span className="trce-interrogation-target__content">
                    <img
                      alt=""
                      className="trce-interrogation-target__portrait"
                      src={personPortraits[person.id]}
                    />

                    <span className="min-w-0">
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                        {person.occupation[locale]}
                      </span>

                      <span className="mt-2 block font-display text-3xl font-bold uppercase leading-none tracking-[-0.025em]">
                        {person.name[locale]}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="trce-interrogation-stage card-spacing border border-border">
          {selectedPerson && (
            <>
              <div className="border-b border-border-subtle pb-5">
                <div className="trce-interrogation-person">
                  <button
                    aria-label={`${t.case.peopleWorkspace.viewPortrait}: ${selectedPerson.name[locale]}`}
                    className="trce-person-portrait-button"
                    onClick={() => setIsPortraitOpen(true)}
                    type="button"
                  >
                    <img
                      alt=""
                      className="trce-interrogation-portrait"
                      src={personPortraits[selectedPerson.id]}
                    />
                  </button>

                  <div>
                    <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
                      {t.case.interrogationWorkspace.availableQuestions}
                    </p>

                    <h3 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-[-0.025em]">
                      {selectedPerson.name[locale]}
                    </h3>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground-secondary">
                      {selectedPerson.profile[locale]}
                    </p>

                    <div
                      aria-hidden="true"
                      className={[
                        "trce-interrogation-waveform",
                        playingTopicId ? "trce-interrogation-waveform--active" : "",
                      ].join(" ")}
                    >
                      {waveformBars.map((height, index) => (
                        <span
                          key={index}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {lastUnlockedEvidenceIds.length > 0 && (
                <p
                  className="mt-5 border-l-2 border-signal bg-signal/10 px-4 py-3 text-sm leading-6 text-signal"
                  role="status"
                >
                  {t.case.interrogationWorkspace.materialUnlocked}
                </p>
              )}

              {availableTopics.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {availableTopics.map((topic) => {
                    const hasBeenAsked =
                      progress.askedInterrogationTopicIds.includes(topic.id);
                    const audioClip = interrogationAudio[topic.id]?.[locale];

                    return (
                      <article
                        key={topic.id}
                        className="trce-interrogation-topic"
                      >
                        <div className="trce-dialogue trce-dialogue-player">
                          <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-signal">
                            {t.case.interrogationWorkspace.question}
                          </p>

                          <p className="mt-3 text-base leading-7 text-foreground">
                            {topic.question[locale]}
                          </p>
                        </div>

                        {hasBeenAsked ? (
                          <div className="trce-dialogue trce-dialogue-character mt-4">
                            <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-evidence">
                              {t.case.interrogationWorkspace.response}
                            </p>

                            <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                              {topic.response[locale]}
                            </p>

                            {audioClip && (
                              <InterrogationAudioPlayer
                                clip={audioClip}
                                isPlaying={playingTopicId === topic.id}
                                listenLabel={t.case.interrogationWorkspace.listenResponse}
                                onPlayingChange={(isPlaying) => {
                                  setPlayingTopicId((currentTopicId) => {
                                    if (isPlaying) {
                                      return topic.id;
                                    }

                                    return currentTopicId === topic.id
                                      ? null
                                      : currentTopicId;
                                  });
                                }}
                                pauseLabel={t.case.interrogationWorkspace.pauseResponse}
                                progressLabel={t.case.interrogationWorkspace.audioProgress}
                                unavailableLabel={t.case.interrogationWorkspace.audioUnavailable}
                              />
                            )}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAskQuestion(topic.id)}
                            className="mt-5 min-h-11 border border-evidence bg-evidence/10 px-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-evidence transition-colors duration-200 hover:bg-evidence hover:text-background"
                          >
                            {t.case.interrogationWorkspace.askQuestion}
                          </button>
                        )}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-6 border border-dashed border-border p-5 text-sm leading-6 text-muted-foreground">
                  {t.case.interrogationWorkspace.noQuestions}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {selectedPerson && (
        <PortraitModal
          alt={`${selectedPerson.name[locale]} — ${selectedPerson.occupation[locale]}`}
          closeLabel={t.case.peopleWorkspace.closePortrait}
          isOpen={isPortraitOpen}
          onClose={() => setIsPortraitOpen(false)}
          src={personPortraits[selectedPerson.id]}
        />
      )}
    </section>
  );
}
