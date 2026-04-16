import { motion } from "framer-motion";
import { UserCircle, FileText, Building2 } from "lucide-react";

const teamMembers = [
  { role: "Project Manager", description: "Coordinación general, seguimiento de hitos y gestión de riesgos" },
  { role: "Arquitecto de Solución", description: "Diseño técnico, integraciones y definición de infraestructura" },
  { role: "Líder Funcional", description: "Levantamiento de requerimientos y configuración de reglas de negocio" },
  { role: "Desarrolladores Senior", description: "Implementación de personalizaciones, APIs y módulos custom" },
  { role: "QA Lead", description: "Estrategia de pruebas, automatización y control de calidad" },
  
];

const deliverables = [
  "Plan de proyecto detallado con cronograma y hitos",
  "Documento de arquitectura de solución",
  "Especificaciones funcionales y técnicas",
  
  "Plan de pruebas (unitarias, integración, UAT)",
  "Documentación de APIs e integraciones",
  "Manual de operación y soporte",
  "Plan de Knowledge Transfer",
];

const TeamReferences = () => (
  <section id="equipo" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">
          Equipo & Entregables
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
          Equipo de Proyecto y Referencias
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Resumen del equipo asignado, entregables clave y experiencia de SYSDE
          en implementaciones de escala similar.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Team */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UserCircle className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground">Equipo Asignado</h3>
          </div>
          <div className="space-y-3">
            {teamMembers.map((m) => (
              <div key={m.role} className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="font-semibold text-sm text-foreground">{m.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Deliverables */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground">Entregables Clave</h3>
          </div>
          <div className="space-y-2.5">
            {deliverables.map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-xs font-bold text-accent bg-accent/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground">{d}</span>
              </div>
            ))}
          </div>

          {/* References note */}
          <div className="mt-8 p-5 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="h-5 w-5 text-primary" />
              <h4 className="font-display font-semibold text-foreground">Clientes de Referencia</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SYSDE cuenta con clientes de referencia en el sector de crédito retail
              en Centroamérica y el Caribe, con implementaciones multi-país similares
              en escala y complejidad a la operación de Unicomer. Los detalles
              de contacto están disponibles en el Anexo 5 de la propuesta.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default TeamReferences;
