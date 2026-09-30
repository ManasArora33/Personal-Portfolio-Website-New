export type Project = {
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  liveUrl: string;
  repositoryUrl: string;
  technologies: readonly string[];
  featured: boolean;
  index: string;
};

export const profile = {
  name: "Manas Arora",
  role: "Product & AI Software Engineer",
  location: "India",
  email: "manasarora33179@gmail.com",
  github: "https://github.com/ManasArora33",
  linkedin: "https://www.linkedin.com/in/manas-arora-a5b499278/",
  resume: "/resume/resume.pdf",
  graduationYear: "2027",
} as const;

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const capabilityGroups = [
  {
    label: "01 / Product",
    title: "Product engineering",
    description:
      "Building scalable web applications across responsive interfaces, backend services, and data systems.",
  },
  {
    label: "02 / Backend",
    title: "Systems thinking",
    description:
      "Understanding not only how systems work, but why their architecture and tradeoffs matter.",
  },
  {
    label: "03 / Intelligence",
    title: "Applied AI",
    description:
      "Creating practical Generative AI and RAG experiences grounded in useful product workflows.",
  },
] as const;

export const experience = [
  {
    period: "June 2026 — Present",
    role: "Software Development Engineer (SDE) Intern",
    company: "CG Infinity",
    description:
      "Contributing as a software engineering intern while developing deeper experience in scalable applications, backend systems, and product-focused engineering.",
  },
] as const;

export const education = [
  {
    period: "Current",
    institution: "Maharaja Surajmal Institute of Technology",
    qualification: "Bachelor of Technology, Computer Science Engineering",
    detail: "Building a foundation in computer science alongside practical software projects.",
  },
  {
    period: "Foundation",
    institution: "Dewan Public School",
    qualification: "Secondary education",
    detail: "Where my academic path and interest in technology began.",
  },
] as const;

export const skills = [
  ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
  ["Node.js", "Express.js", "FastAPI", "MongoDB", "PostgreSQL", "Socket.IO"],
  ["Docker", "LangChain", "LangGraph", "RAG", "Git", "Prisma"],
] as const;

export const projects: readonly Project[] = [
  {
    index: "01",
    title: "NexChat - Real Time Chat App",
    shortTitle: "NexChat",
    description:
      "A MERN real-time messaging platform with Socket.IO, read receipts, debounced search, authentication, and Docker-based deployment.",
    image: "/projects/nexchat.png",
    liveUrl: "https://nexchat-i2mg.onrender.com/",
    repositoryUrl: "https://github.com/ManasArora33/real-time-chat-app",
    technologies: ["React", "Express", "MongoDB", "Node.js", "Socket.IO", "Docker"],
    featured: true,
  },
  {
    index: "02",
    title: "YouTube RAG Chat App",
    shortTitle: "YouTube RAG",
    description:
      "A RAG-powered product for semantic search and conversational interaction with YouTube content using FastAPI, LangChain, NVIDIA NIM, and Pinecone.",
    image: "/projects/yt-rag.png",
    liveUrl: "https://yt-ai-chat.onrender.com",
    repositoryUrl: "https://github.com/ManasArora33/youtube-rag-system",
    technologies: ["FastAPI", "React", "Python", "LangChain", "NVIDIA NIM", "Pinecone", "RAG"],
    featured: true,
  },
  {
    index: "03",
    title: "BlogNest - Full Stack Blogging Website",
    shortTitle: "BlogNest",
    description:
      "A full-stack publishing platform with cookie-based JWT authentication, PostgreSQL persistence, Prisma-powered data access, and a responsive TypeScript interface.",
    image: "/projects/blognest.png",
    liveUrl: "https://blognest-frontend-uukc.onrender.com/",
    repositoryUrl: "https://github.com/ManasArora33/BlogNest",
    technologies: ["PostgreSQL", "Express", "React", "Node.js", "Prisma", "TypeScript"],
    featured: true,
  },
  {
    index: "04",
    title: "Quirk - Full Stack Twitter MVP",
    shortTitle: "Quirk",
    description:
      "A social application with secure authentication, posting, likes, follows, and timeline browsing in a Turborepo monorepo.",
    image: "/projects/quirk.png",
    liveUrl: "https://quirk.onrender.com/",
    repositoryUrl: "https://github.com/ManasArora33/Quirk-Social-App",
    technologies: ["MongoDB", "Express", "React", "Node.js", "TypeScript"],
    featured: false,
  },
  {
    index: "05",
    title: "Todo App",
    shortTitle: "Todo App",
    description:
      "A focused task manager with create, update, delete, completion, and local persistence workflows.",
    image: "/projects/todoApp.png",
    liveUrl: "https://todo-app-react-six-eta.vercel.app",
    repositoryUrl: "https://github.com/ManasArora33/Todo-App-in-React",
    technologies: ["React", "JavaScript", "Context API", "Vite"],
    featured: false,
  },
  {
    index: "06",
    title: "Tic Tac Toe Game",
    shortTitle: "Tic Tac Toe",
    description: "A browser-based implementation of the classic two-player game.",
    image: "/projects/tictactoe.png",
    liveUrl: "https://tic-tac-toe-fawn-nu.vercel.app/",
    repositoryUrl: "https://github.com/ManasArora33/TicTacToe-Project",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
  },
] as const;

export const featuredProjects = projects.filter((project) => project.featured);
export const archivedProjects = projects.filter((project) => !project.featured);