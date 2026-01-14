import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useScheduleStore } from "@/stores/staff/schedule.stores";

import { Calendar, FilePieChart } from "lucide-react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const PageHeader = () => {
  const location = useLocation();
  const { setSelectedYearFilter } = useScheduleStore();

  const years = useMemo<number[]>(() => {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 4;
    const startYear = 2000;

    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    ).reverse();
  }, []);

  return (
    <header className="rounded-2xl mb-[1rem] flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <FilePieChart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-blue-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create, manage, and review statistics, programs, certificates, and
            program requirements.
          </p>
        </div>
      </div>
      {location.pathname.includes("schedules") && (
        <div className="relative group">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
          <Select onValueChange={(value) => setSelectedYearFilter(value)}>
            <SelectTrigger className="pl-9">
              <SelectValue
                defaultValue="all"
                placeholder="Academic Year Filter"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                {years.map((year) => (
                  <SelectItem
                    id={year.toString()}
                    key={year}
                    value={year.toString()}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </header>
  );
};

export default PageHeader;
