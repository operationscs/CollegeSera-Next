import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HOME_EXAMS } from "@/data/homepage";

export const ExamsSection = () => {
  return (
    <div className="bg-gray-50 py-16 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Upcoming <span className="text-orange-500">Exams</span>
          </h2>
          <Button variant="ghost" className="text-orange-500 hover:text-orange-600 dark:hover:bg-slate-800">
            View more
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_EXAMS.map((exam) => (
            <Card key={exam.id} className="border-slate-200 bg-white text-slate-900 transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    exam.type === "Online" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                  }`}>
                    • {exam.type}
                  </span>
                </div>
                
                <div className="flex items-start space-x-3 mb-4">
                  <img
                    src={exam.logo}
                    alt={exam.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight mb-2">
                      {exam.name}
                    </h3>
                  </div>
                </div>

                <p className="mb-4 text-sm text-gray-600 dark:text-slate-300">
                  {exam.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-400">Exam Level</span>
                    <span className="font-medium">{exam.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-400">Application Date</span>
                    <span className="font-medium">{exam.applicationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-400">Exam Date</span>
                    <span className="font-medium">{exam.examDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-400">Exam Duration</span>
                    <span className="font-medium">{exam.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamsSection;
