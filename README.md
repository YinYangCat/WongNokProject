# WongNok — Restaurant Review Platform

WongNok is a full-stack web application for discovering and reviewing local restaurants. Users can browse restaurants, read and write reviews, and manage their profiles. Admins can add, edit, and remove restaurant listings.

---

## Features

- Browse and search restaurants by name or province
- View restaurant details, ratings, and customer reviews
- User registration and login with password hashing (bcrypt)
- Submit star ratings and written reviews
- User profile with photo upload
- Admin panel to manage restaurant listings (add, edit, delete)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js v5 |
| Database | PostgreSQL (via `pg`) |
| Templating | EJS |
| Styling | Tailwind CSS v4 (CLI build) |
| Auth | bcrypt, express-session, JWT |
| File Upload | Multer |
| Environment | dotenv |

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YinYangCat/WongNokProject.git
cd WongNokProject/main_work

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in your DATABASE_URL
```

### Database Setup

Connect to PostgreSQL and run the following files in order:

```bash
# Create the schema (run from repo root)
psql -U postgres -d your_database_name -f WongnokDB.sql

# Seed restaurant data
psql -U postgres -d your_database_name -f Insert_restaurants.sql
```

### Environment Variables

Create a `.env` file inside `main_work/` based on `.env.example`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME
NODE_ENV=development
```

### Running the App

```bash
# Inside main_work/
npm start
```

The app will be available at `http://localhost:4000`.

To rebuild Tailwind CSS after editing styles:

```bash
npm run dev
```

---

## Project Structure

```
WongNokProject/
├── main_work/              # Main application
│   ├── controllers/        # Route handler logic
│   ├── middleware/         # Auth and upload middleware
│   ├── public/             # Static assets (CSS, JS, images, uploads)
│   ├── routes/             # Express route definitions
│   ├── views/              # EJS templates
│   ├── db.js               # PostgreSQL connection
│   ├── index.js            # App entry point
│   └── package.json
├── WongnokDB.sql           # Database schema
└── Insert_restaurants.sql  # Seed data
```

---

## Creating an Admin Account

1. Register a normal account via `/register`
2. Find your `userid` in the database:
   ```sql
   SELECT userid, name FROM users;
   ```
3. Insert into the admin table:
   ```sql
   INSERT INTO admin (userid, permissionlevel) VALUES (your_userid, 1);
   ```
4. Log out and back in — the `/admin` panel will now be accessible

---

## Author

Veerawat Leesakul (House) — [GitHub](https://github.com/YinYangCat) · [LinkedIn](https://www.linkedin.com/in/veerawat-leesakul)  
Run Prajunban (Non) — [GitHub](https://github.com/RunPrajunban) · [LinkedIn](https://www.linkedin.com/in/runprajunban)  
Noppharoot Bavornkijsutee (Nop) — [GitHub](https://github.com/NOPDEJA) · [LinkedIn](https://www.linkedin.com/in/noppharoot-bavorn)  
Nattawat Ruensumrit (Tai) — [GitHub](https://github.com/Nattawat1409) · [LinkedIn](https://www.linkedin.com/in/nattawat-ruensumrit-8010a32a7)
 
