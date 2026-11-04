import { useSyncExternalStore } from 'react';

// Whether a voice call is in progress. Lets the hero swap its landscape for the call visual
// without the assistant and the hero having to know about each other.
let active = false;
const subs = new Set();

export const setCallActive = (value) => {
  if (value === active) return;
  active = value;
  subs.forEach((fn) => fn());
};

export const useCallActive = () =>
  useSyncExternalStore(
    (fn) => { subs.add(fn); return () => subs.delete(fn); },
    () => active,
    () => false
  );
