/*
 * TypeScript/React Syntax Rules:
 * - React.ReactNode = type for anything that can be rendered (text, elements, etc.)
 * - children = special prop containing nested content
 */

import "../styles/globals.css";

// Root layout that wraps all pages in the application
// This is like a base template that every page inherits
export default function RootLayout({
    children,  // Content of the current page
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          {children}  {/* Page content gets inserted here */}
        </body>
      </html>
    );
}