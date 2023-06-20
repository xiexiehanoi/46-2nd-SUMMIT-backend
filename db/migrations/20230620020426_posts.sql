-- migrate:up
CREATE TABLE `posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_type_id` INT NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `content` TEXT NOT NULL,
  `image_url` VARCHAR(2000) NULL,
  `rating` DECIMAL(4,2) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_posts_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_posts_post_type_id` FOREIGN KEY (`post_type_id`) REFERENCES `post_types` (`id`)
)

-- migrate:down
DROP TABLE posts