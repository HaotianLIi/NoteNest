CREATE TABLE "status" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "status" varchar
)

CREATE TABLE "notes" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" varchar,
  "body" text,
  "status_id" INT REFERENCES status(id),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "update_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "notes_status" (
  "id" INTEGER GENERATED BY DEFAULT AS INDENTITY PRIMARY KEY,
  "notes_id" INT REFERENCES notes(id),
  "status_id" INT REFERENCES status(id),
  "changed_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

