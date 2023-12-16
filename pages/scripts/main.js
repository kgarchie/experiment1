import van from "./van-1.2.6.min.js"

const { div, p, img, a } = van.tags

/**
 * This will construct a message
 * @param {string} name
 * @param {string} message
 * @param {Array<{url: string, name: string, size: string}> | null} attachments
 */
const Message = (name, message, attachments = null) => div({ class: "message-wrapper" },
    div({ class: "profile-picture" },
        img({ src: "https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80", alt: "🧑‍🏫" })
    ),
    div(
        p({ class: "name" }, name),
        div({ class: "message" }, message),
        attachments ? div({ class: "attachments" },
            attachments.map(attachment => div({ class: "attachment" },
                a({ href: attachment.url, class: "icon" },
                    img({ src: "../images/svg/attachment.svg", class: "sketch" })
                ),
                div({ class: "file-info" },
                    div({ class: "file-name" }, attachment.name),
                    div({ class: "file-size" }, attachment.size)
                )
            ))
        ) : null
    )
)


/**
 * This is a class that will handle websocket connection to the server,
 * receive, parse and determine appropriate action for incoming messages
 * TODO: Watch for WebSocket implementation on Nitro
 * @ignore
 */
class Socket {
    url = null
    socket = null

    /**
     *
     * @param {string} url
     */
    constructor(url) {
        throw new Error("The server does not implement this yet")
        this.url = url
        this.setup()
    }

    async setup() {
        this.socket = new WebSocket(this.url)
        this.socket.onopen = this.onopen.bind(this)
        this.socket.onmessage = this.onmessage.bind(this)
        this.socket.onclose = this.onclose.bind(this)
        this.socket.onerror = this.onerror.bind(this)
    }

    onmessage(e) {
        const data = JSON.parse(e.data)
        switch (data.type) {
            case "message":
                const dom = document.getElementById("chat")
                van.add(dom, Message(data.name, data.message, data.attachments || null))
                break
            default:
                console.warn("Unknown message type")
                break
        }
    }

    onclose(e) {
        console.warn(e)
        this.dispose()

        console.info("Retrying connection in 5 seconds...")
        setTimeout(() => {
            this.setup()
        }, 5000)
    }

    onerror(e) {
        console.error(e)
        this.dispose()

        console.info("Retrying connection in 5 seconds...")
        setTimeout(() => {
            this.setup()
        }, 5000)
    }

    dispose() {
        this.socket.close()
        this.socket = null
    }

    onopen(e) {
        console.log(e)
    }

    /**
     *
     * @param {import("../../types").SocketMessage} data
     */
    send(data) {
        this.socket.send(JSON.stringify(data))
    }
}

/**
 * @param {string} name
 * @param {Object} value
 * @param {{expiry?: Date, secure?: boolean, path: string} | null} options
 */
function setCookie(name, value, options = null) {
    let cookie = `${name}=${JSON.stringify(value)};`
    if (options) {
        if (options.expiry) cookie += `expires=${options.expiry.toUTCString()};`
        if (options.secure) cookie += `secure;`

        cookie += `path=${options.path};`
    }

    document.cookie = cookie
}

/**
 * @param {string} name
 * @returns {Object | null}
 */
function getCookie(name) {
    const cookies = document.cookie.split(";")
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=")
        if (key.trim() === name) return JSON.parse(value)
    }
    return null
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

/**
 * Replaces inbuilf fetch
 * @param {string} url
 * @param {RequestInit} init
 * @returns {Promise<Response>}
 */
async function Fetch(url, init = null) {
    if (init) {
        if (!init.headers["X-Auth"]) init.headers["X-Auth"] = getCookie("auth")
        if(!init.headers["Content-Type"]) init.headers["Content-Type"] = "application/json"
    }

    const defaults = {
        headers: {
            "X-Auth": getCookie("auth"),
            "Content-Type": "application/json"
        }
    }

    return fetch(url, init || defaults)
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns
 */
async function login(username, password) {
    const response = await Fetch('/api/auth/login').then(res => res.json).catch(err => { console.error(err); return undefined })

    if (!response) return alert("An error occurred during fetch")

    if (response.status !== 200) return alert(response.body)

    setCookie('auth', response.body)
}

/**
 *
 * @returns
 */
async function logout() {
    const response = await Fetch('/api/auth/logout').then(res => res.json).catch(err => { console.error(err); return undefined })

    if (!response) return alert("An error occurred during fetch")

    if (response.status !== 200) return alert(response.body)

    deleteCookie('auth')
}
