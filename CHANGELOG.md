# Changelog

All notable changes to the AI Voice Coach project will be documented in this file.

## [Unreleased]

### Added
- Project initialization with Next.js 14, TypeScript, and Tailwind CSS
- Basic project structure following Next.js App Router conventions
- Directory structure for authentication, dashboard, call sessions, and history pages
- Git repository setup with main and dev branches
- Supabase client integration for authentication and database functions
- User role management (basic and admin roles) implementation
- Utilities for role-based access control
- Call History page basic structure implementation
- Call History layout with proper metadata
- Authentication and role-based content in Call History page
- TDD plan for incremental Call History page development

### Changed
- Updated application metadata to reflect AI Voice Coach branding

### Fixed
- Resolved nested directory structure for cleaner project organization
- Fixed Supabase RLS policies to eliminate circular dependencies in role checking
