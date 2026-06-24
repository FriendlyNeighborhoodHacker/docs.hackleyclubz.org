---
title: Data Model
description: The core entities and relationships behind Hackley Clubz.
order: 50
---

# Data Model

This page describes the core entities in Hackley Clubz and how they relate. It
is written for the IT Director and developers.

## Core entities

### User

Represents anyone with an account.

| Field        | Type      | Notes                                  |
| ------------ | --------- | -------------------------------------- |
| `id`         | UUID      | Primary key                            |
| `name`       | string    | Display name                           |
| `email`      | string    | School email, unique                   |
| `role`       | enum      | `student`, `leader`, `advisor`, `admin`|
| `createdAt`  | timestamp |                                        |

### Club

Represents an approved club.

| Field         | Type      | Notes                              |
| ------------- | --------- | ---------------------------------- |
| `id`          | UUID      | Primary key                        |
| `name`        | string    | Unique                             |
| `description` | text      | Markdown supported                 |
| `category`    | string    | e.g. Arts, STEM, Service           |
| `status`      | enum      | `pending`, `active`, `archived`    |
| `advisorId`   | UUID      | FK → User (advisor)                |

### Membership

Join record linking a user to a club.

| Field       | Type      | Notes                                |
| ----------- | --------- | ------------------------------------ |
| `id`        | UUID      | Primary key                          |
| `userId`    | UUID      | FK → User                            |
| `clubId`    | UUID      | FK → Club                            |
| `status`    | enum      | `pending`, `approved`, `removed`     |
| `joinedAt`  | timestamp |                                      |

### Announcement

A message posted to a club.

| Field       | Type      | Notes                |
| ----------- | --------- | -------------------- |
| `id`        | UUID      | Primary key          |
| `clubId`    | UUID      | FK → Club            |
| `authorId`  | UUID      | FK → User            |
| `body`      | text      | Markdown supported   |
| `createdAt` | timestamp |                      |

## Relationships

- A **User** can have many **Memberships**.
- A **Club** has one advisor (**User**) and many **Memberships**.
- A **Club** has many **Announcements**.
- A **Membership** links exactly one **User** to one **Club**.

```
User 1───* Membership *───1 Club
Club 1───* Announcement
Club *───1 User (advisor)
```
