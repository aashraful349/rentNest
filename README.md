# RentNest API

RentNest is a RESTful backend API for a property-rental platform. It supports three roles:

- **Tenant** — browses properties, sends rental requests, completes payments, and leaves reviews.
- **Landlord** — creates and manages properties, and approves or rejects rental requests for their properties.
- **Admin** — views users, properties, and rental requests, and can block or activate users.

The API is built with Express, TypeScript, Prisma, PostgreSQL, JWT authentication, and Stripe Checkout.

## Project ER diagram

![RentNest database ER diagram](./rentNestDBERDiagram.webp)

## **Project structure**

```
.
├── generated
│   └── prisma
│       ├── browser.ts
│       ├── client.ts
│       ├── commonInputTypes.ts
│       ├── enums.ts
│       ├── internal
│       │   ├── class.ts
│       │   ├── prismaNamespaceBrowser.ts
│       │   └── prismaNamespace.ts
│       ├── models
│       │   ├── Category.ts
│       │   ├── Payment.ts
│       │   ├── Property.ts
│       │   ├── rentalRequest.ts
│       │   ├── Review.ts
│       │   └── User.ts
│       └── models.ts
├── package.json
├── package-lock.json
├── prisma
│   ├── migrations
│   │   ├── 20260803070123
│   │   │   └── migration.sql
│   │   ├── 20260803091228
│   │   │   └── migration.sql
│   │   ├── 20260806064952_rental_request
│   │   │   └── migration.sql
│   │   ├── 20260806134829
│   │   │   └── migration.sql
│   │   ├── 20260806140610
│   │   │   └── migration.sql
│   │   ├── 20260808161614_payment_schema
│   │   │   └── migration.sql
│   │   ├── 20260820160931
│   │   │   └── migration.sql
│   │   ├── 20260821043411
│   │   │   └── migration.sql
│   │   ├── 20260822113930
│   │   │   └── migration.sql
│   │   ├── 20260822131330
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema
│       ├── categories.prisma
│       ├── enum.prisma
│       ├── payments.prisma
│       ├── Properties.prisma
│       ├── rentalRequests.prisma
│       ├── reviews.prisma
│       ├── schema.prisma
│       └── users.prisma
├── prisma.config.ts
├── README.md
├── rentNestDBERDiagram.webp
├── skills-lock.json
├── src
│   ├── app.ts
│   ├── config
│   │   └── index.ts
│   ├── lib
│   │   ├── prisma.ts
│   │   └── stripe.ts
│   ├── middleware
│   │   ├── auth.ts
│   │   ├── globalErrorHandler.ts
│   │   └── notFound.ts
│   ├── modules
│   │   ├── admin
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.routes.ts
│   │   │   └── admin.service.ts
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.interface.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.service.ts
│   │   ├── categories
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.route.ts
│   │   │   └── categories.service.ts
│   │   ├── landLord
│   │   │   ├── landLord.controller.ts
│   │   │   ├── landLord.interface.ts
│   │   │   ├── landLord.route.ts
│   │   │   └── landLord.service.ts
│   │   ├── payment
│   │   │   ├── payment.controller.ts
│   │   │   ├── payment.route.ts
│   │   │   ├── payment.service.ts
│   │   │   └── payment.utils.ts
│   │   ├── properties
│   │   │   ├── properties.controller.ts
│   │   │   ├── properties.interface.ts
│   │   │   ├── properties.route.ts
│   │   │   └── properties.service.ts
│   │   ├── rentalRequest
│   │   │   ├── rentalRequest.controller.ts
│   │   │   ├── rentalRequest.interface.ts
│   │   │   ├── rentalRequest.route.ts
│   │   │   └── rentalRequest.service.ts
│   │   ├── reviews
│   │   │   ├── reviews.controller.ts
│   │   │   ├── reviews.interface.ts
│   │   │   ├── reviews.route.ts
│   │   │   └── reviews.service.ts
│   │   └── user
│   │       ├── user.controller.ts
│   │       ├── user.route.ts
│   │       └── user.service.ts
│   ├── server.ts
│   └── utility
│       ├── AppError.ts
│       ├── catchAsync.ts
│       ├── jwtUtils.ts
│       ├── sendResponse.ts
│       └── util.interface.ts
└── tsconfig.json

```

## Features

- Role-based authorization for tenants, landlords, and administrators
- User registration, login, JWT authentication, and current-user lookup
- Public property browsing with location, price, and property-type filters
- Landlord property creation, editing, and deletion with ownership checks
- Tenant rental-request workflow and landlord approval/rejection workflow
- Stripe Checkout payment-session creation and Stripe webhook processing
- Tenant payment history and payment-detail lookup
- Verified reviews: a tenant can review only after a completed payment
- Admin views for users, properties, and rental requests
- Centralized error handling and Prisma database error mapping

## Technology stack

| Area                  | Technology                      |
| --------------------- | ------------------------------- |
| Runtime               | Node.js                         |
| Language              | TypeScript                      |
| Web framework         | Express 5                       |
| ORM                   | Prisma 7                        |
| Database              | PostgreSQL                      |
| Authentication        | JSON Web Token (`jsonwebtoken`) |
| Password hashing      | bcryptjs                        |
| Payments              | Stripe Checkout                 |
| Cross-origin requests | CORS                            |

## Prerequisites

Install the following before running the project:

- Node.js 20 or newer
- npm
- A PostgreSQL database
- A Stripe account and Stripe API keys, if you want to test payments

## Installation and local setup

1. Clone the repository and open the project directory.

   ```bash
   git clone <repository-url>
   cd rentNest
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root. Use `.env.example` as the starting point.

   ```bash
   cp .env.example .env
   ```

4. Fill in the environment values described below.

5. Apply the Prisma migrations and generate the Prisma client.

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

   For a new local database during development, use:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server.

   ```bash
   npm run dev
   ```

The server listens on `http://localhost:5000` by default. Visit `http://localhost:5000/` to confirm it is running.

## Available scripts

| Command                  | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| `npm run dev`            | Starts the TypeScript server in watch mode with `tsx`.                 |
| `npm run build`          | Compiles TypeScript into the `dist` directory.                         |
| `npm start`              | Starts the compiled application from `dist/server.js`.                 |

### Optional local Stripe webhook script

The Stripe webhook script is intentionally not included in the current `package.json` deployment configuration. If you want to test Stripe webhooks locally, add this entry inside the `scripts` object in `package.json`:

```json
"stripe:webhook": "stripe listen --forward-to localhost:5000/api/payments/webhook"
```

Then run:

```bash
npm run stripe:webhook
```

## Environment variables

Create a `.env` file. Do not commit it: it contains credentials and secrets.

| Variable                | Required     | Description                                                                                         | Example                                              |
| ----------------------- | ------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `DATABASE_URL`          | Yes          | PostgreSQL connection string used by Prisma.                                                        | `postgresql://user:password@localhost:5432/rentnest` |
| `MODE`                  | Yes          | Application environment. Use `development` locally and `production` when deployed.                  | `development`                                        |
| `PORT`                  | Yes          | Local HTTP server port.                                                                             | `5000`                                               |
| `APP_URL`               | Yes          | Frontend origin. This is the CORS allow-list value and the Stripe success/cancel redirect base URL. | `http://localhost:3000`                              |
| `BCRYPT_SALT_ROUNDS`    | Yes          | Cost factor used for password hashing.                                                              | `10`                                                 |
| `JWT_ACCESS_SECRET`     | Yes          | Secret used to sign and verify 1-day access tokens.                                                 | a long random value                                  |
| `JWT_REFRESH_SECRET`    | Yes          | Secret used to sign 7-day refresh tokens.                                                           | another long random value                            |
| `STRIPE_SECRET_KEY`     | For payments | Stripe secret API key.                                                                              | `sk_test_...`                                        |
| `STRIPE_WEBHOOK_SECRET` | For payments | Stripe webhook signing secret.                                                                      | `whsec_...`                                          |

Example:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/rentnest"
MODE=development
PORT=5000
APP_URL=http://localhost:3000
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_SECRET=replace-with-a-long-random-access-secret
JWT_REFRESH_SECRET=replace-with-a-different-long-random-refresh-secret
STRIPE_SECRET_KEY=sk_test_replace_me
STRIPE_WEBHOOK_SECRET=whsec_replace_me
```

## API conventions

### Base URL

Local base URL:

```text
http://localhost:5000
```

All API endpoints below are relative to this URL.

### Content type

Send JSON requests with:

```http
Content-Type: application/json
```

The Stripe webhook is the exception: Stripe sends its signed raw request body automatically. Do not send JSON manually to that endpoint when testing a webhook signature.

### Response format

Successful responses use this structure:

```json
{
  "success": true,
  "message": "Properties fetched successfully",
  "data": {}
}
```

Error responses use this structure:

```json
{
  "success": false,
  "statusCode": 404,
  "name": "Error",
  "message": "Requested record not found."
}
```

In `development` mode, errors can also include a stack trace. It is omitted in production.

### Authentication

Protected endpoints accept an access token in either of these forms:

```http
Authorization: Bearer <access-token>
```

or as the `accessToken` cookie created by the login endpoint.

The examples in this README use the `Authorization` header because it works cleanly with API clients such as Postman and Insomnia.

### Roles

| Role       | Meaning                                                                     |
| ---------- | --------------------------------------------------------------------------- |
| `TENANT`   | Can make rental requests, pay for approved requests, and create reviews.    |
| `LANDLORD` | Can manage only their own properties and their properties' rental requests. |
| `ADMIN`    | Can manage user account status and inspect platform-wide records.           |

### IDs and enum values

All resource IDs are UUID strings generated by the database.

| Enum                  | Allowed values                                                                 |
| --------------------- | ------------------------------------------------------------------------------ |
| User role             | `TENANT`, `LANDLORD`, `ADMIN`                                                  |
| Account status        | `ACTIVE`, `BLOCKED`                                                            |
| Property type         | `APARTMENT`, `HOUSE`, `STUDIO`, `OFFICE`, `SHOP`, `WAREHOUSE`, `LAND`, `OTHER` |
| Rental request status | `PENDING`, `APPROVED`, `REJECTED`                                              |
| Payment status        | `PENDING`, `COMPLETED`, `FAILED`                                               |

Public registration only accepts `TENANT` and `LANDLORD`; an `ADMIN` account cannot be created through the registration endpoint.

## API endpoint summary

| Module          | Method   | Endpoint                       | Access                  |
| --------------- | -------- | ------------------------------ | ----------------------- |
| Health          | `GET`    | `/`                            | Public                  |
| Authentication  | `POST`   | `/api/auth/register`           | Public                  |
| Authentication  | `POST`   | `/api/auth/login`              | Public                  |
| Authentication  | `GET`    | `/api/auth/me`                 | Any authenticated role  |
| Properties      | `GET`    | `/api/properties`              | Public                  |
| Properties      | `GET`    | `/api/properties/:id`          | Public                  |
| Categories      | `GET`    | `/api/categories`              | Public                  |
| Landlord        | `POST`   | `/api/landlord/properties`     | Landlord                |
| Landlord        | `PUT`    | `/api/landlord/properties/:id` | Property owner landlord |
| Landlord        | `DELETE` | `/api/landlord/properties/:id` | Property owner landlord |
| Landlord        | `GET`    | `/api/landlord/requests`       | Landlord                |
| Landlord        | `PATCH`  | `/api/landlord/requests/:id`   | Owner landlord          |
| Rental requests | `POST`   | `/api/rentals`                 | Tenant                  |
| Rental requests | `GET`    | `/api/rentals`                 | Tenant                  |
| Rental requests | `GET`    | `/api/rentals/:id`             | Request owner tenant    |
| Payments        | `POST`   | `/api/payments/create`         | Tenant                  |
| Payments        | `POST`   | `/api/payments/webhook`        | Stripe only             |
| Payments        | `GET`    | `/api/payments`                | Tenant or landlord      |
| Payments        | `GET`    | `/api/payments/:id`            | Tenant or landlord      |
| Reviews         | `POST`   | `/api/reviews`                 | Tenant                  |
| Reviews         | `GET`    | `/api/reviews/:propertyId`     | Public                  |
| Admin           | `GET`    | `/api/admin/users`             | Admin                   |
| Admin           | `PATCH`  | `/api/admin/users/:id`         | Admin                   |
| Admin           | `GET`    | `/api/admin/properties`        | Admin                   |
| Admin           | `GET`    | `/api/admin/rentals`           | Admin                   |

## Endpoint reference

### Health check

#### `GET /`

Confirms that the API server is running.

**Authentication:** none

**Request body:** none

**Success response:** plain text:

```text
Welcome to RentNest API
```

---

## Authentication endpoints

### Register a user

#### `POST /api/auth/register`

Creates a tenant or landlord account. The password is hashed before storage. Email addresses must be unique.

**Authentication:** none

**Request body**

| Field      | Type                   | Required | Description                                                 |
| ---------- | ---------------------- | -------- | ----------------------------------------------------------- |
| `name`     | string                 | Yes      | User's display name.                                        |
| `email`    | string                 | Yes      | Unique email address.                                       |
| `password` | string                 | Yes      | Plain-text password; the server hashes it.                  |
| `role`     | `TENANT` or `LANDLORD` | Yes      | Account role. Lowercase values are accepted and normalized. |
| `image`    | string                 | No       | Profile image URL. Defaults to `Image not provided`.        |
| `bio`      | string                 | No       | User biography. Defaults to `Bio not provided`.             |
| `phone`    | string                 | No       | Contact phone number. Defaults to `Phone not provided`.     |

**Example request**

```json
{
  "name": "Amina Rahman",
  "email": "amina@example.com",
  "password": "StrongPassword123!",
  "role": "TENANT",
  "phone": "+8801700000000",
  "bio": "Looking for a long-term apartment in Dhaka.",
  "image": "https://example.com/amina.jpg"
}
```

**Success response (`200`)**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user-uuid",
    "name": "Amina Rahman",
    "email": "amina@example.com",
    "image": "https://example.com/amina.jpg",
    "bio": "Looking for a long-term apartment in Dhaka.",
    "phone": "+8801700000000",
    "role": "TENANT",
    "activeStatus": "ACTIVE",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

**Common errors:** `400` invalid or missing role, `409` email already registered.

### Log in

#### `POST /api/auth/login`

Authenticates a user and returns access and refresh tokens. It also attempts to set `accessToken` and `refreshToken` HTTP-only cookies.

**Authentication:** none

**Request body**

| Field      | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| `email`    | string | Yes      | Registered email address. |
| `password` | string | Yes      | Account password.         |

**Example request**

```json
{
  "email": "amina@example.com",
  "password": "StrongPassword123!"
}
```

**Success response (`200`)**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

The access token expires after **1 day** and the refresh token after **7 days**. A refresh-token endpoint is not implemented in the current API, so the client must log in again when an access token expires.

**Common errors:** `401` invalid password, `403` blocked account, `404` email not found.

### Get the current user

#### `GET /api/auth/me`

Returns the authenticated user's profile without the password hash.

**Authentication:** `TENANT`, `LANDLORD`, or `ADMIN`

**Request body:** none

**Success response (`200`)** contains the user's `id`, `name`, `email`, `image`, `bio`, `phone`, `role`, `activeStatus`, `createdAt`, and `updatedAt`.

---

## Public property and category endpoints

### List properties

#### `GET /api/properties`

Returns all properties. Filters may be combined; each supplied filter must match.

**Authentication:** none

**Query parameters**

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `location` | string | No       | Case-insensitive partial match against `pLocation`.         |
| `price`    | number | No       | Exact property price.                                       |
| `type`     | string | No       | Property category type. Values are normalized to uppercase. |

**Examples**

```text
GET /api/properties
GET /api/properties?location=dhaka
GET /api/properties?price=25000&type=APARTMENT
```

For the property-list endpoint, each item contains summary data only: `id`, `pName`, `pLocation`, `pPrice`, `createdAt`, and the category's `id` and `type`. It intentionally does not return the landlord ID, property description, image, or category description. Use `GET /api/properties/:id` to retrieve the full property record.

```json
{
  "id": "property-uuid",
  "pName": "Lakeview Apartment",
  "pLocation": "Gulshan, Dhaka",
  "pPrice": "25000",
  "category": {
    "id": "category-uuid",
    "type": "APARTMENT"
  },
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

### Get one property

#### `GET /api/properties/:id`

Returns one full property record and its category, including `landLordId`, `pDescription`, `pImage`, category `description`, and timestamps.

**Authentication:** none

**Path parameter:** `id` is the property UUID.

**Common errors:** `404` when the property does not exist.

### List categories

#### `GET /api/categories`

Returns every category record in the database. A category belongs to one property in the current schema.

**Authentication:** none

**Request body:** none

---

## Landlord endpoints

All endpoints in this section require a valid landlord access token.

### Create a property

#### `POST /api/landlord/properties`

Creates a property owned by the logged-in landlord and creates its category at the same time.

**Authentication:** `LANDLORD`

**Request body**

| Field          | Type               | Required | Description                                                                                               |
| -------------- | ------------------ | -------- | --------------------------------------------------------------------------------------------------------- |
| `pName`        | string             | Yes      | Property name/title.                                                                                      |
| `pLocation`    | string             | Yes      | Property location.                                                                                        |
| `pPrice`       | number             | Yes      | Rental price in BDT.                                                                                      |
| `pDescription` | string             | Yes      | Full property description.                                                                                |
| `pImage`       | string             | No       | Property-image URL. Defaults to `Image not provided`.                                                     |
| `type`         | property-type enum | Yes      | `APARTMENT`, `HOUSE`, `STUDIO`, `OFFICE`, `SHOP`, `WAREHOUSE`, `LAND`, or `OTHER`. Lowercase is accepted. |
| `description`  | string             | No       | Category description. Defaults to `Description not provided`.                                             |

**Example request**

```json
{
  "pName": "Lakeview Apartment",
  "pLocation": "Gulshan, Dhaka",
  "pPrice": 25000,
  "pDescription": "A furnished two-bedroom apartment near Gulshan Lake.",
  "pImage": "https://example.com/lakeview.jpg",
  "type": "APARTMENT",
  "description": "Residential two-bedroom apartment"
}
```

**Success response:** returns the created property and nested category.

### Update a property

#### `PUT /api/landlord/properties/:id`

Updates fields on a property owned by the logged-in landlord. Any omitted field keeps its previous value.

**Authentication:** `LANDLORD`, and the landlord must own `:id`

**Path parameter:** `id` is the property UUID.

**Request body:** any subset of the create-property fields.

```json
{
  "pPrice": 27000,
  "pDescription": "Newly renovated furnished two-bedroom apartment.",
  "type": "APARTMENT"
}
```

**Important:** the update operation stores the supplied `type` as-is; use uppercase enum values such as `APARTMENT` to avoid invalid data.

**Common errors:** `403` when the property belongs to another landlord; `404` when it does not exist.

### Delete a property

#### `DELETE /api/landlord/properties/:id`

Deletes a property owned by the logged-in landlord. Associated category, rental-request, and review records are removed according to the schema's cascade relations.

**Authentication:** `LANDLORD`, and the landlord must own `:id`

**Request body:** none

**Success response (`200`)**

```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

### List requests for the landlord's properties

#### `GET /api/landlord/requests`

Returns rental requests across all properties owned by the authenticated landlord.

**Authentication:** `LANDLORD`

Each request includes `id`, `propertyId`, `tenantId`, `message`, `status`, `createdAt`, and `updatedAt`.

### Approve or reject a rental request

#### `PATCH /api/landlord/requests/:id`

Changes the status of a rental request for a property owned by the logged-in landlord.

**Authentication:** `LANDLORD`, and the landlord must own the request's property

**Path parameter:** `id` is the rental-request UUID.

**Request body**

| Field    | Type   | Required | Allowed values           |
| -------- | ------ | -------- | ------------------------ |
| `status` | string | Yes      | `APPROVED` or `REJECTED` |

```json
{
  "status": "APPROVED"
}
```

The API rejects `PENDING` in this endpoint. An approved request is required before its tenant can create a payment session.

---

## Tenant rental-request endpoints

### Create a rental request

#### `POST /api/rentals`

Creates a rental request for the authenticated tenant. New requests begin with the status `PENDING`.

**Authentication:** `TENANT`

**Request body**

| Field        | Type        | Required | Description                                                       |
| ------------ | ----------- | -------- | ----------------------------------------------------------------- |
| `propertyId` | UUID string | Yes      | Property the tenant wants to rent.                                |
| `message`    | string      | No       | Message to the landlord. Defaults to `No message left by tenant`. |

**Example request**

```json
{
  "propertyId": "property-uuid",
  "message": "I would like to rent this property from next month."
}
```

**Success response:** returns the created rental request with its `id`, property and tenant IDs, message, status, and timestamps.

**Common errors:** `400` invalid property foreign key, `401` missing token.

### List my rental requests

#### `GET /api/rentals`

Returns every rental request created by the authenticated tenant, newest first.

**Authentication:** `TENANT`

Each item includes `id`, `propertyId`, `tenantId`, `status`, and `createdAt`.

**Common errors:** `404` when the tenant has no rental requests.

### Get one of my rental requests

#### `GET /api/rentals/:id`

Returns a rental request only if it belongs to the authenticated tenant. The response includes a limited view of its property.

**Authentication:** `TENANT`, and the tenant must own the request

**Path parameter:** `id` is the rental-request UUID.

The nested property contains `id`, `pName`, `pLocation`, `pPrice`, and `pDescription`.

---

## Payment endpoints

### Create a Stripe Checkout session

#### `POST /api/payments/create`

Creates a Stripe-hosted Checkout session for an approved rental request that belongs to the authenticated tenant.

**Authentication:** `TENANT`

**Request body**

| Field             | Type        | Required | Description                                             |
| ----------------- | ----------- | -------- | ------------------------------------------------------- |
| `rentalRequestId` | UUID string | Yes      | An approved rental request owned by the current tenant. |

**Example request**

```json
{
  "rentalRequestId": "rental-request-uuid"
}
```

**Success response (`200`)**

```json
{
  "success": true,
  "message": "Payment session created successfully",
  "data": {
    "paymentUrl": "https://checkout.stripe.com/c/pay/..."
  }
}
```

Redirect the user to `paymentUrl` to complete the payment on Stripe. The charge amount is the property's `pPrice`, converted from BDT to paisa (`price × 100`). Stripe redirects the buyer to:

```text
${APP_URL}/payment?success=true
${APP_URL}/payment?success=false
```

**Common errors:** `403` if the request is not owned by the tenant or is not approved; `404` if the rental request does not exist.

### Receive Stripe events

#### `POST /api/payments/webhook`

Receives Stripe webhook events. This endpoint verifies the `stripe-signature` header against `STRIPE_WEBHOOK_SECRET` and handles `checkout.session.completed`.

**Authentication:** Stripe signature verification; no JWT

**Request body:** raw body sent by Stripe. Do not use `express.json()` before this route; the application already configures `express.raw()` for it.

On a completed checkout session, the API creates or updates one payment record for the rental request with:

- `status: COMPLETED`
- Stripe customer ID
- Stripe payment-intent ID
- paid amount

**Local testing with Stripe CLI**

```bash
npm run stripe:webhook
```

Before running this command, add the optional `stripe:webhook` script shown in [Optional local Stripe webhook script](#optional-local-stripe-webhook-script). It requires the Stripe CLI to be installed and authenticated. Copy the displayed webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

### Get payment history

#### `GET /api/payments`

Returns payment records for the authenticated user's own account, newest first.

**Authentication:** `TENANT` or `LANDLORD`

Each history item contains `id`, `amount`, `status`, and `createdAt`.

### Get payment details

#### `GET /api/payments/:id`

Returns a payment record with the associated user, rental request, and property details.

**Authentication:** `TENANT` or `LANDLORD`

**Path parameter:** `id` is the payment UUID.

The response includes the payment record, the paying user's basic profile, rental-request status, and the property's ID, name, location, and price.

---

## Review endpoints

### Create a review

#### `POST /api/reviews`

Creates a property review for a tenant's completed, paid rental request.

**Authentication:** `TENANT`

The API verifies all of the following before creating the review:

1. A payment exists for `rentalRequestId`.
2. The payment belongs to the authenticated tenant.
3. The payment status is `COMPLETED`.
4. The tenant has not already reviewed this rental request.

**Request body**

| Field             | Type        | Required | Description                                  |
| ----------------- | ----------- | -------- | -------------------------------------------- |
| `rentalRequestId` | UUID string | Yes      | Rental request that was paid by this tenant. |
| `title`           | string      | Yes      | Short review title.                          |
| `description`     | string      | Yes      | Review content.                              |

**Example request**

```json
{
  "rentalRequestId": "rental-request-uuid",
  "title": "Excellent location",
  "description": "The property was clean, well maintained, and exactly as described."
}
```

**Common errors:** `404` no payment exists; `403` payment belongs to another user; `400` payment is incomplete or a review already exists.

### List property reviews

#### `GET /api/reviews/:propertyId`

Returns all reviews for one property. Each review includes the reviewer's `name` and `email`.

**Authentication:** none

**Path parameter:** `propertyId` is the property UUID.

**Common errors:** `404` if the property has no reviews.

---

## Admin endpoints

All endpoints in this section require an `ADMIN` token. Public registration cannot create administrators; create or seed an admin account directly in the database.

### List users

#### `GET /api/admin/users`

Returns all users with `id`, `name`, `email`, `role`, `activeStatus`, and `createdAt`.

**Authentication:** `ADMIN`

### Change user account status

#### `PATCH /api/admin/users/:id`

Updates a user's account status. A blocked user cannot log in or access protected resources.

**Authentication:** `ADMIN`

**Path parameter:** `id` is the user UUID.

**Request body**

| Field    | Type   | Required | Allowed values        |
| -------- | ------ | -------- | --------------------- |
| `status` | string | Yes      | `ACTIVE` or `BLOCKED` |

```json
{
  "status": "BLOCKED"
}
```

### List all properties

#### `GET /api/admin/properties`

Returns platform-wide property records with `id`, `landLordId`, name, location, price, description, and creation time.

**Authentication:** `ADMIN`

### List all rental requests

#### `GET /api/admin/rentals`

Returns platform-wide rental requests with `id`, `propertyId`, `tenantId`, `status`, and `createdAt`.

**Authentication:** `ADMIN`

## Typical user flow

```text
1. Tenant or landlord registers and logs in.
2. Landlord creates a property.
3. Tenant searches properties and sends a rental request.
4. Landlord lists incoming requests and approves or rejects one.
5. Tenant creates a Stripe Checkout session for an approved request.
6. Stripe redirects the tenant after checkout and sends checkout.session.completed to the webhook.
7. The webhook records the completed payment.
8. Tenant creates one review for the completed rental request.
```

## Database model overview

| Model           | Purpose                                     | Main relations                                                           |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| `User`          | Tenant, landlord, or administrator account. | Owns properties; creates rental requests, payments, and reviews.         |
| `Property`      | A rental listing owned by a landlord.       | Has one optional category; has many rental requests and reviews.         |
| `Category`      | Property type and category description.     | One-to-one with a property.                                              |
| `rentalRequest` | A tenant's request to rent a property.      | Belongs to one tenant and property; has one optional payment and review. |
| `Payment`       | Stripe payment record.                      | Belongs to one user and one rental request.                              |
| `Review`        | Tenant feedback for a completed rental.     | Belongs to one tenant, property, and rental request.                     |

## Authorization rules

| Action                     | Rule enforced by the API                                                              |
| -------------------------- | ------------------------------------------------------------------------------------- |
| Create property            | Only a landlord can create it; ownership is set from the authenticated user.          |
| Update/delete property     | Only the landlord who owns that property can do so.                                   |
| View tenant rental request | Only the tenant who created it can view it by ID.                                     |
| Approve/reject request     | Only the landlord whose property received the request can change it.                  |
| Create payment session     | Only the request's tenant can pay, and only after it is approved.                     |
| Create review              | Only the paying tenant can review, after a completed payment; one review per request. |
| Admin operations           | Only an administrator can use `/api/admin/*`.                                         |

## Deployment notes

For a production deployment:

1. Set `MODE=production`.
2. Set `APP_URL` to the exact deployed frontend origin so CORS and Stripe redirects work.
3. Add every production environment variable in the hosting provider's project settings; do not upload `.env`.
4. Use a publicly reachable HTTPS URL for the Stripe webhook endpoint:

   ```text
   https://your-api-domain.com/api/payments/webhook
   ```

5. Add the webhook endpoint in Stripe Dashboard and copy its signing secret into `STRIPE_WEBHOOK_SECRET`.
6. Use a production PostgreSQL connection string and run Prisma migrations against it before accepting traffic.

## Current limitations and future improvements

- There is no logout endpoint or token-refresh endpoint yet.
- There is no pagination, sorting, or price-range search for properties yet; the price filter is an exact match.
- Request payloads rely primarily on Prisma/database validation; adding a schema validator such as Zod would provide clearer field-level errors.
- The API currently has no automated test suite.
- For cross-site cookie authentication in production, ensure the login-cookie configuration uses `secure: true` over HTTPS. Clients can always use the documented `Authorization: Bearer <token>` header.

## License

This project is currently distributed under the ISC license declared in `package.json`.
