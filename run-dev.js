const { spawn } = require("node:child_process");

const runtime = process.argv[0].split("/").pop() ?? "bun";

let out;
if (process.platform !== "linux") {
    out = spawn(`${runtime}`, ["run", "dev:windows"], {
        stdio: "inherit",
        shell: true,
    });
} else {
    out = spawn(`${runtime}`, ["run", "dev:linux"], {
        stdio: "inherit",
        shell: true,
    });
}

if(!out) return console.error("Failed to start child process");

out.stdout.on(`runtime`, (data) => {
    console.log(data);
});

out.on("exit", (code) => {
    console.log(`Child exited with code ${code}`);
});