-- migrate:up
ALTER TABLE `posts` ADD COLUMN `show_id` INT NOT NULL;
ALTER TABLE `posts` ADD CONSTRAINT `fk_posts_show_id` FOREIGN KEY (`show_id`) REFERENCES `shows` (`id`)
-- migrate:down
ALTER TABLE `posts` ADD COLUMN `show_id` INT NOT NULL;
ALTER TABLE `posts` ADD CONSTRAINT `fk_posts_show_id` FOREIGN KEY (`show_id`) REFERENCES `shows` (`id`)