const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Category = require('./models/category');
const ProjectDescription = require('./models/projectDescription');
const { generateProjectIdea } = require('./utils/openai');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/hackstack');
}

app.get('/', (req, res) => {
  res.send('Hello World! This is a test for HACKSTACK project.');
});

// index route
app.get('/hackstack', (req, res) => {
  res.render('home.ejs');
});

// category route
app.get('/hackstack/category', async (req, res) => {
  const categories = await Category.find({});
  res.render('category.ejs', { categories });
});

// category ideas route
app.get('/category/:id', async (req, res) => {
  const categories = await Category.findById(req.params.id);
  res.render('projects.ejs', { categories });
});

//projects detail route
app.get('/category/:categoryId/projects/:projectId', async (req, res) => {
  try {
    const categories = await Category.findById(req.params.categoryId);
    const projects = await ProjectDescription.findById(req.params.projectId);

    if (!categories || !projects) {
      return res.status(404).send('Category or Project not found');
    }

    res.render('detail.ejs', { categories, projects });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// search route
app.get('/search', async (req, res) => {
  const query = req.query.q;

  try {

    const category = await Category.findOne({
      title: { $regex: query, $options: 'i' }
    });

    if (category) {

      return res.redirect(`/category/${category._id}`);
    }


    const project = await ProjectDescription.findOne({
      title: { $regex: query, $options: 'i' }
    });

    if (project) {
      const cat = await Category.findOne({
        'projects.projectId': project._id
      });

      if (cat) {
        return res.redirect(`/category/${cat._id}/projects/${project._id}`);
      }
    }

    res.status(404).send('No matching category or project found');
  } catch (err) {
    console.error(err);
    res.status(500).send('Search error');
  }
});

//about route
app.get('/hackstack/about', (req, res) => {
  res.render('about');
});

//feature route
app.get('/hackstack/features', (req, res) => {
  res.render('features.ejs');
});

app.listen(8080, () => {
  console.log('Server is running on port 3000');
});
