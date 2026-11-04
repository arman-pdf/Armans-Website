// A shared "how loud is it right now" reading (0..1) that visuals read every frame.
// The source switches with the call: the caller's microphone while listening,
// the voice engine while speaking, nothing while thinking.
let source = () => 0;
export const setLevelSource = (fn) => { source = fn || (() => 0); };
export const getLevel = () => source();

// Microphone loudness meter. Also triggers the browser's one-time permission prompt.
export async function startMicMeter() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    ctx.createMediaStreamSource(stream).connect(analyser);
    const buf = new Uint8Array(analyser.fftSize);
    let smooth = 0;
    return {
      level() {
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
        smooth = smooth * 0.7 + Math.min(1, Math.sqrt(sum / buf.length) * 5) * 0.3;
        return smooth;
      },
      stop() {
        stream.getTracks().forEach((t) => t.stop());
        ctx.close().catch(() => {});
      },
    };
  } catch (e) {
    return { error: e?.name === 'NotFoundError' ? 'audio-capture' : 'not-allowed' };
  }
}
