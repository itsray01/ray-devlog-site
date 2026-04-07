/**
 * useSfx - Thin wrapper around the global SfxController context.
 *
 * Previously this was a standalone hook with its own AudioContext and no
 * toggle awareness. Now it delegates to the single SfxProvider mounted in
 * App.jsx, so the SFX OFF toggle on the HUD silences ALL sounds site-wide —
 * including nav-dock hover ticks and overlay confirm sounds.
 *
 * Return shape kept identical to the old hook so NavDock / NavOverlay need
 * no changes:  { playHover, playConfirm }
 */
import { useSfx as useSfxContext } from '../components/theories/SfxController';

const useSfx = () => {
  const { playTick, playConfirm } = useSfxContext();

  return {
    playHover: playTick,
    playConfirm,
  };
};

export default useSfx;
