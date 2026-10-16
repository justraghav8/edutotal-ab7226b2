import { ContentManager } from "@/components/admin/ContentManager";
import { ServiceFormDialog } from "@/components/admin/ServiceFormDialog";

export default function Services() {
  return <ContentManager table="services" title="Services" singular="Service" titleKey="title" Dialog={ServiceFormDialog} />;
}
