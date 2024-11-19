-- File : set_track_notes_status_trigger.sql
-- Descriptioon: create and update notes_status based on the changes in notes table

CREATE OR REPLACE FUNCTION track_notes_status()
RETURNS TRIGGER AS $$
    INSERT INTO notes_status(notes_id,status_id,updated_at) 
    VALUES(NEW.id,NEW.status_id,CURRENT_TIMESTAMP)
    RETURN NEW
$$ LANGUAGE 'plpgsql'

CREATE TRIGGER create_update_notes_status
AFTER UPDATE OR INSERT ON notes
FOR EACH ROW
EXECUTE FUNCTION track_notes_status()

