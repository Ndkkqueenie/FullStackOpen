sequenceDiagram
  participant User
  participant Browser
  participant Server
  participant Database

  User->>Browser: Enter note content
  Browser->>Browser: Validate input
  Browser->>Browser: Create note object
  Browser->>Server: Send API request with note data
  Server->>Server: Process and save note to database
  Server-->>Browser: Return success response
  Browser->>Browser: Update app UI with new note
  Browser-->>User: Display success message

  Note over Browser, Server: Asynchronously update notes list

  Browser->>Browser: Fetch updated notes list
  Browser->>Browser: Update app UI with new notes list
  Browser-->>User: Display updated app UI
