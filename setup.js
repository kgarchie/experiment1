const { execSync } = require("node:child_process");
const fs = require("node:fs");

const OS = process.platform;

if (OS !== 'linux') {
  console.log(`Redis is not supported on this OS; WebApp will use file storage instead`);
  process.exit(1);
} else {
  console.log(`Installing Redis on Linux`);
}

for (let arg of process.argv.slice(2)) {
  switch (arg) {
    case '--uninstall':
      uninstall();
      console.log(`Redis uninstalled`);
      process.exit(0);
      break;
    default:
      break;
  }
}

if (fs.existsSync('/usr/local/bin/redis-server')) {
  console.log(`Redis is already installed`);
  process.exit(0);
}

execSync(`sudo apt install libsystemd-dev -y`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

execSync(`sudo apt-get update`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

execSync(`sudo apt-get install build-essential tcl -y`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});


if (!fs.existsSync('redis')) {
  fs.mkdirSync('redis', { recursive: true });
}

if (!fs.existsSync('./redis/7.2.3.tar.gz')) {
  download();
  extract();
  build();
  install();
  clean();
} else {
  console.log(`Redis source code already exists`);
  build();
  install();
  clean();
}

function clean() {
  console.log(`Cleaning up workspace`);
  execSync(`rm -rf ./redis`, { stdio: 'inherit' }, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    console.log(`Redis installed successfully`);
  });
}

function install() {
  console.log(`Installing Redis`);
  execSync(`cd ./redis/redis-7.2.3 && sudo make install`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

function build() {
  console.log(`Building Redis, this may take a while`);
  execSync(`cd ./redis/redis-7.2.3 && make MALLOC=libc USE_SYSTEMD=yes`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

}

function extract() {
  console.log(`Extracting Redis source code`);
  execSync(`tar xzf ./redis/7.2.3.tar.gz -C ./redis`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  })
}

function download() {
  console.log(`Downloading Redis source code`);
  execSync(`wget https://github.com/redis/redis/archive/7.2.3.tar.gz -O ./redis/7.2.3.tar.gz`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

function uninstall() {
  console.log(`Uninstalling Redis`);
  execSync(`sudo rm -rf /usr/local/bin/redis*`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}
