# Migrate to Next.js

Before starting work on this ticket, ensure you have:

1. Completed the previous sprints and tickets.
2. Familiarized yourself with the existing React application structure.
3. Basic understanding of Next.js. If not, go through the [official Next.js documentation](https://nextjs.org/docs/getting-started).

### Objective

Migrate the current React application to Next.js. The aim is to leverage server-side rendering, better performance, and routing capabilities provided by Next.js.

### Relevant Guides

For a step-by-step guide on how to transition from React to Next.js, refer to: `https://nextjs.org/docs/migrating/from-react`

### Guidance

1. **Initialize a Next.js App**: Begin by setting up a new Next.js project using the `create-next-app` command. This will help in understanding the default structure Next.js provides.
2. **File & Directory Structure**: Adapt the existing React file and directory structure to fit the Next.js paradigm. Especially, move pages to the `pages/` directory to make use of Next.js's file-system based routing.
3. **Routing**: Replace React Router (if being used) with Next.js's in-built file-system based routing. Make use of `next/link` for internal links.
4. **State Management**: If the app uses context or other state management libraries, ensure they are compatible with Next.js. Make use of `getServerSideProps` or `getStaticProps` if server-side data fetching is necessary.
5. **Styling**: Ensure that the styling and CSS-in-JS libraries being used are compatible with Next.js.
6. **Authentication**: As the app has Auth0 integrated, ensure that authentication flows work correctly with Next.js.
7. **Testing**: Ensure that all components and pages work as expected. Migrating to Next.js might cause unexpected issues, so thorough testing is crucial.
8. **Optimization**: Leverage Next.js features like Image Optimization, ISR, etc., where possible.

### Requirements

1. Do not upgrade to a Node version higher than 16.16.0. If you are, continue to use `nvm` (for Mac) or `nvm-windows` to manage your node versions.
2. Ensure that all existing functionality and components of the React app are working as expected after the migration.
3. Maintain the integrity of the main files and ensure the application can be presented and demonstrated without issues.

## Deliverables

Want us to review it? Post the following on labs-web:

- Link to your forked repo with the migrated Next.js codebase.
- Link to a Loom video demonstrating the successful migration and showcasing the application's functionality post-migration.
- A brief document highlighting any challenges faced during migration and how they were addressed.

Remember, the primary goal is to smoothly transition the app to Next.js without losing any existing functionality. Good luck!
