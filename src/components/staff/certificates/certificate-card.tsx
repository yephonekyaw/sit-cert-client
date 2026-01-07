import { CardContent } from "@/components/ui/card";
import type { GetCertificatesItem } from "@/services/staff/certificates/types";
import { CheckSquare, Upload, ShieldCheck, FileBadge } from "lucide-react";
import CardBase from "../dashboard/card-base";
import CardHeaderSection from "../dashboard/card-header-section";
import CardInfoItem from "../dashboard/card-info-item";
import CardFooter from "../dashboard/card-footer";
import CardInfoSection from "../dashboard/card-info-section";
import { useNavigate } from "react-router-dom";
import { useCertificateStore } from "@/stores/staff/certificate.stores";

interface CertificateCardProps {
  certificate: GetCertificatesItem;
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const navigate = useNavigate();
  const { setArchiveConfirmModalState, setArchiveCertificateId } =
    useCertificateStore();

  const handleEdit = () => {
    navigate(`/staff/certificates/edit/${certificate.id}`);
  };

  const handleArchive = () => {
    setArchiveCertificateId(certificate.id);
    setArchiveConfirmModalState(true);
  };

  return (
    <CardBase>
      <CardHeaderSection
        title={certificate.certName}
        codes={[certificate.certCode]}
        isActive={certificate.isActive}
        headerIcon={FileBadge}
        onEdit={handleEdit}
        onArchive={handleArchive}
      />

      <CardContent className="pt-0 space-y-6">
        <p className="text-slate-600 leading-relaxed">
          {certificate.description}
        </p>

        <CardInfoSection>
          <CardInfoItem
            icon={CheckSquare}
            label="Active Req"
            value={certificate.activeRequirementsCount.toString()}
          />
          <CardInfoItem
            icon={CheckSquare}
            label="Archived Req"
            value={certificate.archivedRequirementsCount.toString()}
          />
          <CardInfoItem
            icon={Upload}
            label="Submissions"
            value={certificate.totalSubmissionsCount.toLocaleString()}
          />
          <CardInfoItem
            icon={ShieldCheck}
            label="Type"
            value={certificate.hasExpiration ? "Renewable" : "Lifetime"}
          />
        </CardInfoSection>

        <CardFooter
          createdAt={certificate.createdAt}
          updatedAt={certificate.updatedAt}
        />
      </CardContent>
    </CardBase>
  );
};

export default CertificateCard;
