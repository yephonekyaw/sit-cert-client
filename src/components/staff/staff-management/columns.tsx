import type { ColumnDef } from "@tanstack/react-table";
import type { StaffDataItem } from "@/types/staff/member.types";
import DragHandle from "@/components/ui/data-table/drag-handle";
import { SearchFilterColumn } from "@/components/ui/data-table/search-filter-column";
import { Calendar, CheckCircle, IdCard, User, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/common.utils";
import RowActions from "./row-actions";

export const columns: ColumnDef<StaffDataItem>[] = [
  {
    id: "drag",
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <SearchFilterColumn
        column={column}
        placeholder="Search by username..."
        trigger={
          <>
            <IdCard className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Username
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div className="text-sm bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg">
          {row.getValue("username")}
        </div>
      </div>
    ),
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <SearchFilterColumn
        column={column}
        placeholder="Search by full name..."
        trigger={
          <>
            <User className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Full Name
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => {
      const fullname = `${row.original.firstName} ${row.original.lastName}`;

      return (
        <div className="flex items-center space-x-2">
          <span className="text-gray-800 font-medium">{fullname}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: () => (
      <div className="bg-gray-50/80 rounded-lg p-2 flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-gray-600" />
        <span className="font-medium text-gray-700">Status</span>
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original.isActive;

      return (
        <div className="flex item-center space-x-2">
          <Badge
            className={cn(
              "text-sm font-medium border-0 leading-normal",
              status
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            )}
          >
            {status ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <XCircle className="h-3 w-3 mr-1" />
            )}
            {status ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="bg-gray-50/80 rounded-lg p-2 flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-gray-600" />
        <span className="font-medium text-gray-700">Created At</span>
      </div>
    ),
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return (
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-800 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
            {formatDate(createdAt, {})}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => (
      <div className="bg-gray-50/80 rounded-lg p-2 flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-gray-600" />
        <span className="font-medium text-gray-700">Updated At</span>
      </div>
    ),
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      return (
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-800 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
            {formatDate(updatedAt, {})}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
];
