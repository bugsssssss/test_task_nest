### Authentication Flow

1. User sends username/password to `/auth/login`
2. Server validates creds, returns a JWT token
3. Server verifies token and checks user's role before returning data

### The Three User Types

**Admin (the boss)**

- Can see everything
- Gets all the columns from both tables
- Can request "sideloading" to get related member data in one request
- No restrictions on which regions they can query

**Normal (regular employee)**

- Gets the basic info
- Can't use sideloading
- Can query any region

**Limited (intern vibes)**

- Same column access as Normal
- can only view data from 3 specific genomic regions
- If try to query other regions, the results will come back empty

### Database Tables

**rnc_locus**
**rnc_locus_members**

## Files Overview

`src/auth/*`- all authentication logic
`src/locus/*`- locus API endpoint logic
`test/*`-tests
`*.spec.ts`- unit tests
