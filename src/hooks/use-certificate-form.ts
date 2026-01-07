import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCertificateStore } from "@/stores/staff/certificate.stores";
import { useUpdateCertificate } from "@/services/staff/certificates/mutations";
import { certificateFormSchema } from "@/schemas/staff/certificate.schemas";
import type {
  CertificateFormProps,
  CertificateFormSchemaType,
} from "@/types/staff/certificate.types";

export const useCertificateForm = ({
  isEdit,
  certificateId,
}: CertificateFormProps) => {
  const navigate = useNavigate();
  const { selectedCertificate } = useCertificateStore();
  const { mutateAsync: update, isPending: isUpdating } = useUpdateCertificate();

  const form = useForm<CertificateFormSchemaType>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      certCode: "",
      certName: "",
      description: "",
      hasExpiration: false,
    },
  });

  // Populate form when certificate data is loaded
  useEffect(() => {
    if (selectedCertificate && isEdit) {
      form.reset({
        certCode: selectedCertificate.certCode,
        certName: selectedCertificate.certName,
        description: selectedCertificate.description,
        hasExpiration: selectedCertificate.hasExpiration,
      });
    }
  }, [selectedCertificate, isEdit, form]);

  const onSubmit = async (data: CertificateFormSchemaType) => {
    const submitData = {
      ...data,
    };

    if (isEdit && certificateId) {
      await update({ id: certificateId, ...submitData });
    }
  };

  const handleGoBack = () => {
    navigate("/staff/dashboard/certificates");
  };

  return {
    form,
    isUpdating,
    onSubmit,
    handleGoBack,
    isEdit,
  };
};
