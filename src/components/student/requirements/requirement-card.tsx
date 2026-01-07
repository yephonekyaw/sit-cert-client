import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/common.utils";
import { FileText, Calendar, ChevronDown, ChevronUp, Info } from "lucide-react";
import { memo, useState } from "react";
import type { RequirementCardProps } from "@/types/student/requirement.types";
import { useRequirementStore } from "@/stores/student/requirement.stores";
import {
  truncateText,
  getRequirementStatusBadges,
  shouldShowApprovedDetails,
} from "@/utils/student/requirement.utils";
import { DEFAULT_TEXT_TRUNCATE_LENGTH } from "@/constants/student/requirement.constants";
import CardInfoItem from "@/components/staff/dashboard/card-info-item";

const RequirementCard = ({ requirement }: RequirementCardProps) => {
  const { openDetailSheet } = useRequirementStore();
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  const statusBadges = getRequirementStatusBadges(requirement);
  const showApprovedDetails = shouldShowApprovedDetails(requirement);

  const instructionsText = requirement.specialInstruction || "";
  const shouldTruncate = instructionsText.length > DEFAULT_TEXT_TRUNCATE_LENGTH;

  return (
    <Card
      className="group hover:shadow-lg hover:ring-2 hover:ring-blue-500/50 transition-all duration-200 border-slate-200 h-full cursor-pointer bg-white"
      onClick={() => {
        openDetailSheet(requirement);
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${requirement.requirementName}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetailSheet(requirement);
        }
      }}
    >
      <CardContent className="space-y-4 text-black">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 bg-blue-500 flex-shrink-0">
            <AvatarFallback className="text-white bg-blue-500">
              <FileText className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-black truncate text-base leading-tight mb-1">
              {requirement.requirementName}
            </p>
            <div className="flex gap-1 flex-wrap">
              <Badge className="bg-blue-500 text-white border-0 text-xs px-2 py-0.5">
                {requirement.certCode}
              </Badge>
              <Badge className="bg-blue-500 text-white border-0 text-xs px-2 py-0.5">
                {requirement.programCode}
              </Badge>
            </div>
          </div>
          <Badge
            className={`bg-white border border-blue-200 text-black ${statusBadges[0].className} text-sm`}
          >
            <span>{statusBadges[0].label}</span>
          </Badge>
        </div>

        {/* Special Instruction */}
        {requirement.specialInstruction && (
          <div className="bg-gray-100 p-3 rounded-lg space-y-1.5">
            <div className="text-sm text-gray-800 leading-relaxed">
              {showFullInstructions
                ? instructionsText
                : truncateText(instructionsText)}
            </div>
            {shouldTruncate && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 text-xs text-blue-600 hover:text-blue-700 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullInstructions(!showFullInstructions);
                }}
              >
                {showFullInstructions ? (
                  <>
                    Show less <ChevronUp className="h-3 w-3 ml-1" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="h-3 w-3 ml-1" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {/* All Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* The first status is the primary status, which is already shown above. The second status is time related information, which is optional. */}
          {statusBadges.slice(1).map((badge, index) => {
            const Icon = badge.icon;
            return (
              <CardInfoItem
                key={index}
                icon={Icon}
                label="Status"
                value={badge.label}
                className="bg-blue-100 text-blue-700 border-0 px-2 py-1"
              />
            );
          })}

          <CardInfoItem
            icon={Info}
            label="Requirement"
            value={requirement.isMandatory ? "Required" : "Optional"}
            className="bg-blue-100 text-blue-700 border-0 px-2 py-1"
          />

          <CardInfoItem
            icon={Calendar}
            label="Due At"
            value={formatDate(requirement.submissionDeadline, {})}
            className="bg-red-100 text-red-700 border-0 px-2 py-1"
          />

          {/* Additional timing badges for approved submissions */}
          {showApprovedDetails && requirement.submittedAt && (
            <CardInfoItem
              icon={Calendar}
              label="Submitted"
              value={formatDate(requirement.submittedAt, {})}
              className="bg-blue-100 text-blue-700 border-0 px-2 py-1"
            />
          )}
          {showApprovedDetails && requirement.expiredAt && (
            <CardInfoItem
              icon={Calendar}
              label="Expires"
              value={formatDate(requirement.expiredAt, {})}
              className="bg-blue-100 text-blue-700 border-0 px-2 py-1"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(RequirementCard);
