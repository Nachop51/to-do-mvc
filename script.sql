CREATE TABLE IF NOT EXISTS todo (
  id VARCHAR(36) NOT NULL,
  title TEXT,
  description TEXT,
  done BOOLEAN,
  PRIMARY KEY (id)
);

-- INSERT INTO todo (id, title, description, done) VALUES (UUID_TO_BIN(UUID()), 'Title 1', 'Description 1', false);
-- SELECT BIN_TO_UUID(id) AS id, title, description, done FROM todo;
-- UPDATE todo SET done = true WHERE id = UUID_TO_BIN('b3d7f1e0-9c5e-11ea-bb37-0242ac130002');
-- DELETE FROM todo WHERE id = UUID_TO_BIN('b3d7f1e0-9c5e-11ea-bb37-0242ac130002');
