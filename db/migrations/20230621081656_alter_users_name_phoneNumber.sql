-- migrate:up
ALTER TABLE users MODIFY COLUMN name varchar(200) NULL;
ALTER TABLE users MODIFY COLUMN phone_number varchar(200) NULL;

-- migrate:down
ALTER TABLE users MODIFY COLUMN name varchar(200) NULL;
ALTER TABLE users MODIFY COLUMN phone_number varchar(200) NULL;
