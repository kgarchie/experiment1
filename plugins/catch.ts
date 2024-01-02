import {NitroApp} from "nitropack";
import {spawn} from "node:child_process";
import {isBun, isDevelopment, isDebug} from "std-env";

export default defineNitroPlugin((app: NitroApp) => {
    app.hooks.hook("error", (error, context) => {
        console.error(error)
        console.debug(context)
        console.log("Restarting server in 5 seconds...")
        setTimeout(() => {
            if(isBun) {
                console.log("Restarting server with Bun...")
                if(isDebug || isDevelopment) {
                    spawn("bun", ["run", "dev"])
                } else {
                    spawn("bun", ["run", "start"])
                }
            } else {
                console.log("Restarting server with NPM...")
                if(isDevelopment || isDebug) {
                    spawn("npm", ["run", "dev"])
                } else {
                    spawn("npm", ["run", "start"])
                }
            }
        }, 5000)

        // TODO: send an email to the developer
    })
})
