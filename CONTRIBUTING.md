
# Contributing to Jyotirlinga Temples Web Application

Thank you for your interest in contributing to the Jyotirlinga Temples web application! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branching Strategy](#branching-strategy)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Internationalization (i18n)](#internationalization-i18n)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We aim to foster an inclusive and welcoming community.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/jothirlinga.git
   cd jothirlinga
   ```
3. Add the original repository as an upstream remote:
   ```bash
   git remote add upstream https://github.com/venkatkrish78/jothirlinga.git
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```
6. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
7. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

1. Create a new branch for your feature or bug fix
2. Make your changes
3. Run tests and ensure code quality
4. Commit your changes with a descriptive commit message
5. Push your branch to your fork
6. Create a pull request to the main repository

## Branching Strategy

- `main`: The production branch, containing stable code
- `develop`: The development branch, where features are integrated
- `feature/feature-name`: For new features
- `bugfix/bug-name`: For bug fixes
- `hotfix/issue-name`: For urgent fixes to production

Always create your feature or bugfix branches from the `develop` branch:

```bash
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types include:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
```
feat(temples): add new temple details page
fix(auth): resolve login issue with special characters
docs(readme): update installation instructions
```

## Pull Request Process

1. Update your branch with the latest changes from develop:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout your-branch-name
   git rebase develop
   ```
2. Ensure your code passes all tests and linting
3. Create a pull request to the `develop` branch
4. Fill in the pull request template with details about your changes
5. Request a review from a maintainer
6. Address any feedback from reviewers
7. Once approved, your PR will be merged

## Coding Standards

- Follow the existing code style in the project
- Use TypeScript for type safety
- Use ESLint and Prettier for code formatting
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused on a single responsibility

## Internationalization (i18n)

This project supports multiple languages (English, Hindi, and Tamil). When adding new text:

1. Add the text to the appropriate language files in the `app/i18n` directory
2. Use the translation functions in your components:
   ```tsx
   import { useTranslation } from 'react-i18next';

   function MyComponent() {
     const { t } = useTranslation();
     return <h1>{t('key.for.translation')}</h1>;
   }
   ```
3. Test your changes in all supported languages

## Testing

- Write tests for new features and bug fixes
- Run tests before submitting a pull request:
  ```bash
  npm test
  ```
- Ensure your changes don't break existing functionality

## Documentation

- Update documentation when adding or changing features
- Document complex code with comments
- Update the README.md if necessary
- Consider adding examples for new features

Thank you for contributing to the Jyotirlinga Temples web application!
