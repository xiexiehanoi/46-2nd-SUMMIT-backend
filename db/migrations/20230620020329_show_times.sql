-- migrate:up
CREATE TABLE `show_times` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `time` TIME NOT NULL,
  PRIMARY KEY (`id`)
)

-- migrate:down
DROP TABLE show_times