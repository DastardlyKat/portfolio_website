export type Project = {
  slug: string;
  title: string;
  year: string;
  description: string;
  longDescription: string;
  role: string;
  tags: string[];
  image: string;
  previewVideo?: string; // optional short muted loop shown on card hover
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

// Replace with your real projects.
export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'Exo-Rehab Glove - Adaptive RL-Controlled Rehabilitation Exoskeleton',
    year: '2026',
    description: 'My B.Tech major project: an assistive/rehabilitation exoskeleton glove, currently under development.',
    longDescription:`
      My B.Tech final year project, an assistive/rehabilitation exoskeleton glove based on the SNU Exo-Glove Poly
      reference design, modeled and iterated in Fusion 360. The first prototype covers the four fingers, excluding
      the thumb.\n\nEach finger uses two independent tendons, a flexion cable routed along the palmar side and an
      extension cable routed along the dorsal side, rather than sharing a single line. Actuation is one motor per
      finger, housed in a forearm actuator unit, with a dual-spool system managing flexion and extension
      together.\n\nOne of the harder design problems was routing tendons across the wrist. They pass through a
      guide placed near the wrist's own flexion/extension axis instead of a straight pass-through, so wrist
      movement doesn't add unwanted tension to the finger tendons.`,

    role: '3D Designer, Software',
    tags: ['Fusion360', 'C++', 'Control Systems'],
    image: '/projects/exo_rehab/exo_rehab.png',
    liveUrl: 'https://grabcad.com/library/exorehab-glove-1',
    // TODO: confirm the exact repo slug under your GitHub account.
    githubUrl: 'https://github.com/DastardlyKat/exo-rehab-glove',
    featured: true
  },
  {
    slug: 'project-two',
    title: 'Multispectral Image Fusion for Perimeter Surveillance',
    year: '2026',
    description: 'Developed a low-light visible–infrared image fusion system with three fusion techniques, evaluated on the LLVIP dataset.',
    longDescription:`
      Built an end-to-end visible–infrared image fusion pipeline that improves low-light surveillance by combining RGB and thermal imagery.
      The pipeline includes preprocessing, three fusion methods (Average, PCA, and Haar Wavelet DWT), and quantitative evaluation using Entropy, SSIM, PSNR, Spatial Frequency, and Edge Intensity.
      Wavelet DWT consistently achieved the best performance, producing sharper, information-rich fused images suitable for surveillance applications.`,
    role: 'Solo builder',
    tags: ['Python', 'FastAPI'],
    image: '/projects/image_fusion/image_fusion.png',
    // TODO: confirm the exact repo slug under your GitHub account.
    githubUrl: 'https://github.com/DastardlyKat/image_fusion',
    featured: true
  },
  {
    slug: 'project-three',
    title: 'Meridian Health & Dental',
    year: '2026',
    description: 'A full-stack healthcare appointment platform that lets patients book real-time doctor appointments through a shared scheduling system.',
    longDescription:
    `
      Meridian Health & Dental is a modern appointment booking platform built to replace the traditional back-and-forth phone call process used by many clinics. 
      Patients can browse doctors, compare procedures with transparent pricing, view real-time availability, and book appointments instantly through an intuitive 
      interface.\n\nOn the frontend, I built a responsive user experience with Next.js and Framer Motion, focusing on smooth transitions, polished interactions, 
      and fast navigation. The platform includes procedure listings, doctor profiles, appointment scheduling, booking confirmation, FAQs, and a fully responsive 
      design.\n\nOn the backend, I developed a Node.js API with PostgreSQL and Prisma to manage doctors, procedures, appointment slots, bookings, and user data. 
      The application includes separate dashboards for patients and administrators. Patients can manage upcoming appointments, while administrators can create 
      providers, define procedures, manage schedules, monitor bookings, and oversee clinic operations from a centralized dashboard.\n\nThe project emphasizes clean 
      architecture, scalable database design, reusable components, type safety, and a production-ready full-stack workflow that mirrors how modern healthcare booking 
      platforms are built.
      `,
    role: 'Full-stack developer',
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Framer Motion', 'Tailwind CSS'],

    // image: '/projects/meridian-health.png',
    image: '/projects/meridian_health/meridian_health.png',
    previewVideo: '/projects/meridian_health/meridian_health.mp4',

    liveUrl: 'https://clinic-booking-platform-1.onrender.com',
    githubUrl: 'https://github.com/DastardlyKat/clinic-booking-platform',
    featured: false
  }
];

// export const skills = [
//   'TypeScript', 'React', 'Next.js', 'Node.js', 'Framer Motion',
//   'Tailwind CSS', 'PostgreSQL', 'Python', 'C++', 'GraphQL', 'AWS'
// ];

export const skills = [
  // Robotics & Embedded
  'ROS2', 'Embedded C++', 'C++', 'Fusion 360',
  // AI / ML
  'Computer Vision', 'Machine Learning', 'Deep Learning', 'Python',
  // Software
  'FastAPI', 'React', 'Next.js', 'Node.js', 'Prisma', 'PostgreSQL', 'SQLite',
  'Tailwind CSS', 'Framer Motion', 'AWS'
];
