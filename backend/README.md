# Pastelaria Backend API

Backend API for Pastelaria system - A comprehensive solution for managing a pastry shop's menu, information, gallery, promotions, and location.

## Features

- **Menu Display**: Present all available pastry flavors with detailed ingredient descriptions, prices, and availability information
- **Establishment Information**: Show complete data about the pastry shop including operating hours, address, contact phone, and establishment history
- **Photo Gallery**: Display images of pastries, the shop environment, and events held at the location
- **Promotions and News**: Present information about seasonal promotions, special combos, and new flavors added to the menu
- **Location**: Show the pastry shop's location on an interactive map with route options and access information

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Microsoft SQL Server
- **Validation**: Zod
- **Architecture**: REST API with multi-tenancy support

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # API version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── instances/              # Service instances
├── constants/              # Application constants
├── types/                  # TypeScript type definitions
├── config/                 # Configuration
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Microsoft SQL Server instance
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your database credentials and configuration

### Development

Run the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/v1`

### Building for Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Documentation

### Health Check

```
GET /health
```

Returns the health status of the API.

### API Versioning

All API endpoints are versioned and follow the pattern:
```
/api/v1/external/...  # Public endpoints
/api/v1/internal/...  # Authenticated endpoints
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| API_VERSION | API version | v1 |
| DB_SERVER | Database server | localhost |
| DB_PORT | Database port | 1433 |
| DB_USER | Database user | sa |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | pastelaria |
| DB_ENCRYPT | Enable encryption | true |
| CORS_ORIGINS | Allowed CORS origins | localhost:3000,localhost:3001,localhost:5173 |

## Development Guidelines

- Follow TypeScript strict mode conventions
- Use Zod for request validation
- Implement proper error handling
- Document all API endpoints with TSDoc comments
- Write tests for all business logic
- Follow the established folder structure

## License

ISC