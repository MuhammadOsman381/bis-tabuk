INSERT INTO "users" ("email", "email_hash", "role")
SELECT DISTINCT "email", "email_hash", 'user'
FROM "applications"
WHERE NOT EXISTS (
  SELECT 1 FROM "users" WHERE "users"."email" = "applications"."email"
);

ALTER TABLE "applications" ADD COLUMN "user_id" uuid;

UPDATE "applications"
SET "user_id" = "users"."id"
FROM "users"
WHERE "applications"."email" = "users"."email";

ALTER TABLE "applications" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "applications" DROP COLUMN "email_hash";
ALTER TABLE "applications" DROP COLUMN "email";

ALTER TABLE "materials" ADD COLUMN "chapters" jsonb;

UPDATE "materials"
SET "chapters" = COALESCE(
  (
    SELECT jsonb_agg(
      CASE
        WHEN jsonb_typeof(item.value) = 'string' THEN jsonb_build_object(
          'name', 'Chapter ' || item.ordinality,
          'description', "materials"."description",
          'link', item.value #>> '{}'
        )
        ELSE item.value
      END
    )
    FROM jsonb_array_elements("materials"."links") WITH ORDINALITY AS item(value, ordinality)
  ),
  '[]'::jsonb
);

ALTER TABLE "materials" ALTER COLUMN "chapters" SET NOT NULL;
ALTER TABLE "materials" DROP COLUMN "description";
ALTER TABLE "materials" DROP COLUMN "links";
