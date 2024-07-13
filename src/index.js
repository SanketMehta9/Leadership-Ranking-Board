const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// In-memory data
let departments = [
  { id: 1, name: 'Department A', ranking: 3 },
  { id: 2, name: 'Department B', ranking: 1 },
  { id: 3, name: 'Department C', ranking: 2 },
  { id: 4, name: 'Department D', ranking: 5 },
  { id: 5, name: 'Department E', ranking: 4 },
];

let lastWeekWinner = departments[0]; // Assuming Department A was last week's winner

// Endpoint to get popular departments
app.get('/popular-departments', (req, res) => {
  // Sorting departments based on ranking (ascending)
  departments.sort((a, b) => a.ranking - b.ranking);

  // Top 5 departments
  const top5Departments = departments.slice(0, 5);

  res.json({
    lastWeekWinner,
    top5Departments,
  });
});

let books = [
    { id: 1, title: 'Book 1' , downloads: 100, lastUpdated: new Date() },
    { id: 2, title: 'Book 2', downloads: 80, lastUpdated: new Date() },
    { id: 3, title: 'Book 3', downloads: 120, lastUpdated: new Date() },
  ];
  
  // Endpoint to get weekly popular books
  app.get('/weekly-popular-books', (req, res) => {
    const weeklyPopularBooks = books.filter(book => {
      return book.lastUpdated >= new Date(new Date().setDate(new Date().getDate() - 7));
    });
  
    res.json(weeklyPopularBooks);
  });
  
  // Endpoint to get monthly popular books
  app.get('/monthly-popular-books', (req, res) => {
    const monthlyPopularBooks = books.filter(book => {
      return book.lastUpdated >= new Date(new Date().setMonth(new Date().getMonth() - 1));
    });
  
    res.json(monthlyPopularBooks);
  });
  
  // Endpoint to get today's trending books
  app.get('/todays-trending-books', (req, res) => {
    const todaysTrendingBooks = books.filter(book => {
      return book.lastUpdated >= new Date(new Date().setHours(new Date().getHours() - 1));
    });
  
    res.json(todaysTrendingBooks);
  });
  
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
