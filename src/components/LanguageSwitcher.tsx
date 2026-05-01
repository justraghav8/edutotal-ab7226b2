import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_LANGUAGES } from "@/i18n";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language || "en";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors"
        aria-label={t("common.language")}
      >
        <Globe className="h-4 w-4" />
        <span className="absolute -bottom-1 -right-1 text-[9px] font-semibold uppercase bg-accent text-accent-foreground rounded-sm px-1 leading-none py-0.5">
          {current.slice(0, 2)}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{lang.label}</span>
            {current.startsWith(lang.code) && (
              <Check className="h-4 w-4 text-accent" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
