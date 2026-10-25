import profileData from "@/data/profile.json";

export type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  detail: string;
  year: number;
  technologies: string[];
  link: string;
  accent: string;
  image?: string;
};

export const profile = profileData;

export const featuredProjects: FeaturedProject[] = [
  {
    id: "kelas-in",
    title: "ZaFlow",
    category: "Web Development",
    description: "Aplikasi web privat untuk mencatat pemasukan dan pengeluaran freelancer dari berbagai platform.",
    detail: "ZaFlow menyediakan pencatatan pemasukan dan pengeluaran dari tiap platform freelance agar lebih mudah mengelola keuangan",
    year: 2026,
    technologies: ["ReactJS", "Laravel", "MySQL"],
    link: "https://github.com/Faza25/Zaflow",
    accent: "from-blue-500 to-cyan-400",
    image: "/images/projects/zaflow-dashboard.png",
  },
  {
    id: "sehatku",
    title: "Sehatku",
    category: "Mobile App",
    description: "Konsep aplikasi pencatat kebiasaan sehat dengan pengalaman yang ringan.",
    detail: "Sehatku membantu pengguna membangun rutinitas melalui target harian, pengingat, dan rangkuman perkembangan mingguan.",
    year: 2025,
    technologies: ["React Native", "Expo", "Figma"],
    link: "https://github.com/",
    accent: "from-indigo-500 to-blue-400",
    image: "/images/projects/comingsoon.webp",
  },
  {
    id: "ruang-karya",
    title: "Ruang Karya",
    category: "UI/UX Design",
    description: "Eksplorasi galeri digital bagi kreator muda untuk memamerkan karya mereka.",
    detail: "Ruang Karya adalah studi desain platform kurasi yang menonjolkan cerita di balik setiap karya kreator muda.",
    year: 2025,
    technologies: ["Figma", "Design System", "Prototyping"],
    link: "https://www.figma.com/",
    accent: "from-sky-500 to-indigo-400",
    image: "/images/projects/comingsoon.webp",
  },
];
