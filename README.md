# Manas Arora Portfolio

A Next.js portfolio featuring selected product engineering, backend, and AI work.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## EmailJS Setup

Create `.env.local` from `.env.example` and provide credentials from your EmailJS dashboard:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

The EmailJS template should accept these variables:

- `from_name`
- `from_email`
- `reply_to`
- `to_name`
- `message`

Restart the development server after changing environment variables. Add the same variables to the deployment environment before publishing.

## Commands

```bash
npm run lint
npm run build
```
