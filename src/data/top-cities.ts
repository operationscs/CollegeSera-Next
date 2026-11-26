import type { CitiesSectionContent, HomeCity } from "@/types/home";

export const CITIES_SECTION_CONTENT: CitiesSectionContent = {
  eyebrow: "GEOGRAPHIC EXPLORATION",
  title: "South India's Premier Educational Hubs",
  description:
    "Explore premier technical colleges, medical corridors, and research universities in each metro.",
  prevButtonLabel: "Scroll cities left",
  nextButtonLabel: "Scroll cities right",
  emptyMessage: "No educational hubs found.",
};

export const TOP_CITIES_DATA: HomeCity[] = [
  {
    id: "city-bangalore",
    name: "BANGALORE",
    colleges: "1836+ colleges",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=3840&q=100&auto=format&fit=crop",
    href: "/colleges/location/bangalore",
  },
  {
    id: "city-chennai",
    name: "CHENNAI",
    colleges: "920+ colleges",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg",
    href: "/colleges/location/chennai",
  },
  {
    id: "city-coimbatore",
    name: "COIMBATORE",
    colleges: "680+ colleges",
    image:
      "https://images.unsplash.com/photo-1609609830354-8f615d61b9c8?w=3840&q=100&auto=format&fit=crop",
    href: "/colleges/location/coimbatore",
  },
  {
    id: "city-hyderabad",
    name: "HYDERABAD",
    colleges: "1140+ colleges",
    image:
      "https://images.unsplash.com/photo-1560237606-f82b6cb1ebbf?w=3840&q=100&auto=format&fit=crop",
    href: "/colleges/location/hyderabad",
  },
  {
    id: "city-kochi",
    name: "KOCHI",
    colleges: "460+ colleges",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=3840&q=100&auto=format&fit=crop",
    href: "/colleges/location/kochi",
  },
  {
    id: "city-madurai",
    name: "MADURAI",
    colleges: "390+ colleges",
    image:
      "https://images.unsplash.com/photo-1692173248120-59547c3d4653?w=3840&q=100&auto=format&fit=crop",
    href: "/colleges/location/madurai",
  },
  {
    id: "city-trichy",
    name: "TRICHY",
    colleges: "340+ colleges",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/Srirangam_Temple_view_from_Rock_fort_Temple.jpg",
    href: "/colleges/location/tiruchirappalli",
  },
  {
    id: "city-salem",
    name: "SALEM",
    colleges: "310+ colleges",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Yercaud_hills.jpg",
    href: "/colleges/location/salem",
  },
];
