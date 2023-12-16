-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `messages` (
	`id` int(11) unsigned AUTO_INCREMENT NOT NULL,
	`message` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `messages_view` (
	`id` int(11) unsigned NOT NULL DEFAULT 0,
	`message` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`from_name` varchar(255) NOT NULL,
	`from_email` varchar(255) NOT NULL,
	`to_name` varchar(255) NOT NULL,
	`to_email` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transport` (
	`id` int(11) unsigned AUTO_INCREMENT NOT NULL,
	`from` int(11) unsigned NOT NULL,
	`to` int(11) unsigned NOT NULL,
	`message` int(11) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int(11) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `email` UNIQUE(`email`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `message` ON `transport` (`message`);--> statement-breakpoint
CREATE INDEX `from` ON `transport` (`from`);--> statement-breakpoint
CREATE INDEX `to` ON `transport` (`to`);--> statement-breakpoint
ALTER TABLE `transport` ADD CONSTRAINT `transport_ibfk_1` FOREIGN KEY (`message`) REFERENCES `messages`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `transport` ADD CONSTRAINT `transport_ibfk_2` FOREIGN KEY (`from`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `transport` ADD CONSTRAINT `transport_ibfk_3` FOREIGN KEY (`to`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE restrict;
*/