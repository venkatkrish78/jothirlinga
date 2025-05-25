# Jyotirlinga Temples Web Application

A comprehensive multilingual web application dedicated to the 12 sacred Jyotirlinga temples of Lord Shiva in India. This platform provides detailed information, travel planning tools, and interactive features for pilgrims and spiritual tourists in English, Hindi, and Tamil.

## Features Overview

### Temple Profiles
- Detailed information about all 12 Jyotirlinga temples
- Historical background and religious significance
- Temple architecture and unique features
- Worship timings and special darshan details
- Major festivals and celebrations
- Dress code and etiquette guidelines
- Contact information and official resources

### Pilgrim Information
- Comprehensive guides for pilgrims
- Religious practices and rituals
- Accommodation options near temples
- Food availability and prasad details
- Facilities available at temple premises
- Safety tips and emergency contacts

### Travel Planning
- Detailed travel circuits connecting multiple temples
- Transportation options (air, rail, road)
- Local transport information
- Best time to visit and weather information
- Itinerary suggestions for different durations

### User Experience
- Multilingual support (English, Hindi, Tamil)
- Bookmark favorite temples for quick access
- Advanced search functionality
- Responsive design for all devices
- Interactive maps for temple locations

## Technologies Used

### Frontend
- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS for styling
- i18next for internationalization

### Backend
- Next.js API routes
- Prisma ORM
- PostgreSQL database

### Deployment
- GitHub for version control
- Environment configuration for different deployment scenarios

## Installation and Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Git

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/venkatkrish78/jothirlinga.git
   cd jothirlinga
   ```

2. Install dependencies:
   ```bash
   cd app
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `app` directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/jyotirlinga_db"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   npm start
   ```

## Usage Instructions

### Navigating the Application
- The homepage provides an overview of all 12 Jyotirlinga temples
- Click on any temple to view detailed information
- Use the navigation menu to access different sections:
  - Temples
  - Pilgrim Information
  - Travel Planning
  - Bookmarks
  - Search

### Using Multilingual Features
- Use the language switcher in the header to change between English, Hindi, and Tamil
- All content, including temple descriptions, travel information, and user interface elements, will be displayed in the selected language

### Bookmarking Temples
- Create an account or log in to use the bookmarking feature
- Click the bookmark icon on any temple page to save it to your bookmarks
- Access all bookmarked temples from the Bookmarks section

## Multilingual Support Details

The application supports three languages:
- English (en) - Default language
- Hindi (hi) - For native Hindi speakers
- Tamil (ta) - For native Tamil speakers

The internationalization is implemented using:
- i18next library
- Language detection based on browser preferences
- Manual language selection through the UI
- Translations for all static content and dynamic data

## Project Structure

```
jyotirlinga_temples_app/
├── app/                      # Main application directory
│   ├── app/                  # Next.js app directory
│   │   ├── [lng]/            # Dynamic routes for language support
│   │   ├── api/              # API routes
│   │   ├── bookmarks/        # Bookmarks feature
│   │   ├── i18n/             # Internationalization configuration
│   │   ├── pilgrim-info/     # Pilgrim information pages
│   │   ├── search/           # Search functionality
│   │   ├── temples/          # Temple listing and details
│   │   └── travel-planning/  # Travel planning tools
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # UI component library
│   │   └── ...               # Feature-specific components
│   ├── lib/                  # Utility functions and shared code
│   │   ├── db/               # Database utilities
│   │   └── ...               # Other utilities
│   ├── prisma/               # Database schema and migrations
│   │   ├── migrations/       # Database migration files
│   │   └── schema.prisma     # Prisma schema definition
│   └── ...                   # Configuration files
```

## Database Schema

The application uses a PostgreSQL database with the following main models:

- **Temple**: Stores information about each Jyotirlinga temple, including location, history, significance, timings, and facilities
- **Image**: Stores images related to temples
- **TravelCircuit**: Defines travel circuits connecting multiple temples
- **User**: Stores user information for personalized features
- **Bookmark**: Tracks user bookmarks for temples

## Contributors/Credits

This project was developed with contributions from:
- Development Team at [Your Organization]
- Temple information sourced from authoritative texts and official temple websites
- Special thanks to the temple authorities for verification of information

## License

[Specify your license information here]

---

For more information, visit the [GitHub repository](https://github.com/venkatkrish78/jothirlinga.git).
