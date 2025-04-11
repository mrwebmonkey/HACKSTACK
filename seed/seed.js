// seed/seed.js

const mongoose = require('mongoose');
const slugify = require('slugify');
const Category = require('../models/category');
const ProjectDescription = require('../models/projectDescription');
const seedData = require('./data');

mongoose.connect('mongodb://localhost:27017/hackstack', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Connection error', err);
});

const insertSeedData = async (dataArray) => {
  try {
    await Category.deleteMany({});
    await ProjectDescription.deleteMany({});
    console.log('🧹 Cleared old data');

    for (const item of dataArray) {
      const { category: categoryData, projects } = item;

      const category = new Category({
        ...categoryData,
        slug: slugify(categoryData.title, { lower: true })
      });

      for (const project of projects) {
        const projectDoc = await ProjectDescription.create({
          tools: project.tools,
          difficulty: project.difficulty,
          estimate_time: project.estimate_time,
          file_structure: project.file_structure,
          scope: project.scope,
          code: project.code,
          count: project.count || 0 // Default to 0 if not provided
        });

        await category.addProject({
          _id: projectDoc._id,
          title: project.title,
          description: project.description,
        });
      }

      await category.save();
      console.log(`✅ Inserted category: ${category.title}`);
    }

    console.log('🚀 All seed data inserted!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    mongoose.connection.close();
  }
};

// Run seeding
insertSeedData(seedData);
