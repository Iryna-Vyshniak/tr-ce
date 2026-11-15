import type { Locale } from "../../localization/localization.types";

export interface InterrogationAudioClip {
  src: string;
  duration: number;
}

export const interrogationAudio: Record<
  string,
  Record<Locale, InterrogationAudioClip>
> = {
  "int-001-oleh-departure": {
    uk: {
      src: "https://resource2.heygen.ai/text_to_speech/3030ebc702cd4dd6b469ce19b5385049/b5c5b28db1ea408abc7d851202983bdb/id=25f729786cf144f197bc222ed65f28e6.mp3",
      duration: 5.883,
    },
    en: {
      src: "https://resource2.heygen.ai/text_to_speech/3030ebc702cd4dd6b469ce19b5385049/b5c5b28db1ea408abc7d851202983bdb/id=c6931c80a6a2419883e6ccfcf771ec4e.mp3",
      duration: 6.232,
    },
  },
  "int-002-viktoriia-last-call": {
    uk: {
      src: "https://resource2.heygen.ai/text_to_speech/3030ebc702cd4dd6b469ce19b5385049/c318a6b1bab142849041019f58c97a6b/id=e0e2ac785b8840a59cf1cc9906224453.mp3",
      duration: 9.633,
    },
    en: {
      src: "https://resource2.heygen.ai/text_to_speech/3030ebc702cd4dd6b469ce19b5385049/c318a6b1bab142849041019f58c97a6b/id=540933c01e3b42c6a5f96c61b9e5a5af.mp3",
      duration: 7.544,
    },
  },
  "int-003-nina-delivery": {
    uk: {
      src: "https://resource2.heygen.ai/text_to_speech/3030ebc702cd4dd6b469ce19b5385049/8f71d16d1fa84544a4db41a18264d613/id=0362714e96b34aad88379ea6bd859308.mp3",
      duration: 7.435,
    },
    en: {
      src: "https://resource2.heygen.ai/text_to_speech/3030ebc702cd4dd6b469ce19b5385049/8f71d16d1fa84544a4db41a18264d613/id=69c4d74669fe40c3969be2ea879370b7.mp3",
      duration: 7.126,
    },
  },
  "int-004-andrii-master-key": {
    uk: {
      src: "https://resource2.heygen.ai/text_to_speech/3030ebc702cd4dd6b469ce19b5385049/f91cc0b0eea44f8391f080d2de079ea2/id=78936b081b3740f9b7852fb64bdca776.mp3",
      duration: 8.275,
    },
    en: {
      src: "https://resource2.heygen.ai/text_to_speech/3030ebc702cd4dd6b469ce19b5385049/f91cc0b0eea44f8391f080d2de079ea2/id=bb08d45b19184b89b4b13654fbbe07ab.mp3",
      duration: 5.848,
    },
  },
};
