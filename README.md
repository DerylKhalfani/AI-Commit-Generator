# AI Commit Generator

A Next.js web application that generates conventional commit messages from git diffs using AI.

## Architecture Overview

This application follows a typical Next.js structure with clear separation of concerns:

```
┌─────────────────┐
│   app/layout.tsx│  Root HTML wrapper
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   app/page.tsx  │  Main page (client-side)
└────────┬────────┘
         │
         ├──────────────────────────────┐
         │                              │
         ▼                              ▼
┌──────────────────┐         ┌──────────────────┐
│CommitInput.tsx   │         │CommitResult.tsx  │
│(User Input Form) │         │(Display Results) │
└────────┬─────────┘         └────────┬─────────┘
         │                            │
         │                            │ uses
         │                            ▼
         │                   ┌──────────────────┐
         │                   │types/commit.ts   │
         │                   │(Type Definitions)│
         │                   └──────────────────┘
         │
         │ calls API
         ▼
┌──────────────────────────────────────┐
│app/api/generate-commit/route.ts     │  API Endpoint
└────────┬─────────────────────────────┘
         │
         ├────────────┬──────────────┐
         │            │              │
         ▼            ▼              ▼
    ┌────────┐  ┌─────────┐  ┌──────────┐
    │lib/    │  │lib/     │  │lib/      │
    │diff.ts │  │llm.ts   │  │schema.ts │
    └────────┘  └────┬────┘  └──────────┘
                     │ uses       ▲
                     └────────────┘
```

## File Connections and Responsibilities

### 1. **app/layout.tsx**
- **Purpose**: Root HTML wrapper for the entire application
- **Connections**: Wraps all pages including `app/page.tsx`
- **What it does**: Provides the basic HTML structure (`<html>`, `<body>`)

### 2. **app/page.tsx** (Main Entry Point)
- **Purpose**: Main page component with user interaction logic
- **Imports**:
  - `components/CommitInput.tsx` - Input form component
  - `components/CommitResult.tsx` - Result display component
  - `types/commit.ts` - CommitMessage type definition
- **What it does**:
  - Manages application state (commit message, loading status)
  - Handles the generate button click
  - Makes POST request to `/api/generate-commit`
  - Renders input form and results

### 3. **components/CommitInput.tsx**
- **Purpose**: User input form for pasting git diffs
- **Connections**: Used by `app/page.tsx`
- **What it does**:
  - Provides textarea for git diff input
  - Provides "Generate" button
  - Calls parent's `onGenerate` function when button is clicked

### 4. **components/CommitResult.tsx**
- **Purpose**: Display formatted commit message results
- **Imports**: `types/commit.ts` - CommitMessage type
- **Connections**: Used by `app/page.tsx`
- **What it does**:
  - Displays commit in conventional format: `type(scope): subject`
  - Renders commit body as bulleted list

### 5. **app/api/generate-commit/route.ts** (API Endpoint)
- **Purpose**: Backend API endpoint to process diff and generate commit
- **URL**: `/api/generate-commit` (POST)
- **Imports**:
  - `lib/diff.ts` - `preprocessDiff` function
  - `lib/llm.ts` - `generateCommit` function
- **What it does**:
  1. Receives git diff from client
  2. Validates the diff input
  3. Cleans the diff using `preprocessDiff`
  4. Generates commit message using `generateCommit`
  5. Returns JSON response to client

### 6. **lib/diff.ts** (Diff Processing)
- **Purpose**: Clean and preprocess git diffs
- **Connections**: Used by `app/api/generate-commit/route.ts`
- **What it does**:
  - Filters git diff to keep only relevant changed lines (+ and -)
  - Removes file header lines (+++ and ---)
  - Limits to max 200 lines to avoid overwhelming the AI

### 7. **lib/llm.ts** (AI Integration)
- **Purpose**: Interface with OpenAI API to generate commit messages
- **Imports**: `lib/schema.ts` - CommitSchema for validation
- **Connections**: Used by `app/api/generate-commit/route.ts`
- **What it does**:
  1. Sends diff to OpenAI API with system prompt
  2. Requests JSON response in conventional commit format
  3. Validates response against CommitSchema
  4. Falls back to default message if parsing fails
  5. Ensures body is always an array

### 8. **lib/schema.ts** (Validation Schema)
- **Purpose**: Define and validate commit message structure using Zod
- **Connections**: Used by `lib/llm.ts`
- **What it does**:
  - Defines validation rules for commit messages
  - Exports TypeScript type inferred from schema
  - Validates: type (string), scope (optional), subject (string), body (string or array)

### 9. **types/commit.ts** (Type Definitions)
- **Purpose**: TypeScript type definitions for commit messages
- **Connections**: Used by `app/page.tsx` and `components/CommitResult.tsx`
- **What it does**:
  - Defines the CommitMessage interface
  - Provides type safety throughout the application

## Data Flow

1. **User Input**: User pastes git diff in `CommitInput` component
2. **Submit**: User clicks "Generate" button
3. **API Call**: `page.tsx` sends POST request to `/api/generate-commit`
4. **Processing**: API endpoint:
   - Validates input
   - Cleans diff with `preprocessDiff()`
   - Generates commit with `generateCommit()` (calls OpenAI)
5. **Validation**: Response validated against `CommitSchema`
6. **Response**: Commit message returned to client as JSON
7. **Display**: `CommitResult` component renders the formatted message

## Technology Stack

- **Framework**: Next.js 15 (React)
- **Language**: TypeScript
- **AI**: OpenAI API
- **Validation**: Zod
- **Styling**: (To be added)

## Environment Variables

- `OPENAI_API_KEY` - Required for AI commit generation

## Conventional Commit Format

The application generates commits following the conventional commit specification:

```
type(scope): subject

- body line 1
- body line 2
```

**Types**: feat, fix, chore, docs, style, refactor, test, etc.
