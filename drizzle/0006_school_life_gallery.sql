ALTER TABLE "school_life_items"
ADD COLUMN IF NOT EXISTS "image_gallery" jsonb NOT NULL DEFAULT '[]'::jsonb;
