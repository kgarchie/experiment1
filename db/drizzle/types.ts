import {users, messages, messagesView, transport} from "./schema"

export namespace Drizzle {
    export namespace User {
        export type insert = typeof users.$inferInsert
        export type select = typeof users.$inferSelect
    }

    export namespace Message {
        export type insert = typeof messages.$inferInsert
        export type select = typeof messages.$inferSelect
    }

    export namespace Transport {
        export type insert = typeof transport.$inferInsert
        export type select = typeof transport.$inferSelect
    }

    export namespace MessagesView {
        export type select = typeof messagesView.$inferSelect
    }
}
