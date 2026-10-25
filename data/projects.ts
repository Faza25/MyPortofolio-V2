export type Project = {
  id: string;
  title: string;
  category: "Web" | "Mobile" | "Desain";
  description: string;
  detail: string;
  year: number;
  technologies: string[];
  accent: string;
  link: string;
  image: string;
};

export const projects: Project[] = [
  {
    id: "kelas-in",
    title: "ZaFlow",
    category: "Web",
    description: "Aplikasi web privat untuk mencatat pemasukan dan pengeluaran freelancer.",
    detail: "ZaFlow mencatat pemasukan dan pengeluaran freelancer dari berbagai platform. Frontend menggunakan React + Vite, backend menggunakan Laravel + Sanctum, dan data disimpan di MySQL.",
    year: 2026,
    technologies: ["ReactJS", "Laravel"],
    accent: "from-blue-600 to-cyan-400",
    link: "https://github.com/",
    image: "/images/projects/zaflow-dashboard.png",
  },
  {
    id: "sehatku",
    title: "StaerCloud",
    category: "Web",
    description: "Projek sedang dalam pembuatan",
    detail: "Website penjualan cloud hosting",
    year: 2026,
    technologies: ["React Native", "Expo"],
    accent: "from-indigo-600 to-blue-400",
    link: "https://github.com/",
    image: "/images/projects/comingsoon.webp",
  },
  {
    id: "ruang-karya",
    title: "Segera Hadir",
    category: "Web",
    description: "Segera Hadir",
    detail: "#",
    year: 2025,
    technologies: ["Figma", "Prototyping"],
    accent: "from-sky-500 to-indigo-500",
    link: "https://www.figma.com/",
    image: "/images/projects/comingsoon.webp",
  },
];
