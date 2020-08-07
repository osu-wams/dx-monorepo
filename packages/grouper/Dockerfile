FROM hayd/alpine-deno:1.2.0

WORKDIR /app

USER deno

# Copy and cache the application dependencies
COPY src/deps.ts src/
RUN deno cache src/deps.ts

# Add the full application, check and cache remaining imports
ADD . .
RUN deno cache test.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-write", "test.ts"]
