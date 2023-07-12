sequenceDiagram
  participant User
  participant Browser
  participant Server

  User->>Browser: Go to https://studies.cs.helsinki.fi/exampleapp/spa
  Browser->>Browser: Load single-page app
  Browser->>Server: Fetch app resources (HTML, CSS, JS)
  Server-->>Browser: Send app resources
  Browser->>Browser: Render app UI
  Browser-->>User: Display app UI
