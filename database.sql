CREATE TABLE "toDoList" (
"id" SERIAL PRIMARY KEY,
"task" VARCHAR(255) NOT NULL,
"completeStatus" BOOLEAN,
"dateCompleted" DATE
);


INSERT INTO "toDoList" ("task")
VALUES ('Get groceries'),
('Vacuum Car'),
('Buy baby gift'),
('Touch up kitchen paint'),
('Organize bedroom closet, purge unwanted clothes'),
('Get a puppy'),
('Save the world'),
('Become a full stack software engineer');