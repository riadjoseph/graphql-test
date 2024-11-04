const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Placeholder data for 30 products
const products = [
  { name: 'cookware_set', color: '#8e44ad' },
  { name: 'frying_pan', color: '#3498db' },
  { name: 'baking_dish', color: '#2ecc71' },
  { name: 'skillet', color: '#e74c3c' },
  { name: 'stock_pot', color: '#34495e' },
  { name: 'measuring_cup', color: '#1abc9c' },
  { name: 'spoon_set', color: '#f39c12' },
  { name: 'knife_set', color: '#9b59b6' },
  { name: 'whisk', color: '#27ae60' },
  { name: 'spatula', color: '#e67e22' },
  { name: 'oven_mitts', color: '#c0392b' },
  { name: 'kitchen_scale', color: '#2980b9' },
  { name: 'muffin_pan', color: '#16a085' },
  { name: 'grill_pan', color: '#8e44ad' },
  { name: 'baking_mat', color: '#34495e' },
  { name: 'mixing_bowl', color: '#d35400' },
  { name: 'cutting_board', color: '#2980b9' },
  { name: 'cookie_sheet', color: '#2c3e50' },
  { name: 'strainer', color: '#f1c40f' },
  { name: 'storage_jar', color: '#2ecc71' },
  { name: 'colander', color: '#e74c3c' },
  { name: 'kitchen_rug', color: '#9b59b6' },
  { name: 'salad_spinner', color: '#3498db' },
  { name: 'drying_rack', color: '#f39c12' },
  { name: 'spice_rack', color: '#27ae60' },
  { name: 'teapot', color: '#8e44ad' },
  { name: 'rolling_pin', color: '#c0392b' },
  { name: 'garlic_press', color: '#e67e22' },
  { name: 'steel_tongs', color: '#1abc9c' },
  { name: 'measuring_spoons', color: '#2980b9' }
];

// Directory to save the images
const imagesDir = path.resolve(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to create a placeholder image
function createPlaceholderImage(product, width = 150, height = 150) {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Set background color
  context.fillStyle = product.color;
  context.fillRect(0, 0, width, height);

  // Set text properties
  context.fillStyle = '#FFFFFF';
  context.font = 'bold 20px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  // Draw text (Product Name)
  context.fillText(product.name.replace(/_/g, ' '), width / 2, height / 2);

  // Save the image to file
  const buffer = canvas.toBuffer('image/png');
  const imagePath = path.join(imagesDir, `${product.name}.png`);
  fs.writeFileSync(imagePath, buffer);
  console.log(`Created placeholder image: ${imagePath}`);
}

// Create placeholder images for all products
products.forEach(product => createPlaceholderImage(product));
