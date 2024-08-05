# Project Name

## Features

- **Search Modules**: Search for various modules with multiple filters.
- **Pagination**: Navigate through search results with pagination.
- **Lazy Loading**: Optimized image loading with a lazy loading component.
- **Responsive Design**: Fully responsive design for a seamless user experience across devices.

## Installation

To get started with this project, follow these steps:

### Install Dependencies

```bash
npm install
```
## Environment Variables
Create a .env file in the root of your project and add the following environment variables:

env
Copy code
NEXT_PUBLIC_KEY=ab9c416ff4c90a2d836faf735249f1dd
NEXT_PUBLIC_url=https://libraries.io/api/search

# Usage
Running the Development Server
To start the development server, use:

bash
Copy code
npm run dev
This will start the application at http://localhost:3000.

# Building the Project
To create a production build of the project, use:

bash
Copy code
npm run build
Running Tests
To run tests, use:

bash
Copy code
npm test

# API

Endpoints
GET /api/modules
Description: Fetch a list of modules based on search query and filters.
Parameters:
query (string): Search query.
page (number): Page number for pagination.
filters (object): Filter options (languages, licenses, platforms).
Example Request
bash
Copy code
curl -X GET "https://libraries.io/api/search?q=example&per_page=10&page=1"
Example Response
json
Copy code
{
  "data": [
    {
      "name": "Module 1",
      "description": "Description of Module 1",
      "homepage": "https://example.com",
      "language": "JavaScript",
      "platform": "npm",
      "license": "MIT",
      "owner": "Owner",
      "stars": "5"
    }
  ],
  "totalRecords": 100
}

# Testing

This project uses [testing framework] for unit and integration tests. Tests are located in the __tests__ directory.

Running Tests
To run all tests, use:

bash
Copy code
npm test
To run a specific test file, use:

bash
Copy code
npm test path/to/testfile
