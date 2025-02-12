# Next.js TypeScript Application with Modern UI Components

A modern web application built with Next.js, TypeScript, and Tailwind CSS, featuring reusable components and a clean architecture.

## 🚀 Features

- Modern and responsive UI components
- Reusable Modal system
- Search functionality with debounce
- TypeScript support
- API service layer
- Utility functions
- Tailwind CSS styling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   ├── TableHeader.tsx
│   │   ├── TableFilters.tsx
│   │   ├── TablePagination.tsx
│   │   └── TableRow.tsx
│   ├── Modal/
│   │   ├── CreateModal.tsx
│   │   ├── UpdateModal.tsx
│   │   └── DeleteModal.tsx
│   └── Search/
│       └── SearchBar.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
└── utils/
    └── helpers.ts
```

## 🔧 Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Static typing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Axios](https://axios-http.com/) - HTTP client
- [Radix UI](https://www.radix-ui.com/) - Headless UI components

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👥 Authors

- Your Name - Initial work - [YourGithubUsername](https://github.com/akyllus)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) team for the incredible framework
