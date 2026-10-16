import { ContentManager } from "@/components/admin/ContentManager";
import { IndustryFormDialog } from "@/components/admin/IndustryFormDialog";

export default function IndustriesAdmin() {
  return <ContentManager table="industries" title="Industries" singular="Industry" titleKey="title" Dialog={IndustryFormDialog} />;
}
