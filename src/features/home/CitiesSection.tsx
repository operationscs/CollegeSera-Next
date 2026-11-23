import { Card } from "@/components/ui/card";
import { HOME_CITIES } from "@/data/homepage";

export const CitiesSection = () => {
  return (
    <div className="bg-gray-50 py-16 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-slate-100">
          Top <span className="text-orange-500">Cities</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {HOME_CITIES.map((city) => (
            <Card key={city.name} className="group cursor-pointer overflow-hidden border-slate-200 bg-white transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <div className="relative">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{city.name}</h3>
                  <p className="text-sm opacity-90">{city.colleges}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitiesSection;
