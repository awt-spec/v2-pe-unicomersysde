import { useState, useEffect } from "react";
import { Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import sysdeLogoUrl from "@/assets/sysde-logo.jpeg";
import { useT } from "@/i18n/LanguageContext";

const Navbar = () => {
  const { t, lang, toggle } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t("nav.summary"), href: "#hero" },
    { label: t("nav.modules"), href: "#modulos" },
    { label: t("nav.unlimited"), href: "#ilimitado" },
    { label: t("nav.twoworlds"), href: "#dosmundos" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.whysysde"), href: "#porque" },
    { label: t("nav.service"), href: "#servicio" },
    { label: t("nav.rfp"), href: "#rfp" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card shadow-lg border-b border-border" : "bg-card"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#hero" className="flex items-center gap-3">
          <img src={sysdeLogoUrl} alt="SYSDE" className="h-9 w-auto" />
          <span className="text-accent font-display font-semibold text-lg">SAF+</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggle}
            title={t("lang.tooltip")}
            className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-secondary/40 hover:bg-secondary text-xs font-bold text-foreground transition-colors"
            aria-label={t("lang.tooltip")}
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggle}
            title={t("lang.tooltip")}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border bg-secondary/40 text-xs font-bold text-foreground"
            aria-label={t("lang.tooltip")}
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "es" ? "EN" : "ES"}
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border px-4 pb-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
