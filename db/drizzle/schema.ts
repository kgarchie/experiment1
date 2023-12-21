import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, text, timestamp, varchar, index, foreignKey, unique, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const messages = mysqlTable("messages", {
	id: int("id").autoincrement().notNull(),
	message: text("message").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const messagesView = mysqlTable("messages_view", {
	id: int("id").default(0).notNull(),
	message: text("message").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	fromName: varchar("from_name", { length: 255 }).notNull(),
	fromEmail: varchar("from_email", { length: 255 }).notNull(),
	toName: varchar("to_name", { length: 255 }).notNull(),
	toEmail: varchar("to_email", { length: 255 }).notNull(),
});

export const sessions = mysqlTable("sessions", {
	id: int("id").autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	token: varchar("token", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	isValid: tinyint("is_valid").default(1).notNull(),
},
(table) => {
	return {
		userId: index("user_id").on(table.userId),
		token: unique("token").on(table.token),
		sessionsTokenUnique: unique("sessions_token_unique").on(table.token),
	}
});

export const transport = mysqlTable("transport", {
	id: int("id").autoincrement().notNull(),
	from: int("from").notNull().references(() => users.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	to: int("to").notNull().references(() => users.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	message: int("message").notNull().references(() => messages.id, { onDelete: "restrict", onUpdate: "restrict" } ),
},
(table) => {
	return {
		message: index("message").on(table.message),
		from: index("from").on(table.from),
		to: index("to").on(table.to),
	}
});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	salt: varchar("salt", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		email: unique("email").on(table.email),
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});