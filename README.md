# Portfolio Website

Personal portfolio site showcasing my work in robotics, embedded systems, computer vision, and full-stack development.

**Live site:** [ADD_YOUR_VERCEL_LINK_HERE]

## Overview

This repository contains the source code for my personal portfolio, built to present my projects, engineering values, and background in a way that reflects the kind of work I do: systems that span hardware, embedded firmware, and the software layers on top of them.

## Tech Stack

|---------------------|-------------------------|
**| Category            | Technology              |**
|---------------------|-------------------------|
| Framework           | Next.js 14 (App Router) |
| Language            | TypeScript              |
| Styling             | Tailwind CSS            |
| Animation           | Framer Motion           |
| Email/Contact form  | Resend                  |
| Deployment          | Vercel                  |
|---------------------|-------------------------|

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm (or yarn/pnpm, adjust commands accordingly)

### Installation

1. Clone the repository:
    ```bash
       git clone https://github.com/DastardlyKat/portfolio_website.git
       cd portfolio_website
    ```

2. Install dependencies:
    ```bash
       npm install
    ```

3. Set up environment variables. Create a `.env.local` file in the project root:
     RESEND_API_KEY=your_resend_api_key_here

     You'll need a [Resend](https://resend.com) account and API key for the contact form to send emails. Without it, the rest of the site still runs      fine, only the contact form submission will fail.

4. Run the development server:
    ```bash
       npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

``` bash
    npm run build
    npm run start
```

## Project Structure
```
    src/
      ├── app/ Next.js app router pages and layouts
      ├── components/
      │ ├── sections/ Page sections (Hero, About, Projects, ContactCTA, etc.)
      │ └── ui/ Shared/reusable UI components
      ├── lib/ Utility functions and shared logic
      └── public/ Static assets (images, icons)
```

## Deployment

The site is deployed on Vercel with automatic deployments triggered on every push to the `main` branch. Environment variables are configured directly in the Vercel project settings.

## License

This project is personal and not licensed for reuse.
