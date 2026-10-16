import { ContentManager } from "@/components/admin/ContentManager";
import { CareerFormDialog } from "@/components/admin/CareerFormDialog";

export default function CareersAdmin() {
  return <ContentManager table="careers" title="Career Openings" singular="Opening" titleKey="job_title" Dialog={CareerFormDialog} />;
}
