# Specification - Implement Multi-Tenant Data Isolation

## Overview
This track aims to implement data isolation within the Vet Manager system, ensuring that each veterinarian (user) can only access and manage data associated with their own clinic/tenant.

## Requirements
- **Data Segregation:** Add a user_id or 	enant_id to key models: Client, Pet, PetHistory, Race, Species.
- **Relationship Updates:** Ensure all queries and mutations are filtered by the authenticated user's ID.
- **Backend Enforcement:** Update NestJS services and Prisma queries to include multi-tenancy logic.
- **Frontend Context:** Ensure the frontend sends and respects the authenticated user's context for all operations.

## Success Criteria
- A user can only see their own clients and pets.
- Data from one clinic is inaccessible to another clinic.
- All CRUD operations maintain tenant integrity.
