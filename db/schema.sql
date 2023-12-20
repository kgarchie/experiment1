create table if not exists `users`
(
    `id`         int(11) unsigned not null auto_increment,
    `name`       varchar(255)     not null,
    `email`      varchar(255)     not null unique,
    `password`   varchar(255)     not null,
    `created_at` timestamp        not null default current_timestamp,
    `updated_at` timestamp        not null default current_timestamp on update current_timestamp,
    primary key (`id`)
);

create table if not exists `messages`
(
    `id`         int(11) unsigned not null auto_increment,
    `message`    text             not null,
    `created_at` timestamp        not null default current_timestamp,
    `updated_at` timestamp        not null default current_timestamp on update current_timestamp,
    primary key (`id`)
);

create table if not exists `transport`
(
    `id`   int(11) unsigned not null auto_increment,
    `from` int(11) unsigned not null,
    `to`   int(11) unsigned not null,
    `message` int(11) unsigned not null,
    primary key (`id`),
    foreign key (`message`) references `messages` (`id`),
    foreign key (`from`) references `users` (`id`),
    foreign key (`to`) references `users` (`id`)
);

create view `messages_view` as
    select
        `messages`.`id` as `id`,
        `messages`.`message` as `message`,
        `messages`.`created_at` as `created_at`,
        `messages`.`updated_at` as `updated_at`,
        `from_user`.`name` as `from_name`,
        `from_user`.`email` as `from_email`,
        to_user.`name` as `to_name`,
        to_user.`email` as `to_email`
    from
        ((`messages`
        join `transport` on ((`messages`.`id` = `transport`.`message`)))
        join `users` from_user on ((`transport`.`from` = `from_user`.`id`)))
        join `users` to_user on ((`transport`.`to` = to_user.`id`));


# Edit: Make email on users table unique
alter table `users`
    add unique index `users_email_unique` (`email`);

# Edit: Add salt to users table
alter table `users`
    add `salt` varchar(255) not null after `password`;


create table if not exists `sessions`
(
    `id`         int(11) unsigned not null auto_increment,
    `user_id`    int(11) unsigned not null,
    `token`      varchar(255)     not null unique,
    `is_valid`   boolean          not null default true,
    `created_at` timestamp        not null default current_timestamp,
    `updated_at` timestamp        not null default current_timestamp on update current_timestamp,
    primary key (`id`),
    foreign key (`user_id`) references `users` (`id`)
);

# Edit make the token column unique
alter table `sessions`
    add unique index `sessions_token_unique` (`token`);
