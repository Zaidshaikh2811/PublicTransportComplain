# Public Transport Application

A modern web application built with Next.js that provides public transport information and services. This application offers a user-friendly interface for managing transportation-related services with integrated contact functionality.

## Features

- 🚌 Public transport information and management
- 📱 Responsive design for all devices
- 📧 Contact form with email integration
- 🔐 User authentication
- 🎨 Modern UI with custom components
- ⚡ Server-side rendering for optimal performance

## Technologies Used

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Email Service:** Custom email integration
- **Authentication:** Built-in Next.js authentication
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/public_transport.git
cd public_transport
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```bash
EMAIL_USER=your_email@example.com
# Add other required environment variables
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Endpoints

### Contact API

POST `/api/contact`
- Handles contact form submissions
- Request body:
```json
{
    "name": "string",
    "email": "string",
    "subject": "string",
    "message": "string"
}
```
- Returns:
  - 200: Success
  - 400: Missing fields
  - 500: Server error

## Project Structure

```
├── app/                 # Next.js app directory
├── components/         # Reusable UI components
├── actions/           # Server actions
├── lib/              # Utility functions
├── public/           # Static assets
└── ...
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, please:
- Open an issue in the GitHub repository
- Contact through the website's contact form
- Email: [zaidshaikh2811@gmail.com]

 
