import SysdeHint from "./SysdeHint";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-md bg-primary-foreground/10 flex items-center justify-center">
              <span className="font-display font-bold text-sm">S</span>
            </div>
            <span className="font-display font-bold">SYSDE</span>
            <span className="text-accent font-display font-semibold ml-1">SAF+</span>
          </div>
          <p className="text-sm text-primary-foreground/60">
            Panamá · Soluciones de crédito retail para Latinoamérica
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3">
          <SysdeHint variant="pill" text="¿Última duda? Pregunta a SYSDE IA" className="border-primary-foreground/20 bg-primary-foreground/5 hover:bg-primary-foreground/10 [&_span]:text-primary-foreground/80" />
          <div className="text-sm text-primary-foreground/50 text-center md:text-right">
            <p>Propuesta confidencial preparada para Unicomer</p>
            <p className="mt-1">© {new Date().getFullYear()} SYSDE. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
