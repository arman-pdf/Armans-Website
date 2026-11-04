// Extract a few voices from Kyutai's multi-voice voices.bin ("PTVB1" container) so visitors
// download ~6 MB per voice instead of ~52 MB. Usage: node scripts/extract-voice.mjs <in> <out> <voice,voice,...>
import { readFileSync, writeFileSync } from 'node:fs';
const [, , inFile, outFile, want] = process.argv;
const buf = readFileSync(inFile);
const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
const dec = new TextDecoder();
let o = 5;
if (dec.decode(buf.subarray(0, 5)) !== 'PTVB1') throw new Error('not a PTVB1 file');
const count = view.getUint32(o, true); o += 4;
const found = [];
for (let v = 0; v < count; v++) {
  const start = o;
  const nameLen = view.getUint16(o, true); o += 2;
  const name = dec.decode(buf.subarray(o, o + nameLen)); o += nameLen;
  const tensors = view.getUint16(o, true); o += 2;
  for (let t = 0; t < tensors; t++) {
    const keyLen = view.getUint16(o, true); o += 2 + keyLen;
    o += 1; const rank = view.getUint8(o); o += 1 + rank * 4;
    const byteLen = view.getUint32(o, true); o += 4 + byteLen;
  }
  found.push({ name, start, end: o });
}
const names = want.split(',');
const picks = names.map((n) => {
  const f = found.find((x) => x.name === n);
  if (!f) throw new Error(`voice "${n}" not found; have: ${found.map((x) => x.name).join(', ')}`);
  return f;
});
const head = Buffer.alloc(9); head.write('PTVB1', 0); head.writeUInt32LE(picks.length, 5);
writeFileSync(outFile, Buffer.concat([head, ...picks.map((f) => buf.subarray(f.start, f.end))]));
console.log(`voices: ${found.map((f) => `${f.name} (${((f.end - f.start) / 1e6).toFixed(1)} MB)`).join(', ')}`);
console.log(`wrote ${outFile}: ${want}, ${((9 + picks.reduce((n, f) => n + f.end - f.start, 0)) / 1e6).toFixed(1)} MB`);
