### 🍕 Forkify - Modern Recipe Application

A beautiful, feature-rich recipe application built with vanilla JavaScript, SCSS, and modern web technologies. Search through thousands of recipes, bookmark your favorites, and even add your own recipes to the collection.

## ✨ Features

### 🔍 Recipe Search

- **Real-time search** through over 1,000,000 recipes
- **Instant results** with smooth loading animations
- **Pagination** for easy navigation through large result sets
- **Responsive design** that works on all devices

### 📖 Recipe Details

- **Comprehensive recipe information** including cooking time, servings, and ingredients
- **Step-by-step instructions** with external links to original sources
- **Beautiful recipe images** with hover effects and animations
- **User-generated recipe indicators** for custom recipes

### 🔖 Bookmark System

- **Persistent bookmarks** saved to localStorage
- **Quick access dropdown** in the header navigation
- **Visual bookmark indicators** in search results
- **One-click bookmark/unbookmark** functionality
- **Bookmark status sync** across all views

### ➕ Add Your Own Recipes

- **Modern modal interface** for adding new recipes
- **Form validation** with required fields
- **Ingredient parsing** with quantity, unit, and description
- **Image URL support** for custom recipe images
- **Publisher attribution** for recipe sources

### 🎨 Modern UI/UX

- **Smooth animations** and transitions throughout
- **Responsive design** optimized for mobile and desktop
- **Modern gradient design** with beautiful color schemes
- **Interactive hover effects** and micro-interactions
- **Loading states** with elegant spinners

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/forkify.git
   cd forkify
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:1234` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🛠️ Technology Stack

### Frontend

- **Vanilla JavaScript** (ES6+) - No frameworks, pure performance
- **SCSS/Sass** - Advanced CSS with variables, mixins, and nesting
- **Parcel** - Zero-configuration bundler
- **HTML5** - Semantic markup

### APIs & Services

- **Forkify API** - Recipe data and search functionality
- **localStorage** - Persistent bookmark storage
- **Fetch API** - Modern HTTP requests

### Development Tools

- **Parcel** - Asset bundling and development server
- **SCSS** - CSS preprocessing
- **ES6 Modules** - Modern JavaScript module system

## 📁 Project Structure

```
forkify/
├── src/
│   ├── img/                 # Images and icons
│   │   ├── controller.js    # Main application controller
│   │   └── model.js         # Data management and API calls
│   ├── sass/                # SCSS stylesheets
│   │   ├── _base.scss       # Base styles and variables
│   │   ├── _components.scss # Reusable components
│   │   ├── _header.scss     # Header and navigation
│   │   ├── _recipe.scss     # Recipe view styles
│   │   ├── _searchResults.scss # Search results styles
│   │   ├── _upload.scss     # Add recipe modal styles
│   │   └── main.scss        # Main stylesheet
│   └── view/                # View components
│       ├── addRecipeView.js # Add recipe modal view
│       ├── bookmarksView.js # Bookmarks dropdown view
│       ├── paginationView.js # Pagination component
│       ├── recipeView.js    # Recipe detail view
│       ├── resultsView.js   # Search results view
│       └── searchView.js    # Search form view
├── index.html               # Main HTML file
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🎯 Core Features Explained

### Search Functionality

The search system uses the Forkify API to fetch recipe data. Results are paginated and displayed with smooth animations. Each recipe shows:

- Recipe image and title
- Publisher information
- User-generated indicators
- Bookmark status

### Bookmark System

Bookmarks are stored locally using localStorage for persistence. Features include:

- **Add/Remove bookmarks** with one click
- **Visual indicators** in search results and recipe views
- **Dropdown menu** for quick access to bookmarked recipes
- **Automatic sync** across all application views

### Add Recipe Feature

Users can add their own recipes through a modern modal interface:

- **Form validation** ensures all required fields are completed
- **Ingredient parsing** supports quantity, unit, and description format
- **Image URL support** for custom recipe images
- **Publisher attribution** for recipe sources

### Responsive Design

The application is fully responsive with:

- **Mobile-first approach** with progressive enhancement
- **Flexible grid layouts** that adapt to screen size
- **Touch-friendly interactions** for mobile devices
- **Optimized typography** for readability across devices

## 🔧 Customization

### Styling

The application uses SCSS with a comprehensive variable system:

- **Color variables** for consistent theming
- **Spacing system** for uniform layouts
- **Typography scale** for readable text
- **Breakpoint variables** for responsive design

### Adding New Features

The modular architecture makes it easy to add new features:

- **View components** handle UI rendering
- **Model layer** manages data and API calls
- **Controller** orchestrates user interactions
- **Event delegation** for dynamic content

## 🐛 Troubleshooting

### Common Issues

**Search not working:**

- Check internet connection
- Verify Forkify API is accessible
- Check browser console for errors

**Bookmarks not saving:**

- Ensure localStorage is enabled
- Check browser privacy settings
- Clear browser cache if needed

**Styles not loading:**

- Run `npm install` to ensure dependencies
- Check Parcel is running correctly
- Verify SCSS compilation

### Development Tips

1. **Use browser dev tools** to inspect elements and debug
2. **Check console logs** for detailed debugging information
3. **Test on different devices** to ensure responsiveness
4. **Clear localStorage** if testing bookmark functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Forkify API** for providing recipe data
- **Parcel** for the excellent bundling experience
- **SCSS** for powerful CSS preprocessing
- **Modern JavaScript** for clean, maintainable code

---

**Built with ❤️ using vanilla JavaScript and modern web technologies**
