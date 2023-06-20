-- migrate:up
CREATE TABLE `wish_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `show_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `uk_wish_list` UNIQUE KEY (user_id, show_id),
  CONSTRAINT `fk_wish_list_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_wish_list_show_id` FOREIGN KEY (`show_id`) REFERENCES `shows` (`id`)
);

-- migrate:down
DROP TABLE `wish_list`;
