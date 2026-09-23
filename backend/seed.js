import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

dotenv.config();

const TECH_SKILLS = [
  "React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "JavaScript",
  "Next.js", "Tailwind CSS", "Redux Toolkit", "Python", "Django", "FastAPI",
  "Docker", "Kubernetes", "AWS", "Google Cloud", "PostgreSQL", "Redis",
  "GraphQL", "REST APIs", "Git", "CI/CD", "Linux", "Figma", "HTML5/CSS3",
  "React Native", "Flutter", "Golang", "Microservices", "System Design"
];

const JOB_ROLES = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "DevOps Engineer", "Cloud Architect", "UI/UX Designer", "Product Manager",
  "Data Scientist", "Machine Learning Engineer", "Mobile App Developer",
  "QA Automation Engineer", "Cybersecurity Analyst", "Site Reliability Engineer",
  "Software Engineer Intern", "Senior Systems Engineer"
];

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully!");

    // Find recruiter to link the data to
    let recruiter = await User.findOne({ role: "recruiter" });
    if (!recruiter) {
      recruiter = await User.findOne();
      if (!recruiter) {
        throw new Error("No user found in the database. Please register at least one user first.");
      }
    }
    console.log(`Linking companies & jobs to recruiter: ${recruiter.fullname} (${recruiter.email})`);

    // Optional clean flag: node seed.js --clean
    const isCleanMode = process.argv.includes("--clean");
    if (isCleanMode) {
      console.log("Cleaning existing jobs and companies...");
      await Job.deleteMany({});
      await Company.deleteMany({});
      console.log("Cleaned existing collections.");
    }

    // 1. Generate 100 Companies using Faker
    console.log("\nGenerating 100 Companies with Faker...");
    const existingCompanyNames = new Set(
      (await Company.find({}, { name: 1 })).map(c => c.name)
    );

    const companiesToInsert = [];
    while (companiesToInsert.length < 100) {
      const companyName = faker.company.name();

      // Ensure uniqueness for schema validation
      if (!existingCompanyNames.has(companyName)) {
        existingCompanyNames.add(companyName);

        const city = faker.location.city();
        const country = faker.helpers.arrayElement(["India", "United States", "Germany", "United Kingdom", "Canada"]);
        const logoBg = faker.color.rgb({ prefix: "" });

        companiesToInsert.push({
          name: companyName,
          description: `${faker.company.catchPhrase()}. ${faker.company.buzzPhrase()}.`,
          website: faker.internet.url(),
          location: `${city}, ${country}`,
          logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=${logoBg}&color=fff&bold=true&size=128`,
          userId: recruiter._id,
          createdAt: faker.date.past({ years: 1 }),
          updatedAt: new Date()
        });
      }
    }

    const insertedCompanies = await Company.insertMany(companiesToInsert);
    console.log(`Successfully created ${insertedCompanies.length} companies with Faker!`);

    // 2. Generate 100 Jobs using Faker
    console.log("\nGenerating 100 Jobs with Faker...");
    const allCompanies = await Company.find();
    const jobsToInsert = [];

    for (let i = 0; i < 100; i++) {
      const selectedCompany = faker.helpers.arrayElement(allCompanies);
      const roleBase = faker.helpers.arrayElement(JOB_ROLES);
      const levelPrefix = faker.helpers.arrayElement(["Junior", "Mid-Level", "Senior", "Lead", "Staff", ""]);
      const title = levelPrefix ? `${levelPrefix} ${roleBase}` : roleBase;

      const jobType = faker.helpers.arrayElement(["Full-time", "Part-time", "Remote", "Internship"]);
      const salary = faker.number.int({ min: 6, max: 45 }); // in LPA
      const experienceLevel = faker.number.int({ min: 0, max: 7 });
      const position = faker.number.int({ min: 1, max: 5 });
      const requirements = faker.helpers.arrayElements(TECH_SKILLS, { min: 3, max: 6 });
      const createdAt = faker.date.recent({ days: 14 });

      jobsToInsert.push({
        title,
        description: faker.lorem.paragraph({ min: 2, max: 4 }),
        requirements,
        salary,
        experienceLevel,
        location: faker.helpers.arrayElement(["Remote", selectedCompany.location]),
        jobType,
        position,
        company: selectedCompany._id,
        created_by: recruiter._id,
        applications: [],
        createdAt,
        updatedAt: createdAt
      });
    }

    const insertedJobs = await Job.insertMany(jobsToInsert);
    console.log(`Successfully created ${insertedJobs.length} jobs with Faker!`);

    console.log("\n Seeding completed with Faker!");
    console.log(`Total Companies in DB: ${await Company.countDocuments()}`);
    console.log(`Total Jobs in DB: ${await Job.countDocuments()}`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
