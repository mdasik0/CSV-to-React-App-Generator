import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse CSV
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] ? values[index].trim().replace(/"/g, '') : '';
    });
    data.push(obj);
  }
  
  return data;
}

// Process template syntax [[ option1 | option2 | option3 ]]
function processRandomSelection(text) {
  const regex = /\[\[\s*([^|\]]+)\s*\|([^|\]]+)\s*\|([^\]]+)\s*\]\]/g;
  return text.replace(regex, (match, opt1, opt2, opt3) => {
    const options = [opt1.trim(), opt2.trim(), opt3.trim()];
    return options[Math.floor(Math.random() * options.length)];
  });
}

// Generate React app template
function generateReactApp(data) {
  const deliveryWord = processRandomSelection('[[ Quick | Fast | Speedy ]]');
  
  const appJS = `import React from 'react';

function App() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#60a5fa',
        borderRadius: '8px',
        width: '100%',
        height: '280px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'white',
          margin: '0'
        }}>
          ${data.title}
        </h1>
        <h3 style={{
          color: '#e5e7eb',
          margin: '10px 0'
        }}>
          ${data.description}
        </h3>
        <p style={{
          backgroundColor: 'white',
          padding: '8px 24px',
          borderRadius: '8px',
          marginTop: '24px'
        }}>
          ${deliveryWord} delivery service in dhaka
        </p>
      </div>

      {/* Contact Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginLeft: '24px',
        marginTop: '16px'
      }}>
        <h3 style={{
          fontWeight: 'bold',
          fontSize: '1.125rem'
        }}>
          Contact
        </h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <img
            style={{
              width: '16px',
              height: '16px',
              objectFit: 'cover'
            }}
            src="https://cdn-icons-png.flaticon.com/512/3083/3083741.png"
            alt="website icon"
          />
          <span>${data.domain}</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <img
            style={{
              width: '16px',
              height: '16px',
              objectFit: 'cover'
            }}
            src="https://icons.veryicon.com/png/o/miscellaneous/heg-main-function-icon/phone-98.png"
            alt="phone icon"
          />
          <span>${data.phone}</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <img
            style={{
              width: '16px',
              height: '16px',
              objectFit: 'cover'
            }}
            src="https://cdn-icons-png.flaticon.com/512/503/503080.png"
            alt="address icon"
          />
          <span>${data.address}</span>
        </div>
      </div>
    </div>
  );
}

export default App;`;

  const indexJS = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

  const indexHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${data.title}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

  const packageJSON = {
    name: data.domain.replace(/\./g, '-'),
    version: "0.1.0",
    private: true,
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1"
    },
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
      dev: "react-scripts start"
    },
    eslintConfig: {
      extends: ["react-app"]
    },
    browserslist: {
      production: [">0.2%", "not dead", "not op_mini all"],
      development: ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
    }
  };

  return {
    appJS,
    indexJS,
    indexHTML,
    packageJSON: JSON.stringify(packageJSON, null, 2)
  };
}

function createReactApp(domain, files) {
  const buildDir = path.join(__dirname, 'build');
  const appDir = path.join(buildDir, domain);
  const srcDir = path.join(appDir, 'src');
  const publicDir = path.join(appDir, 'public');

  // Create directories
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir);
  }
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir);
  }
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Write files
  fs.writeFileSync(path.join(srcDir, 'App.js'), files.appJS);
  fs.writeFileSync(path.join(srcDir, 'index.js'), files.indexJS);
  fs.writeFileSync(path.join(publicDir, 'index.html'), files.indexHTML);
  fs.writeFileSync(path.join(appDir, 'package.json'), files.packageJSON);

  console.log(`✓ Generated React app for ${domain}`);
}

// Main function
function main() {
  const csvPath = path.join(__dirname, 'websites.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error('Error: websites.csv not found!');
    return;
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const websites = parseCSV(csvContent);

  console.log(`Found ${websites.length} websites in CSV`);
  console.log('Generating React apps...\n');

  websites.forEach(website => {
    const files = generateReactApp(website);
    createReactApp(website.domain, files);
  });

  console.log('\n✓ All React apps generated successfully!');
  console.log('\nTo run an app:');
  console.log('1. cd build/<domain-name>');
  console.log('2. npm install');
  console.log('3. npm start');
}

// Run the main function
main();

export { parseCSV, generateReactApp, createReactApp };