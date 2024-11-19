## DATABASE Triggers

### set_update_timestamp_trigger.sql
- **Purpose**: Automatically updates the `update_at` column in the `notes` table whenver changed
- **Location**: `/Schema/database_scripts/set_update_timestamp_trigger.sql`
- **Description**: This trigger function `update_modified_column()` is executed before any update on `notes`. It sets the `updated_at` filed to the current timestamp

### set_track_notes_status_trigger.sql
- **Purpose**: Auto create or update table `notes_status` info when table `notes` created or updated
- **Location**: `/Schema/database_scripts/set_track_notes_status_trigger.sql`
- **Description**: This trigger function `track_notes_status()` is executed After any update or creation on `notes`. Sets the `updated_at` filed to the current timestamp