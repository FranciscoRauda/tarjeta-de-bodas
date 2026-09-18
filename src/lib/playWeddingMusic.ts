export function playWeddingMusic(
  audio: HTMLAudioElement | null,
  volume: number,
): Promise<boolean> {
  if (!audio) return Promise.resolve(false);

  audio.volume = volume;

  if (audio.readyState === 0) {
    audio.load();
  }

  const attempt = audio.play();
  if (!attempt) return Promise.resolve(true);

  return attempt.then(() => true).catch(() => false);
}
