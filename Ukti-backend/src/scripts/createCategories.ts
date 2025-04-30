import { Context } from "hono";
import { createPrismaClient } from "../db/client";

export const createCategories = async (c: Context) => {
  const prisma = createPrismaClient(c.env);

  const categories = [
    {
      name: "Technology",
      description:
        "Latest trends, software development, gadgets, and innovation.",
      tags: [
        "Tech",
        "Innovation",
        "Software Development",
        "Gadgets",
        "AI",
        "Machine Learning",
        "Blockchain",
        "Cloud Computing",
        "Startups",
        "Cybersecurity",
      ],
    },
    {
      name: "Programming",
      description:
        "Tutorials, tips, and news related to coding and development.",
      tags: [
        "Coding",
        "Programming Languages",
        "JavaScript",
        "Python",
        "Web Development",
        "Backend Development",
        "Frontend Development",
        "Frameworks",
        "Algorithms",
        "Open Source",
      ],
    },
    {
      name: "Business",
      description:
        "Insights on startups, marketing, finance, and entrepreneurship.",
      tags: [
        "Startups",
        "Entrepreneurship",
        "Marketing",
        "Leadership",
        "Strategy",
        "Small Business",
        "Venture Capital",
        "Business Growth",
        "Finance",
        "Networking",
      ],
    },
    {
      name: "Lifestyle",
      description:
        "Well-being, productivity, fashion, and everyday life hacks.",
      tags: [
        "Lifestyle",
        "Well-being",
        "Productivity",
        "Self-care",
        "Fashion",
        "Home Decor",
        "Minimalism",
        "Time Management",
        "Life Hacks",
        "Motivation",
      ],
    },
    {
      name: "Health",
      description:
        "Fitness, mental health, nutrition, and wellness guides.",
      tags: [
        "Health",
        "Fitness",
        "Nutrition",
        "Mental Health",
        "Wellness",
        "Diet",
        "Exercise",
        "Mindfulness",
        "Yoga",
        "Self-care",
      ],
    },
    {
      name: "Travel",
      description: "Travel guides, tips, stories, and destination reviews.",
      tags: [
        "Travel",
        "Adventure",
        "Destinations",
        "Tourism",
        "Backpacking",
        "Road Trips",
        "Travel Tips",
        "Hotels",
        "Luxury Travel",
        "Cultural Experiences",
      ],
    },
    {
      name: "Education",
      description:
        "Learning resources, online courses, and academic content.",
      tags: [
        "Education",
        "Learning",
        "Online Courses",
        "Studying",
        "Academic Resources",
        "Self-study",
        "Education Technology",
        "Distance Learning",
        "Skills Development",
        "Student Life",
      ],
    },
    {
      name: "Spirituality",
      description:
        "Mindfulness, meditation, and personal growth articles.",
      tags: [
        "Spirituality",
        "Mindfulness",
        "Meditation",
        "Personal Growth",
        "Self-awareness",
        "Inner Peace",
        "Yoga",
        "Self-improvement",
        "Gratitude",
        "Consciousness",
      ],
    },
    {
      name: "Science",
      description:
        "Discoveries, space, environment, and scientific research.",
      tags: [
        "Science",
        "Physics",
        "Space",
        "Environment",
        "Research",
        "Biology",
        "Chemistry",
        "Astronomy",
        "Technology",
        "Discoveries",
      ],
    },
    {
      name: "Finance",
      description:
        "Personal finance, investing, budgeting, and crypto trends.",
      tags: [
        "Finance",
        "Investing",
        "Personal Finance",
        "Cryptocurrency",
        "Stock Market",
        "Budgeting",
        "Economy",
        "Financial Freedom",
        "Wealth Building",
        "Investment Strategies",
      ],
    },
    {
      name: "Entertainment",
      description:
        "Movies, shows, books, celebrities, and pop culture.",
      tags: [
        "Entertainment",
        "Movies",
        "TV Shows",
        "Books",
        "Celebrities",
        "Pop Culture",
        "Music",
        "Video Games",
        "Streaming",
        "Media",
      ],
    },
    {
      name: "Art & Design",
      description:
        "Creativity, UI/UX, graphic design, and photography.",
      tags: [
        "Art",
        "Design",
        "UI/UX",
        "Graphic Design",
        "Photography",
        "Illustration",
        "Creative Process",
        "Web Design",
        "Visual Arts",
        "Animation",
      ],
    },
    {
      name: "Career",
      description:
        "Job tips, interviews, resume building, and freelancing.",
      tags: [
        "Career",
        "Job Search",
        "Interviews",
        "Resume Building",
        "Freelancing",
        "Professional Growth",
        "Job Tips",
        "Workplace",
        "Networking",
        "Career Development",
      ],
    },
    {
      name: "Food",
      description: "Recipes, food reviews, cooking hacks, and nutrition.",
      tags: [
        "Food",
        "Recipes",
        "Cooking",
        "Nutrition",
        "Healthy Eating",
        "Food Reviews",
        "Baking",
        "Restaurant Recommendations",
        "Food Hacks",
        "Meal Planning",
      ],
    },
    {
      name: "News & Politics",
      description:
        "Latest happenings, political opinions, and world affairs.",
      tags: [
        "News",
        "Politics",
        "World Affairs",
        "Current Events",
        "Political Analysis",
        "Opinions",
        "Global Affairs",
        "Election News",
        "Government",
        "Political Parties",
      ],
    },
    {
      name: "Parenting",
      description:
        "Guides and experiences on raising children and family life.",
      tags: [
        "Parenting",
        "Children",
        "Family",
        "Parenting Tips",
        "Raising Kids",
        "Childcare",
        "Parenting Hacks",
        "Family Life",
        "Mothers",
        "Fathers",
      ],
    },
    {
      name: "Gaming",
      description:
        "Game reviews, esports, guides, and gaming news.",
      tags: [
        "Gaming",
        "Esports",
        "Game Reviews",
        "Gaming News",
        "PC Gaming",
        "Console Gaming",
        "Mobile Gaming",
        "Game Strategies",
        "Online Games",
        "Game Streaming",
      ],
    },
    {
      name: "Self Improvement",
      description:
        "Productivity, habits, motivation, and growth tips.",
      tags: [
        "Self Improvement",
        "Productivity",
        "Motivation",
        "Habits",
        "Personal Growth",
        "Time Management",
        "Success",
        "Mindset",
        "Self-discipline",
        "Goals",
      ],
    },
    {
      name: "Environment",
      description:
        "Sustainability, nature conservation, and climate awareness.",
      tags: [
        "Environment",
        "Sustainability",
        "Climate Change",
        "Conservation",
        "Green Energy",
        "Eco-friendly",
        "Recycling",
        "Nature",
        "Global Warming",
        "Biodiversity",
      ],
    },
  ];

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  return c.json({
    message: "Categories created successfully.",
  });
};
