const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public folder on port 8080
app.use(express.static(path.join(__dirname, 'public')));

// Sample GraphQL Schema
const schema = buildSchema(`
  type Product {
    id: ID
    name: String
    price: Float
    imageUrl: String
  }

  type Query {
    product(id: ID!): Product
    relatedProducts: [Product]
  }
`);

// Fake data for products
const products = [
  { id: '1', name: 'Lockton 10-Piece Cookware Set', price: 199.99, imageUrl: '/public/images/cookware_set.png' },
  { id: '2', name: 'Nonstick Frying Pan', price: 29.99, imageUrl: '/public/images/frying_pan.png' },
  { id: '3', name: 'Ceramic Baking Dish', price: 39.99, imageUrl: '/public/images/baking_dish.png' },
  { id: '4', name: 'Cast Iron Skillet', price: 49.99, imageUrl: '/public/images/skillet.png' },
  { id: '5', name: 'Stainless Steel Stock Pot', price: 59.99, imageUrl: '/public/images/stock_pot.png' },
  { id: '6', name: 'Glass Measuring Cup', price: 14.99, imageUrl: '/public/images/measuring_cup.png' },
  { id: '7', name: 'Wooden Cooking Spoon Set', price: 9.99, imageUrl: '/public/images/spoon_set.png' },
  { id: '8', name: 'Kitchen Knife Block Set', price: 89.99, imageUrl: '/public/images/knife_set.png' },
  { id: '9', name: 'Stainless Steel Whisk', price: 12.99, imageUrl: '/public/images/whisk.png' },
  { id: '10', name: 'Silicone Spatula', price: 7.99, imageUrl: '/public/images/spatula.png' },
  { id: '11', name: 'Oven Mitts (Pair)', price: 11.99, imageUrl: '/public/images/oven_mitts.png' },
  { id: '12', name: 'Digital Kitchen Scale', price: 24.99, imageUrl: '/public/images/kitchen_scale.png' },
  { id: '13', name: 'Nonstick Muffin Pan', price: 19.99, imageUrl: '/public/images/muffin_pan.png' },
  { id: '14', name: 'Grill Pan', price: 34.99, imageUrl: '/public/images/grill_pan.png' },
  { id: '15', name: 'Reusable Silicone Baking Mat', price: 13.99, imageUrl: '/public/images/baking_mat.png' },
  { id: '16', name: 'Ceramic Mixing Bowl Set', price: 44.99, imageUrl: '/public/images/mixing_bowl.png' },
  { id: '17', name: 'Plastic Cutting Board Set', price: 19.99, imageUrl: '/public/images/cutting_board.png' },
  { id: '18', name: 'Aluminum Cookie Sheet', price: 17.99, imageUrl: '/public/images/cookie_sheet.png' },
  { id: '19', name: 'Stainless Steel Strainer', price: 15.99, imageUrl: '/public/images/strainer.png' },
  { id: '20', name: 'Glass Storage Jar Set', price: 25.99, imageUrl: '/public/images/storage_jar.png' },
  { id: '21', name: 'Enamel Colander', price: 18.99, imageUrl: '/public/images/colander.png' },
  { id: '22', name: 'Non-Slip Kitchen Rug', price: 29.99, imageUrl: '/public/images/kitchen_rug.png' },
  { id: '23', name: 'Salad Spinner', price: 22.99, imageUrl: '/public/images/salad_spinner.png' },
  { id: '24', name: 'Dish Drying Rack', price: 31.99, imageUrl: '/public/images/drying_rack.png' },
  { id: '25', name: 'Spice Rack Organizer', price: 27.99, imageUrl: '/public/images/spice_rack.png' },
  { id: '26', name: 'Ceramic Teapot', price: 32.99, imageUrl: '/public/images/teapot.png' },
  { id: '27', name: 'Rolling Pin', price: 10.99, imageUrl: '/public/images/rolling_pin.png' },
  { id: '28', name: 'Garlic Press', price: 9.99, imageUrl: '/public/images/garlic_press.png' },
  { id: '29', name: 'Stainless Steel Tongs', price: 13.99, imageUrl: '/public/images/steel_tongs.png' },
  { id: '30', name: 'Stainless Steel Measuring Spoons', price: 7.99, imageUrl: '/public/images/measuring_spoons.png' },
];

// Root resolver to handle GraphQL queries
const root = {
  product: ({ id }) => products.find(product => product.id === id),
  relatedProducts: () => products.slice(0, 30), // Send up to 30 related products as example
};

// Use GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Start the GraphQL server on port 4000
app.listen(4000, () => {
  console.log('GraphQL server is running on http://localhost:4000/graphql');
});

// Start the static server on port 8080 for serving HTML files
app.listen(8080, () => {
  console.log('Static server is running on http://localhost:8080');
});
