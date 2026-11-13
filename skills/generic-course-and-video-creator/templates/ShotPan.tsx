// ShotPan -- plays a list of screenshot "shots" across a lesson, each landing on a
// spoken word, so the video zooms and pans across a realistic replica of the interface
// being taught instead of showing abstract boxes. See references/realistic-visuals.md.
//
// Self-contained: drop it into scenes/ and pass it the word timings from voice.<n>.json.
import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';

export type Word = {word: string; startMs: number; endMs: number};

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');

/** Ms at which the `nth` occurrence of `target` is spoken (1-based). */
export const revealMsNth = (
  words: Word[], target: string | undefined, nth = 1, fallback = 0,
): number => {
  if (!target) return fallback;
  const t = norm(target);
  const hits = words.filter((w) => norm(w.word) === t);
  const pool = hits.length ? hits : words.filter((w) => norm(w.word).includes(t));
  return pool[nth - 1]?.startMs ?? fallback;
};

/** A rectangle of the screenshot to fill the frame with, in 0..1 page fractions. */
export type Focus = {cx: number; cy: number; w: number};
/** A box to ring, in 0..1 page fractions. */
export type Mark = {x: number; y: number; w: number; h: number; color: string};

export type Shot = {
  img: string;              // file under public/<slug>/shots/
  revealWord?: string;      // the spoken word this shot lands on
  nth?: number;             // which occurrence of it (1-based)
  at?: number;              // ms, used when there is no revealWord
  focus: Focus;
  endFocus?: Focus;         // slow drift to here across the shot (Ken Burns)
  mark?: Mark;
  callout?: string;
  calloutAt?: 'top' | 'bottom';   // 'bottom' when the top of this shot is busy
};

const TRANSITION = 700;     // ms to move or crossfade between shots
const ASPECT = 16 / 9;      // screenshots are shot 16:9, like the frame

const lerpFocus = (a: Focus, b: Focus, p: number): Focus => ({
  cx: a.cx + (b.cx - a.cx) * p,
  cy: a.cy + (b.cy - a.cy) * p,
  w: a.w + (b.w - a.w) * p,
});

const Layer: React.FC<{
  slug: string; img: string; focus: Focus; mark?: Mark;
  markOpacity: number; opacity: number;
}> = ({slug, img, focus, mark, markOpacity, opacity}) => {
  const {width, height} = useVideoConfig();
  const W = width / focus.w;
  const H = W / ASPECT;
  const left = width / 2 - focus.cx * W;
  const top = height / 2 - focus.cy * H;

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity}}>
      <div style={{position: 'absolute', left, top, width: W, height: H}}>
        <Img src={staticFile(`${slug}/shots/${img}`)}
          style={{width: '100%', height: '100%', display: 'block'}} />
        {mark ? (
          <div style={{
            position: 'absolute',
            left: mark.x * W, top: mark.y * H,
            width: mark.w * W, height: mark.h * H,
            border: `4px solid ${mark.color}`, borderRadius: 8,
            boxShadow: `0 0 0 6px ${mark.color}33, 0 10px 40px ${mark.color}55`,
            opacity: markOpacity,
          }} />
        ) : null}
      </div>
    </div>
  );
};

/**
 * Plays a list of screenshot shots, each landing on a spoken word: it zooms and pans
 * across a realistic replica of the interface being taught instead of showing boxes.
 */
export const ShotPan: React.FC<{slug: string; shots: Shot[]; words: Word[]}> = ({
  slug, shots, words,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const ms = (frame / fps) * 1000;

  const times = shots.map((s, i) =>
    i === 0 ? 0 : revealMsNth(words, s.revealWord, s.nth ?? 1, s.at ?? i * 4000));

  let idx = 0;
  for (let i = 0; i < times.length; i++) if (ms >= times[i]) idx = i;

  const cur = shots[idx];
  const prev = idx > 0 ? shots[idx - 1] : null;
  const raw = Math.min(1, Math.max(0, (ms - times[idx]) / TRANSITION));
  const p = Easing.inOut(Easing.cubic)(raw);

  // drift inside the shot, from its focus towards endFocus, across its whole length
  const shotEnd = idx + 1 < times.length ? times[idx + 1] : times[idx] + 8000;
  const drift = Math.min(1, Math.max(0, (ms - times[idx]) / Math.max(1, shotEnd - times[idx])));
  const target = cur.endFocus ? lerpFocus(cur.focus, cur.endFocus, drift) : cur.focus;

  const sameImage = prev != null && prev.img === cur.img;
  const focus = sameImage ? lerpFocus(prev!.endFocus ?? prev!.focus, target, p) : target;

  const callout = cur.callout;
  const calloutIn = interpolate(ms, [times[idx] + 150, times[idx] + 600], [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <>
      {/* the outgoing image stays underneath only when we cannot pan between them */}
      {!sameImage && prev ? (
        <Layer slug={slug} img={prev.img}
          focus={prev.endFocus ?? prev.focus} mark={prev.mark}
          markOpacity={1} opacity={1 - p} />
      ) : null}
      <Layer slug={slug} img={cur.img} focus={focus} mark={cur.mark}
        markOpacity={sameImage ? p : calloutIn} opacity={sameImage ? 1 : p} />

      {callout ? (
        <div style={{
          position: 'absolute', left: width * 0.045,
          ...(cur.calloutAt === 'bottom'
            ? {bottom: height * 0.175} : {top: height * 0.065}),
          background: cur.mark?.color ?? '#035CA2', color: 'white',
          padding: `${height * 0.014}px ${width * 0.018}px`, borderRadius: 10,
          fontSize: width * 0.0205, fontWeight: 800, letterSpacing: 0.2,
          boxShadow: '0 14px 40px rgba(0,0,0,0.45)',
          opacity: calloutIn,
          transform: `translateY(${(1 - calloutIn) * -14}px)`,
        }}>{callout}</div>
      ) : null}
    </>
  );
};
