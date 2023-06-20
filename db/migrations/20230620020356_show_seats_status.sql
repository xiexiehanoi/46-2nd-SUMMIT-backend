-- migrate:up
CREATE TABLE `show_seats_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(100) NULL,
  PRIMARY KEY (`id`)
)

-- migrate:down
DROP TABLE show_seats_status