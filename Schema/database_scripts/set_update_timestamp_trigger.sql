-- File: set_update_timestamp_trigger.sql
-- Desctiption: Trigger to automatically update the 'update_at column on 'notes table updates

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP
    RETURN NEW
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON notes
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- DROP TRIGGER IF EXISTS set_timesamp ON notes