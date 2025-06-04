# .Blog Application

A full-stack blogging platform built with Laravel (API) and Next.js (Frontend) that allows users to create, manage, and interact with blog posts.

## Project Structure

```
blog/
├── api/          # Laravel Backend API
└── front/        # Next.js Frontend Application
```

## Technology Stack

### Backend (API)
- **Framework**: Laravel 12.x
- **Language**: PHP 8.2+
- **Authentication**: Laravel Sanctum
- **Database**: PostgreSQL
- **Server**: PHP Built-in Server (Development)

### Frontend
- **Framework**: Next.js 15.2.4
- **Language**: JavaScript/React 19.x
- **Styling**: Tailwind CSS 4.x
- **Rich Text Editor**: TipTap
- **HTTP Client**: Axios
- **UI Components**: Radix UI, Lucide React

## API Endpoints

### Base URL
All API endpoints are prefixed with `/api/v1`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | User login | No |
| POST | `/logout` | User logout | Yes |

### User/Profile Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | No |
| GET | `/user/{id}` | Get user by ID | No |
| GET | `/user` | Get current authenticated user | Yes |
| PUT | `/user` | Update user profile | Yes |
| GET | `/user/{id}/posts` | Get posts by user ID | No |

### Post Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all posts (public) | No |
| GET | `/posts` | Get user's posts | Yes |
| POST | `/posts/{index}` | Get paginated posts | No |
| GET | `/post/{id}` | Get single post | No |
| POST | `/post` | Create new post | Yes |
| POST | `/post/{id}/edit` | Update post | Yes |
| GET | `/posts/search/{searchValue}` | Search posts | No |

### Like/Unlike Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/post/{id}/like` | Like a post | Yes |
| POST | `/post/{id}/unlike` | Unlike a post | Yes |
| GET | `/post/{id}/like` | Get post likes | No |

### Test Endpoint

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/test` | API health check | No |

## Request/Response Examples

### Authentication

#### Register User
```json
POST /api/v1/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```json
POST /api/v1/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Posts

#### Create Post
```json
POST /api/v1/post
Authorization: Bearer {token}
{
  "heading": "My Blog Post Title",
  "content": "Rich text content from TipTap editor"
}
```

#### Update Post
```json
POST /api/v1/post/{id}/edit
Authorization: Bearer {token}
{
  "heading": "Updated Title",
  "content": "Updated content"
}
```

## Frontend Features

### Pages and Routes
- **Home Page**: Display all public posts
- **Authentication**: Login/Register pages
- **User Dashboard**: Manage personal posts
- **Post Editor**: Rich text editor for creating/editing posts
- **User Profiles**: View user information and their posts
- **Search**: Search through posts

### Key Components
- **Rich Text Editor**: TipTap-based editor with formatting options
- **Post Management**: Create, edit, delete posts
- **User Authentication**: JWT-based authentication with local storage
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Like System**: Like/unlike posts functionality

### Frontend Services

#### API Integration
The frontend uses a centralized API service (`services/api.js`) with the following key functions:

- `loginUser(email, password)` - User login
- `registerUser(name, email, password)` - User registration
- `getUser()` - Get current user data
- `getUserById(id)` - Get user by ID
- `postPosts(json, heading)` - Create new post
- `updatePost(postId, heading, content)` - Update existing post
- `likePost(postId)` - Like a post
- `unlikePost(postId)` - Unlike a post
- `searchPosts(searchValue, userId)` - Search posts

## Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- npm/yarn

### Backend Setup

1. Navigate to the API directory:
```bash
cd blog/api
```

2. Install PHP dependencies:
```bash
composer install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Run migrations:
```bash
php artisan migrate
```

6. Start the development server:
```bash
php artisan serve --host=0.0.0.0 --port=8000
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd blog/front
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file with:
NEXT_PUBLIC_URL=http://localhost:8000/api/v1
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
APP_NAME=BlogAPI
APP_ENV=local
APP_KEY=base64:generated_key
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database.sqlite
```

### Frontend (.env.local)
```
NEXT_PUBLIC_URL=http://localhost:8000/api/v1
```

## Authentication

The application uses Laravel Sanctum for API authentication. The frontend stores JWT tokens in localStorage and includes them in API requests via Authorization headers.

## Development

### Backend Development
- API endpoints are defined in `routes/api.php`
- Controllers are in `app/Http/Controllers/`
- Models are in `app/Models/`

### Frontend Development
- Pages are in `app/` directory (App Router)
- Components are in `components/` and `app/components/`
- API services are in `services/`
- Styling uses Tailwind CSS with custom configurations

### Building for Production

#### Backend
```bash
cd blog/api
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### Frontend
```bash
cd blog/front
npm run build
npm start
```

## License

This project is open-sourced software licensed under the MIT license.
