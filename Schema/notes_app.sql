CREATE TABLE "status" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "status" varchar
)

CREATE TABLE "notes" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" varchar,
  "body" text,
  "status_id" NOT NULL INT REFERENCES status(id),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "notes_status" (
  "id" INTEGER GENERATED BY DEFAULT AS INDENTITY PRIMARY KEY,
  "notes_id" INT REFERENCES notes(id), -- notes_id has be valid to pre-existed in notes(id)
  "status_id" INT REFERENCES status(id), -- status_id has to be valid to pre-eisted in status(id)
  "changed_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  "changed_by" varchar
)

