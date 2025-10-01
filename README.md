# Website Generator from CSV

A Node.js script that automatically generates individual React applications from CSV data. Each row in the CSV becomes a separate, fully functional React app with customized content.

## 📋 Features

- ✅ Generates multiple React apps from a single CSV file
- ✅ Each app is independent and can run standalone
- ✅ Supports random text selection syntax: `[[ option1 | option2 | option3 ]]`
- ✅ Replaces placeholders with actual data from CSV
- ✅ Uses inline CSS (no Tailwind dependency in generated apps)
- ✅ Simple hero section and contact section layout

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd my-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate the React apps:**
   ```bash
   npm run generate
   ```
   This creates the `build/` folder with individual React apps from the CSV data.

## 📝 CSV Format

Your `website.csv` should have the following format:

```csv
domain,title,description,phone,address
foodexpress.com,Food Express,Delicious meals delivered fast,01712345678,"House 12, Road 5, Banani, Dhaka"
techhubbd.com,Tech Hub BD,Your trusted tech partner,01898765432,"Level 4, Block B, Dhanmondi, Dhaka"
bookbazaar.com,Book Bazaar,Buy and sell books online,01911223344,"Shop 22, New Market, Chittagong"
```

**Required columns:**
- `domain` - Website domain name (used as folder name)
- `title` - Website title
- `description` - Website description/motto
- `phone` - Contact phone number
- `address` - Contact address

## 🎯 Usage

### Step 1: Generate React Apps

Run the generator script to create individual React apps from your CSV:

```bash
npm run generate
```

This will create a `build/` folder with separate React apps:

```
build/
├── foodexpress.com/
├── techhubbd.com/
└── bookbazaar.com/
```

### Step 2: Run a Generated App

Navigate to any generated app and run it:

```bash
# Navigate to the generated app
cd build/foodexpress.com

# Install dependencies (first time only)
npm install

# Start the app
npm start
```

The app will open in your browser at `http://localhost:3000`

### Step 3: Run Other Apps

To run another app:

```bash
# From the main project root
cd build/techhubbd.com
npm install
npm start
```

**Note:** Each app runs on port 3000 by default. Stop the current app (Ctrl+C) before running another, or they'll use different ports automatically.

## 📂 Project Structure

```
my-app/
├── src/                    # Main Vite React app source
├── public/                 # Public assets
├── generate.js             # Generator script
├── website.csv             # CSV data file
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
└── build/                  # Generated React apps (created by script)
    ├── foodexpress.com/
    │   ├── src/
    │   │   ├── App.js
    │   │   └── index.js
    │   ├── public/
    │   │   └── index.html
    │   └── package.json
    ├── techhubbd.com/
    └── bookbazaar.com/
```

## 🎨 Generated App Features

Each generated app includes:

### Hero Section
- Displays the website title
- Shows the description/motto
- Random delivery speed word (Quick/Fast/Speedy) selected at generation time

### Contact Section
- Website domain with icon
- Phone number with icon
- Address with icon

## 🔧 Customization

### Adding More Websites

1. Edit `website.csv` and add new rows
2. Run `npm run generate` again
3. New apps will appear in the `build/` folder

### Modifying Template

Edit the `generateReactApp()` function in `generate.js` to customize:
- Layout and styling
- Color scheme (change `backgroundColor: '#60a5fa'`)
- Font styles
- Additional sections

### Random Text Selection

Use the syntax `[[ option1 | option2 | option3 ]]` anywhere in your template. The generator will randomly select one option when creating each app.

Example:
```javascript
[[ Quick | Fast | Speedy ]] delivery service
```

Randomly becomes one of:
- "Quick delivery service"
- "Fast delivery service"  
- "Speedy delivery service"

## 🛠️ Available Scripts

In the main project directory:

- `npm run dev` - Run the main Vite development server
- `npm run build` - Build the main Vite app
- `npm run generate` - Generate React apps from CSV
- `npm run preview` - Preview the built Vite app
- `npm run lint` - Run ESLint

In each generated app directory:

- `npm start` - Start the React app in development mode
- `npm run build` - Build the React app for production

## ❓ Troubleshooting

### "website.csv not found" error
- Ensure `website.csv` exists in the project root
- Check the file name (it should be `website.csv`, not `websites.csv`)

### Generated app won't start
- Make sure you ran `npm install` in the app folder first
- Check that Node.js and npm are installed correctly

### Port already in use
- Stop other running apps with Ctrl+C
- Or the app will automatically use the next available port (3001, 3002, etc.)

## 📄 License

ISC

## 🤝 Contributing

Feel free to submit issues and pull requests!

## 📧 Support

If you encounter any problems, please open an issue on GitHub.
