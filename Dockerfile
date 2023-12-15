FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lockb app/
COPY . /app
RUN bun install
RUN bun run build && bun run test
ENV PORT=3000
EXPOSE 3000
CMD [ "bun", "start" ]