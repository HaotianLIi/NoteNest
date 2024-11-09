CREATE TABLE "users" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "username" varchar,
  "role" varchar,
  "created_at" timestamp
);

CREATE TABLE "notes" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" varchar,
  "body" text,
  "user_id" integer,
  "status_id" varchar,
  "created_at" timestamp
);

CREATE TABLE "status" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "note_id" integer,
  "status" varchar
);

COMMENT ON COLUMN "notes"."body" IS 'Content of the notes';

ALTER TABLE "notes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "status" ADD FOREIGN KEY ("note_id") REFERENCES "notes" ("id");
