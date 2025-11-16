# PantryPal - Recipe Finder

A modern, responsive recipe discovery application built with React and Vite. PantryPal helps you discover delicious recipes based on the ingredients you already have in your pantry.

## 🎯 Features

- **Ingredient-Based Recipe Search**: Enter the ingredients you have, and PantryPal generates recipe suggestions tailored to your pantry
- **Recipe Generation**: Utilizes local recipe generation with multiple recipe templates including soups, salads, pasta, stir-fries, baked dishes, and curries
- **Save Favorites**: Bookmark your favorite recipes using local storage for persistent favorites
- **Filter & Sort**: Filter recipes by difficulty level (Easy, Medium, Hard) and sort by cooking time or alphabetically
- **Recipe Details Modal**: View comprehensive recipe information including ingredients, step-by-step instructions, cooking time, and difficulty level
- **Copy to Clipboard**: Easily share recipes by copying them to your clipboard
- **Responsive Design**: Beautiful, mobile-friendly interface with Tailwind CSS
- **Dark Mode Ready**: Styled with modern CSS for optimal user experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kamranahmad80/recipe-finder.git
cd recipe-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 Usage

1. **Enter Ingredients**: Type ingredients separated by commas in the input field
2. **Add to List**: Click "Add" or press Enter to add ingredients to your pantry list
3. **Find Recipes**: Click "Find Recipes" to generate recipe suggestions
4. **Browse Recipes**: View recipe cards with title, description, cooking time, and difficulty
5. **View Details**: Click on a recipe card to see full ingredients and step-by-step instructions
6. **Save Favorites**: Click the heart icon to save recipes to your favorites
7. **Manage Saved**: Switch to the "Saved Recipes" tab to view and manage your bookmarked recipes

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Project Structure

```
recipe-finder/
├── src/
│   ├── App.jsx           # Main React component with all functionality
│   ├── App.css           # Application styles
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles
│   └── assets/           # Static assets
├── public/               # Public assets
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── eslint.config.js      # ESLint configuration
└── package.json          # Project dependencies and scripts
```

## 🎨 Tech Stack

- **React 19.1.0** - UI library
- **Vite 6.3.5** - Build tool and development server
- **Tailwind CSS 4.1.6** - Utility-first CSS framework
- **ESLint 9.25.0** - Code quality tool
- **Vercel Analytics** - Usage analytics

## 💾 Local Storage

PantryPal uses browser's local storage to save your favorite recipes. The data is stored under the key `pantryPalSavedRecipes` and persists across browser sessions.

## 🔄 How Recipes Are Generated

The application uses a local recipe generation system with six different recipe templates:
1. **Soup** - Hearty and warming soups
2. **Salad** - Fresh and refreshing salads
3. **Pasta** - Delicious pasta dishes
4. **Stir-Fry** - Quick and flavorful stir-fries
5. **Baked** - Tender baked dishes
6. **Curry** - Rich and aromatic curries

Each template adapts to your input ingredients and can add basic pantry staples as needed. The system randomizes templates and ingredient usage to provide varied recipe suggestions.

## 🌐 Browser Compatibility

PantryPal works on all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- Local Storage API
- Clipboard API

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue to discuss any changes.

## 👤 Author

**Kamran Ahmad**
- GitHub: [@Kamranahmad80](https://github.com/Kamranahmad80)

## 📞 Support

For support, please open an issue on the GitHub repository.

---

**Made with ❤️ by Kamran Ahmad**
