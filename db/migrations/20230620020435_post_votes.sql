-- migrate:up
CREATE TABLE `post_votes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `opinion` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_post_votes_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_post_votes_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `uk_post_votes_user_post` UNIQUE KEY (`user_id`, `post_id`)
)

-- migrate:down
DROP TABLE post_votes