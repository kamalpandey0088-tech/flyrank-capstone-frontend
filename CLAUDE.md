# Capstone Project Conventions

## Tech Stack
- Framework: React.js (Next.js)
- Styling: Tailwind CSS

## Development Commands
- Install: `npm install`
- Dev Server: `npm run dev`

## Coding Rules
- Use functional components with descriptive names.
- Write explicit conventional commit messages.
## Strict Development Standards
1. Components & State Architecture: All user-input systems must implement strictly controlled components using state hooks coupled to regex validation schemas; loose, uncontrolled elements are explicitly forbidden.
2. Form Semantic Contracts: Every application form must follow semantic DOM constraints, requiring explicit <form> wrappers, bound accessible labels, and persistent aria-live elements for asynchronous validation alerts.
3. Production Defensiveness: No code may be committed without matching unit validation tests covering data boundary testing conditions (null, overflow strings, and improper character injections).