import Link from "next/link";
import { Navitems } from "@/data/navitems";
export const NavigationSection = () => {
  return (
    <div className="bg-gray-50 py-12 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-slate-100">
            Explore by Category
          </h2>
          <p className="text-gray-600 dark:text-slate-300">
            Find the perfect college for your field of study
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Navitems.map((navitems) => (
            <Link
              key={navitems.name}
              href={navitems.path}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={navitems.image}
                  alt={navitems.name}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-semibold text-sm mb-1">
                    {navitems.name}
                  </h3>
                  <p className="text-sm opacity-90">{navitems.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationSection;
