-- migrate:up
CREATE TABLE `shows` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `content` TEXT NOT NULL,
  `image_url` VARCHAR(200) NOT NULL,
  `running_time` VARCHAR(200) NOT NULL,
  `genre_id` INT NOT NULL,
  `start_date`  DATETIME NOT NULL,
  `end_date`  DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_shows_genre` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`)
)

-- migrate:down
DROP TABLE shows