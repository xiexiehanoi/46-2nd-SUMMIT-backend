-- migrate:up
ALTER TABLE users MODIFY COLUMN email varchar(200) NULL;

-- migrate:down
ALTER TABLE users MODIFY COLUMN email varchar(200) NULL;
