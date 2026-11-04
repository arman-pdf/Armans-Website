// Extract ONE voice from Kyutai's multi-voice voices.bin ("PTVB1" container) so visitors
// download ~3 MB instead of ~52 MB. Usage: node scripts/extract-voice.mjs <in> <out> <voiceName>
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
const pick = found.find((f) => f.name === want);
if (!pick) throw new Error(`voice "${want}" not found; have: ${found.map((f) => f.name).join(', ')}`);
const head = Buffer.alloc(9); head.write('PTVB1', 0); head.writeUInt32LE(1, 5);
writeFileSync(outFile, Buffer.concat([head, buf.subarray(pick.start, pick.end)]));
console.log(`voices: ${found.map((f) => `${f.name} (${((f.end - f.start) / 1e6).toFixed(1)} MB)`).join(', ')}`);
console.log(`wrote ${outFile}: ${want}, ${((9 + pick.end - pick.start) / 1e6).toFixed(1)} MB`);
