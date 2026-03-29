import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { hash } from "bcryptjs";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const adapter = new PrismaLibSQL(client);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const hashedPassword = await hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@aisb.hu" },
    update: {},
    create: {
      email: "admin@aisb.hu",
      password: hashedPassword,
      role: "admin",
    },
  });

  // Create companies from AISB internship contacts
  const intercontinental = await prisma.company.create({
    data: {
      name: "InterContinental Budapest",
      logo: "/logos/intercontinental.svg",
      industry: "Hospitality",
      description:
        "InterContinental Budapest is a luxury 5-star hotel located on the banks of the Danube, offering world-class hospitality experiences. As part of the IHG Hotels & Resorts family, it provides exceptional service and career development opportunities.",
      website: "https://www.budapest.intercontinental.com/",
    },
  });

  const dentons = await prisma.company.create({
    data: {
      name: "Dentons",
      logo: "/logos/dentons.svg",
      industry: "Law",
      description:
        "Dentons is the world's largest law firm, offering a range of legal services across multiple practice areas. Their Budapest office provides opportunities in law, business, economics, and politics.",
      website: "https://www.dentons.com/en/",
    },
  });

  const unleash = await prisma.company.create({
    data: {
      name: "UNLEASH.ai",
      logo: "/logos/unleash.svg",
      industry: "Media & Events",
      description:
        "UNLEASH is a global platform for HR leaders and the future of work. They organize world-class events and produce cutting-edge media content about workplace innovation.",
      website: "https://www.unleash.ai/",
    },
  });

  const theSpace = await prisma.company.create({
    data: {
      name: "The Space",
      logo: "/logos/thespace.svg",
      industry: "Visual Arts",
      description:
        "The Space is a contemporary art and event venue in Budapest, hosting exhibitions, workshops, and cultural events that bring together artists and the community.",
      website: "https://www.thespace.hu/en/",
    },
  });

  const fourSeasons = await prisma.company.create({
    data: {
      name: "Four Seasons Hotel Budapest",
      logo: "/logos/fourseasons.svg",
      industry: "Hospitality",
      description:
        "Four Seasons Hotel Gresham Palace Budapest is an iconic luxury hotel set in a stunning Art Nouveau landmark on the Danube. Known for exceptional guest experiences and career development.",
      website: "https://www.fourseasons.com/budapest/",
    },
  });

  const bbj = await prisma.company.create({
    data: {
      name: "Budapest Business Journal",
      logo: "/logos/bbj.svg",
      industry: "Media & Journalism",
      description:
        "Budapest Business Journal is Hungary's leading English-language business publication, covering economics, politics, and business news for the expat and international community.",
      website: "https://bbj.hu/",
    },
  });

  const vinylCreative = await prisma.company.create({
    data: {
      name: "Vinyl Creative",
      logo: "/logos/vinyl.svg",
      industry: "Creative & Design",
      description:
        "Vinyl Creative is a Budapest-based creative agency specializing in branding, design, and visual communications for both local and international clients.",
      website: "https://www.vinylcreative.hu/",
    },
  });

  const telcotrend = await prisma.company.create({
    data: {
      name: "Telcotrend Kft",
      logo: "/logos/telcotrend.svg",
      industry: "IT & Software",
      description:
        "Telcotrend is a custom software development company offering innovative IT solutions. They specialize in building tailored software systems for businesses across industries.",
      website: "https://telcotrend.hu/en/home/",
    },
  });

  const maternity = await prisma.company.create({
    data: {
      name: "Maternity Private Hospital",
      logo: "/logos/maternity.svg",
      industry: "Healthcare",
      description:
        "Maternity Private Hospital is a leading private healthcare facility in Budapest specializing in obstetrics, gynecology, and women's health with state-of-the-art medical care.",
      website: "https://english.maternity.hu/",
    },
  });

  const techtone = await prisma.company.create({
    data: {
      name: "Techtone Group",
      logo: "/logos/techtone.svg",
      industry: "Management Consulting",
      description:
        "Techtone Group is a management consulting firm providing strategic advisory services to businesses across Central Europe, helping organizations optimize their operations.",
      website: "https://www.techtonegroup.com/",
    },
  });

  const mercedes = await prisma.company.create({
    data: {
      name: "Mercedes-Benz Manufacturing Hungary",
      logo: "/logos/mercedes.svg",
      industry: "Automotive",
      description:
        "Mercedes-Benz Manufacturing Hungary operates one of the company's most advanced production facilities in Kecskemét, producing compact cars for the global market.",
      website: "https://www.mercedes-benz.hu/",
    },
  });

  const ferrari = await prisma.company.create({
    data: {
      name: "Ferrari Budapest",
      logo: "/logos/ferrari.svg",
      industry: "Automotive",
      description:
        "Ferrari Budapest is the official Ferrari dealership in Hungary, offering sales, service, and the iconic Ferrari brand experience to automotive enthusiasts.",
      website: "https://budapest.ferraridealers.com/en-GB",
    },
  });

  const legalis = await prisma.company.create({
    data: {
      name: "Platform Legalis",
      logo: "/logos/legalis.svg",
      industry: "Law & Sustainability",
      description:
        "Platform Legalis is an international legal services platform focused on sustainability and environmental law, providing innovative legal solutions for a greener future.",
      website: "https://legalisglobal.com/",
    },
  });

  const zala = await prisma.company.create({
    data: {
      name: "Zala Springs Golf Resort",
      logo: "/logos/zalasprings.svg",
      industry: "Hospitality",
      description:
        "Zala Springs Golf Resort is a premier golf and leisure destination in Hungary, offering championship golf courses, luxury accommodation, and world-class hospitality.",
      website: "https://zalasprings.hu/hu",
    },
  });

  const ragati = await prisma.company.create({
    data: {
      name: "Ragati River Fly Company",
      logo: "/logos/ragati.svg",
      industry: "Marketing & Retail",
      description:
        "Ragati River Fly Company is a specialty brand focused on fly fishing equipment and outdoor experiences, combining marketing expertise with a passion for the outdoors.",
      website: "https://ragatiriverflycompany.com/",
    },
  });

  const headway = await prisma.company.create({
    data: {
      name: "Headway Marketing",
      logo: "/logos/headway.svg",
      industry: "Marketing & Communications",
      description:
        "Headway Marketing is a communications and marketing agency specializing in strategic brand management, PR, and digital marketing solutions.",
      website: "https://headwaymakers.com/",
    },
  });

  const transformation = await prisma.company.create({
    data: {
      name: "Transformation Services",
      logo: "/logos/transformation.svg",
      industry: "Consulting & Psychology",
      description:
        "Transformation Services provides business transformation consulting with expertise in biomedical sciences, human resources, psychology, journalism, and organizational change management.",
      website: null,
    },
  });

  const shoebox = await prisma.company.create({
    data: {
      name: "Shoebox Kft. (Office Shoes)",
      logo: "/logos/shoebox.svg",
      industry: "Retail & Sales",
      description:
        "Shoebox Kft., operating as Office Shoes, is a leading footwear retail company in Hungary offering trendy shoes and accessories across multiple retail locations.",
      website: "https://shoebox.hu/",
    },
  });

  // Create internships from PDF data
  await prisma.internship.createMany({
    data: [
      {
        title: "Hospitality Management Intern",
        description:
          "Join the InterContinental Budapest team to gain hands-on experience in luxury hotel management. You'll rotate through departments including front desk, guest services, food & beverage, and events management. Learn the operations of a world-class 5-star hotel on the Danube.",
        requirements:
          "Interest in hospitality industry. Good communication skills. Professional demeanor. English fluency required.",
        location: "Budapest",
        duration: "Flexible",
        isPaid: false,
        field: "Hospitality",
        deadline: new Date("2025-06-01"),
        companyId: intercontinental.id,
      },
      {
        title: "Legal Intern - Law & Business",
        description:
          "Work alongside experienced lawyers at Dentons, the world's largest law firm. Gain exposure to international business law, contract drafting, legal research, and client meetings. This internship covers law, business & economics, politics, government, and diplomacy.",
        requirements:
          "Interest in law, politics, or business. Strong analytical and writing skills. English fluency required.",
        location: "Budapest",
        duration: "Flexible",
        isPaid: false,
        field: "Law",
        deadline: new Date("2025-05-15"),
        companyId: dentons.id,
      },
      {
        title: "Entrepreneurship & Business Development Intern",
        description:
          "Explore the world of entrepreneurship at Dentons Law Firm. Work with the Co-Chair on startup legal frameworks, business development strategies, and innovation projects. Perfect for students interested in launching their own ventures.",
        requirements:
          "Entrepreneurial mindset. Interest in business development. Strong communication skills. English fluency.",
        location: "Budapest",
        duration: "Flexible",
        isPaid: false,
        field: "Entrepreneurship",
        deadline: new Date("2025-05-15"),
        companyId: dentons.id,
      },
      {
        title: "Media & Events Intern",
        description:
          "Join UNLEASH.ai, a leading global HR and future of work platform. Help organize world-class events, create media content, and learn about the intersection of technology and human resources. Full 40-hour immersive experience during April break (April 15th-19th).",
        requirements:
          "Interest in media, events, or HR technology. Creative mindset. English fluency required. Available for April 15-19 block.",
        location: "Budapest",
        duration: "1 Week (April Break)",
        isPaid: false,
        field: "Media & Events",
        deadline: new Date("2025-04-01"),
        companyId: unleash.id,
      },
      {
        title: "Visual Arts & Events Intern",
        description:
          "Work with The Space, a contemporary art and event venue in Budapest. Assist with exhibition planning, event organization, artist communications, and gallery management. A unique opportunity to immerse yourself in Budapest's vibrant art scene.",
        requirements:
          "Interest in visual arts, event management, or cultural programming. English required; Hungarian is a plus.",
        location: "Budapest",
        duration: "Flexible",
        isPaid: false,
        field: "Visual Arts",
        deadline: new Date("2025-06-01"),
        companyId: theSpace.id,
      },
      {
        title: "Luxury Hospitality Intern",
        description:
          "Experience hospitality at its finest with Four Seasons Hotel Gresham Palace Budapest. Shadow the hotel manager and learn about luxury guest services, event coordination, fine dining operations, and the art of world-class hospitality in an iconic Art Nouveau landmark.",
        requirements:
          "Passion for hospitality. Professional appearance and attitude. Excellent interpersonal skills. English fluency required.",
        location: "Budapest",
        duration: "Flexible",
        isPaid: false,
        field: "Hospitality",
        deadline: new Date("2025-06-01"),
        companyId: fourSeasons.id,
      },
      {
        title: "Journalism & Editorial Intern",
        description:
          "Write for Budapest Business Journal, Hungary's leading English-language business publication. Research stories, conduct interviews, write articles, and learn the fundamentals of business journalism. Your work may be published in print and online.",
        requirements:
          "Strong writing skills in English. Interest in business, economics, or current affairs. Ability to meet deadlines.",
        location: "Budapest",
        duration: "Flexible",
        isPaid: false,
        field: "Writing & Journalism",
        deadline: new Date("2025-05-30"),
        companyId: bbj.id,
      },
      {
        title: "Creative Design Intern",
        description:
          "Join Vinyl Creative and work on real branding and design projects. Assist with visual identity development, graphic design, social media content creation, and creative campaigns for diverse clients. Learn from experienced creative directors.",
        requirements:
          "Interest in design, branding, or visual arts. Basic knowledge of design software (Adobe Creative Suite or similar) is a plus. English fluency required.",
        location: "Budapest",
        duration: "Flexible",
        isPaid: false,
        field: "Creative & Design",
        deadline: new Date("2025-06-01"),
        companyId: vinylCreative.id,
      },
      {
        title: "IT & Software Development Intern",
        description:
          "Gain hands-on experience in custom software development at Telcotrend. Work with the development team on real projects, learn about software engineering practices, and contribute to building innovative IT solutions for business clients.",
        requirements:
          "Interest in IT and software development. Basic programming knowledge preferred. English fluency required. Available for full 40-hour blocks during school breaks.",
        location: "Budapest",
        duration: "School Breaks (40 hours)",
        isPaid: false,
        field: "IT & Technology",
        deadline: new Date("2025-05-15"),
        companyId: telcotrend.id,
      },
      {
        title: "Medical Shadowing Intern",
        description:
          "Shadow medical professionals at Maternity Private Hospital. Observe clinical procedures, learn about healthcare management, and gain insight into obstetrics and women's health. Ideal for students considering careers in medicine or healthcare.",
        requirements:
          "Interest in medicine or healthcare. Mature and professional attitude. English fluency required. Available for full 40-hour blocks during school breaks. Ages 16+ preferred.",
        location: "Budapest",
        duration: "School Breaks (40 hours)",
        isPaid: false,
        field: "Medicine & Healthcare",
        deadline: new Date("2025-05-15"),
        companyId: maternity.id,
      },
      {
        title: "Management Consulting Intern",
        description:
          "Experience management consulting at Techtone Group. Assist with strategic advisory projects, market research, data analysis, and client presentations. Learn how consulting firms help organizations optimize their operations across Central Europe.",
        requirements:
          "Interest in business and consulting. Analytical mindset. Hungarian and English language skills. Available for after-school hours or school break blocks.",
        location: "Budapest",
        duration: "Flexible (after school or breaks)",
        isPaid: false,
        field: "Business & Consulting",
        deadline: new Date("2025-06-01"),
        companyId: techtone.id,
      },
      {
        title: "Automotive Engineering Intern",
        description:
          "Visit and intern at Mercedes-Benz's advanced manufacturing facility in Kecskemét. Learn about automotive production, quality control, engineering processes, and the latest in car manufacturing technology at one of the world's most prestigious car brands.",
        requirements:
          "Interest in automotive engineering or manufacturing. English and/or German language skills. Available for full 40-hour blocks during school breaks. Transportation to Kecskemét required.",
        location: "Kecskemét",
        duration: "School Breaks (40 hours)",
        isPaid: false,
        field: "Automotive & Engineering",
        deadline: new Date("2025-05-01"),
        companyId: mercedes.id,
      },
      {
        title: "Luxury Automotive Sales & Marketing Intern",
        description:
          "Experience the world of luxury automotive at Ferrari Budapest. Learn about high-end sales processes, brand management, customer relations, and event planning at Hungary's official Ferrari dealership.",
        requirements:
          "Interest in automotive or luxury brands. Professional demeanor. Hungarian and English language skills. Available for full 40-hour blocks during school breaks.",
        location: "Budapest",
        duration: "School Breaks (40 hours)",
        isPaid: false,
        field: "Automotive & Sales",
        deadline: new Date("2025-05-01"),
        companyId: ferrari.id,
      },
      {
        title: "Sustainability & Legal Intern",
        description:
          "Work with Platform Legalis on international sustainability and environmental law projects. Research legal frameworks, assist with policy analysis, and contribute to making business practices more sustainable.",
        requirements:
          "Interest in sustainability, environmental issues, or law. Strong research and writing skills. English fluency required.",
        location: "Remote",
        duration: "Flexible",
        isPaid: false,
        field: "Law & Sustainability",
        deadline: new Date("2025-06-01"),
        companyId: legalis.id,
      },
      {
        title: "Golf Resort Hospitality Intern",
        description:
          "Join the team at Zala Springs Golf Resort and learn about resort management, event coordination, guest services, and the unique world of golf hospitality in a beautiful lakeside setting.",
        requirements:
          "Interest in hospitality or sports management. English required; Hungarian is a plus. Professional attitude.",
        location: "Zala County",
        duration: "Flexible",
        isPaid: false,
        field: "Hospitality",
        deadline: new Date("2025-06-01"),
        companyId: zala.id,
      },
      {
        title: "Marketing & E-Commerce Intern",
        description:
          "Help Ragati River Fly Company with digital marketing, e-commerce operations, and brand development. Create content for social media, assist with online store management, and learn about marketing in a niche outdoor industry.",
        requirements:
          "Interest in marketing or e-commerce. Creative mindset. English fluency required. Available for after-school hours or school break blocks.",
        location: "Budapest / Remote",
        duration: "Flexible (after school or breaks)",
        isPaid: false,
        field: "Marketing",
        deadline: new Date("2025-06-01"),
        companyId: ragati.id,
      },
      {
        title: "Veterinary Science & Marketing Intern",
        description:
          "Unique opportunity at Headway Marketing combining veterinary science insights with marketing communications. Learn about marketing in the animal health sector, assist with campaigns, and gain exposure to both science and business.",
        requirements:
          "Interest in veterinary science or marketing. English required; Hungarian is a plus.",
        location: "Budapest",
        duration: "Flexible",
        isPaid: false,
        field: "Veterinary Science & Marketing",
        deadline: new Date("2025-06-01"),
        companyId: headway.id,
      },
      {
        title: "Business Transformation & Psychology Intern",
        description:
          "Join Transformation Services for a multidisciplinary internship covering biomedical sciences, human resources, journalism, psychology, sociology, and change management. Work with a Vice President who is a psychologist by trade.",
        requirements:
          "Interest in psychology, HR, journalism, or organizational change. Open to students from various academic backgrounds. Strong interpersonal skills.",
        location: "Budapest",
        duration: "Flexible",
        isPaid: false,
        field: "Psychology & Business",
        deadline: new Date("2025-06-01"),
        companyId: transformation.id,
      },
      {
        title: "Retail Sales & Marketing Intern",
        description:
          "Gain hands-on retail experience at Office Shoes (Shoebox Kft.). Learn about retail operations, visual merchandising, sales techniques, and marketing in the fashion footwear industry.",
        requirements:
          "Interest in retail, sales, or fashion. Hungarian and English language skills. Available for after-school evening hours or April break (April 15-19).",
        location: "Budapest",
        duration: "After school (3hrs/week) or April Break",
        isPaid: false,
        field: "Retail & Sales",
        deadline: new Date("2025-04-01"),
        companyId: shoebox.id,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
