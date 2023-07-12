sequenceDiagram
  participant User
  participant Browser
  participant Server
  
  User->>Browser: Enter note content
  Browser->>Browser: Validate input
  Browser->>Browser: Create POST request
  Browser->>Server: Send POST request with note data
  Server->>Server: Validate and process the note data
  Server-->>Browser: Return success response
  Browser-->>User: Display success message
  
  Note over Browser, Server: Update notes list asynchronously
