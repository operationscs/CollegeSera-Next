type NAVITEMS = {
  name: string;
  path: string;
  image: string;
  description: string;
}[];

export const Navitems: NAVITEMS = [
  {
    name: "Engineering",
    path: "/colleges/engineering",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    description: "Top Engineering Colleges",
  },
  {
    name: "Medical",
    path: "/colleges/medical",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    description: "Premier Medical Institutions",
  },
  {
    name: "MBA",
    path: "/colleges/mba",
    image: "/MBA logo.png",
    description: "Business Schools",
  },
  {
    name: "Law",
    path: "/colleges/law",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
    description: "Law Colleges",
  },
  {
    name: "Arts",
    path: "/colleges/arts",
    image:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=250&fit=crop",
    description: "Arts & Humanities",
  },
  {
    name: "Commerce",
    path: "/colleges/commerce",
    image:
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=250&fit=crop",
    description: "Commerce & Finance",
  },
];
