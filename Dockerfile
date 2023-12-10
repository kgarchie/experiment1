FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lockb /app/
RUN bun install
COPY . /app
RUN bun run build
ENV PORT=3000
EXPOSE 3000
CMD [ "bun", "start" ]