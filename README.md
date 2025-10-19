# 🇪🇹 Ethiopian Public Transit Network

An interactive web application showcasing Ethiopia's national intercity public bus network and city transit routes. View detailed maps from FTA (Federal Transport Authority), Anbessa, Sheger, and Taxi services.

![Ethiopian Public Transit Network](https://github.com/rabira-hierpa/et-transit-map/blob/master/route-details/FTA-National-Route-Map.png)

## 🚀 Features

- **Interactive Map Gallery**: Browse all transit maps with smooth animations and transitions
- **Advanced Lightbox**: Click any map to view it in full-screen with zoom and pan capabilities
- **Smart Filtering**: Filter maps by category (National Routes, City Routes, Details)
- **Dark Mode**: Automatic dark mode support with manual toggle
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Fast Loading**: Built with Vite for lightning-fast performance
- **Modern UI**: State-of-the-art design with glassmorphism and smooth animations

## 🗺️ Available Maps

### National Routes

- FTA National Route Map (Amharic)
- FTA National Route Map (English)
- FTA National Route Map (Original)

### City Routes

- Anbessa Route Network (Amharic)
- Sheger Route Network (Amharic)
- Taxi Route Network (Amharic)

### Route Details

- Route Details - Page 1
- Route Details - Page 2

## 🛠️ Technology Stack

- **Framework**: Vite 5
- **Language**: TypeScript
- **Image Viewer**: PhotoSwipe 5
- **Styling**: Modern CSS with CSS Variables
- **Deployment**: Netlify
- **Build Time**: < 10 seconds
- **Bundle Size**: Optimized for fast loading

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

This project is configured for easy deployment on Netlify:

1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Auto Deploy**: Netlify will automatically detect the configuration from `netlify.toml`
3. **Build Settings**: Already configured in `netlify.toml`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder to any static hosting service
```

## 🎨 Design Features

- **Glassmorphism Effects**: Modern frosted glass UI elements
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Color-Coded Operators**: Visual distinction between different transit operators
  - FTA: Blue (#2563eb)
  - Anbessa: Green (#16a34a)
  - Sheger: Orange (#ea580c)
  - Taxi: Yellow (#ca8a04)
- **Gradient Backgrounds**: Beautiful gradient headers and accents
- **Pattern Overlays**: Subtle SVG patterns for visual interest

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Experience

- Touch-optimized interface
- Pinch-to-zoom support
- Responsive grid layout
- Fast image loading with lazy loading
- Optimized for 3G/4G networks

## 🔧 Development

### Project Structure

```
et-transit-map/
├── src/
│   ├── main.ts          # Application logic
│   └── style.css        # Styles
├── route-details/       # Map images
├── index.html           # Entry point
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
└── netlify.toml         # Netlify deployment config
```

### Adding New Maps

1. Add map image to `route-details/` folder
2. Update the `maps` array in `src/main.ts`
3. Specify category: `'national'`, `'city'`, or `'details'`
4. Add operator if applicable

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

See [LICENSE.md](LICENSE.md) for details.

## 🙏 Acknowledgments

- Federal Transport Authority of Ethiopia
- Anbessa City Bus Service
- Sheger City Bus Service
- All transit operators serving Ethiopian communities

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

### [Visit the Live Site](https://bit.ly/fta-national-map)

Built with ❤️ for Ethiopian transit users
