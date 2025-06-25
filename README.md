# Marten x Wisehosting

This guide will help you set up and run the project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- Composer
- PHP (8.2 or higher)

## Setup and Installation

Follow these steps to get the project up and running:

1.  **Install Node.js Dependencies:**

    ```bash
    npm install
    ```

2.  **Build Frontend Assets:**

    ```bash
    npm run build
    ```

3.  **Install PHP Dependencies:**

    ```bash
    composer install
    ```

4.  **Configure Environment:**

    ```bash
    cp .env.example .env
    ```

5.  **Generate Application Key:**

    ```bash
    php artisan key:generate
    ```

6.  **Create SQLite Database File:**
    Ensure you have an empty SQLite database file.

    ```bash
    touch database/database.sqlite
    ```

    _(Note: On Windows, you might need to manually create an empty `database.sqlite` file inside the `database` folder if `touch` doesn't work.)_

7.  **Run Migrations and Seed Database:**
    This command will create the necessary database tables and populate them with initial data, including an admin user.
    ```bash
    php artisan migrate:fresh --seed
    ```

## Running the Project

To run the project, you'll need two separate terminal windows.

1.  **Start Development Server (Terminal 1):**

    ```bash
    composer run dev
    ```

    This will start the Laravel development server and may also run frontend watch scripts.

2.  **Start Queue Worker (Terminal 2):**
    Open a **separate terminal window** and run the queue worker.
    ```bash
    php artisan queue:work
    ```

You should now be able to access the application in your web browser (usually at `http://localhost:8000`).

## Admin Credentials

- **Email:** `admin@wisehosting.ee`
- **Password:** `password`
