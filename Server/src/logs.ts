import fs from "fs";
import path from "path";
import sleep from "sleep";
import osu from "node-os-utils"

var cpu = osu.cpu
var mem = osu.mem

// output file in the same folder
const filename = path.join(__dirname, "output.csv");

export function writeData() {
  const row = []; // a new array for each row of data

  let cpuUse = 0
  let memUse = 0
  cpu.usage()
  .then((cpuPercentage: any) => {
    cpuUse = cpuPercentage
    console.log(cpuUse)
  })
  mem.used()
  .then((info: any) => {
    memUse = info.usedMemMb
  })

  sleep.msleep(500)
 
  row.push(cpuUse);
  row.push(memUse);
  row.push("\r")

  fs.writeFileSync(filename, row.join(), {flag: 'a'});
}
