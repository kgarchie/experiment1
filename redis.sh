#!/bin/bash
for arg in "$@"
do
    if [ "$arg" == "--uninstall" ]; then
        echo "Uninstalling Redis"
        sudo rm -rf /usr/local/bin/redis*
        exit 0
    fi
done

# check redis is already installed
if [ -f "/usr/local/bin/redis-server" ]; then
    echo "Redis is already installed"
    exit 0
fi

# Install Redis dependencies
sudo apt install libsystemd-dev -y

# Install Redis dependencies
sudo apt-get update
sudo apt-get install build-essential tcl -y


# check if folder exists and already contains redis source code
if [ -d "redis" ]; then
    if [ -f "redis/7.2.3.tar.gz" ]; then
        echo "Redis source code already downloaded"
    else
        echo "Downloading Redis source code"
        # Download Redis source code
        mkdir redis
        wget https://github.com/redis/redis/archive/7.2.3.tar.gz -O ./redis/7.2.3.tar.gz
    fi
fi

cd redis

if [ -d "redis-7.2.3" ]; then
    echo "Redis source code already extracted"
else
    echo "Extracting Redis source code"
    # Extract Redis source code
    tar xzf 7.2.3.tar.gz
fi

cd redis-7.2.3

# Build Redis with Malloc as the memory allocator
make MALLOC=libc USE_SYSTEMD=yes

# Install Redis
sudo make install

 # clean up
cd ../..
rm -rf redis