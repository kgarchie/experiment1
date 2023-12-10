# Exploring HTMX, VanJS, Nitro, Docker, Redis and Bun(uWebsockets)

## If using Bun
Unfortunately, setting a value for "types" means that TypeScript will ignore other global type definitions, including lib: ["dom"]. If you need to add DOM types into your project, add the following triple-slash directives at the top of any TypeScript file in your project.

```xml
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
```