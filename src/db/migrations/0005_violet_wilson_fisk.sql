ALTER TABLE "audioChunks" RENAME TO "audios";--> statement-breakpoint
ALTER TABLE "audios" DROP CONSTRAINT "audioChunks_room_id_rooms_id_fk";
--> statement-breakpoint
ALTER TABLE "audios" ADD CONSTRAINT "audios_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;