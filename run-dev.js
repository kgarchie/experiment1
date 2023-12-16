const {spawn} = require("node:child_process");
const path = require("node:path");

const runtime = process.argv[0].split(path.sep).pop()
const pm = runtime.includes("bun") ? "bun" : "npm";

const command = () => {
  if (process.platform === "win32") {
    return spawn(`${pm}`, ["run", "dev:windows"], { shell: true })
  } else {
    return spawn(`${pm}`, ["run", "dev:linux"], { shell: true })
  }
}

const out = command();

out.stdout.on("data", (data) => {
  console.log(data.toString());
});

out.stderr.on("data", (data) => {
  console.error(data.toString());
});

out.on("exit", (code) => {
  console.log(`Child exited with code ${code}`);
});
