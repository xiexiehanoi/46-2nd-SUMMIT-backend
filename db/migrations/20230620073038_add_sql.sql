-- migrate:up
ALTER TABLE `post_votes` MODIFY COLUMN `opinion` INT NOT NULL;
CREATE TABLE `post_vote_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);
ALTER TABLE `post_votes` ADD CONSTRAINT `fk_post_votes_opinion` FOREIGN KEY (`opinion`) REFERENCES `post_vote_type` (`id`);


-- migrate:down
ALTER TABLE `post_votes` MODIFY COLUMN `opinion` INT NOT NULL;
ALTER TABLE `post_votes` DROP CONSTRAINT `fk_post_votes_opinion`;
DROP TABLE `post_vote_type`;
