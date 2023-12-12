# Experiment 1
## Exploring HTMX, VanJS, Nitro, Docker, Redis and Bun(uWebsockets)
### Setup
Soon to support docker pull. For now, just clone, then `npm install` and `npm run dev`
### Bunions Only
Setting a value for "types" in tsconfig compiler options means that TypeScript will ignore other global type definitions, including lib: ["dom"]. If you need to add DOM types into your project, add the following triple-slash directives at the top of any TypeScript file in your project.

```xml
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
```


## Findings
### BackEnd
#### WebSockets and Nitro
- There is no official support for WebSockets in Nitro server. The workaround would be to spin up another node server on another port solely to serve sockets which is unideal for a variety of readons - [TBD](#why-you-may-not-want-the-extra-socket-server-intance-for-Node).
- I suspected, after a slight perusal of the source code, a plausible solution would be to make the internal server extendable so that devs can add WebSocket functionalities for themselves, another dev discovered this [too](https://github.com/nuxt/nuxt/discussions/16663) and such a shim was implemented [here](https://github.com/nuxt/nuxt/pull/19230) .
- Another older (stopped working due to internal code refactors but the Nitro/Nuxt team) is [here](https://github.com/nuxt/nuxt/discussions/16663#discussioncomment-6249743), plausibly downgrading the Nitro server could be a desperate option.
- Another fancy trick is to simply create another server(SockeServer) on a different port and then use NGinX, the reverse proxy, to "merge" the ports as [here](https://github.com/nuxt/nuxt/pull/19230#issuecomment-1442042254) and with these NGinX [configs](https://github.com/nuxt/nuxt/pull/19230#:~:text=server%20%7B%0A%20%20%20%20%20%20%20%23name%20/%20ssl,proxy_set_header%20Host%20%24host%3B%0A%20%20%20%20%20%20%20%7D%0A%7D)

###### Why you may not want the extra Socket Server intance for Node
- The discussed workarounds all require another node (websocketserver) instance running alongside your main (http) server. This would not be suitable in situations where:
    - You have limited resources, due to the extra node instance consuming resources. They are not conservative.
    - You are only given one port by your hosting provider. Most providers expose only one port, thus the extra port to be used by the socket server won't work.
    - You want a simpliple stack where you can easily manage both socket connections and http connections


## Updates
Nitro team is supposedly working to add WebSocket support as revealed in this GitHub [issue](https://github.com/nuxt/nuxt/pull/19230#issuecomment-1475933592).