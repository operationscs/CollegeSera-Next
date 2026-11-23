import { HOME_STATS } from "@/data/homepage";

export const StatsSection = () => {
  return (
    <div className="border-b bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          {HOME_STATS.map((item) => (
            <div
              key={item.label}
              className="
                flex flex-col items-center justify-center 
                p-6 rounded-xl border border-orange-100 
                bg-white shadow-sm hover:shadow-md transition-all dark:border-slate-700
                dark:bg-slate-900
                hover:-translate-y-1
              "
            >
              <div
                className={`w-14 h-14 ${item.bg} ${item.text}
                rounded-full flex items-center justify-center text-2xl mb-3`}
              >
                {item.icon}
              </div>

              <p className="text-sm font-semibold text-gray-800 dark:text-slate-100 md:text-base">
                {item.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default StatsSection;
