import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowRight, Sparkles, Zap, Layers, Gauge } from "lucide-react";
import { ClientOnly } from "@/components/nexar/ClientOnly";

const Scene3D = lazy(() => import("@/components/nexar/Scene3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexar" },
      {
        name: "description",
        content:
          "Nexar é um web studio focado em sites modernos, rápidos e memoráveis. Design sob medida, experiência refinada e performance de ponta.",
      },
      { property: "og:title", content: "Nexar — Web Studio" },
      {
        property: "og:description",
        content:
          "Sites modernos, rápidos e memoráveis. Cada projeto construído do zero, com foco em design, experiência e performance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Work />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <img src="https://i.ibb.co/DHw11p9s/site-logo.png" alt="Nexar" width="100"></img>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition-colors">Serviços</a>
          <a href="#process" className="hover:text-foreground transition-colors">Processo</a>
          <a href="#work" className="hover:text-foreground transition-colors">Projetos</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contato</a>
        </nav>
        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          Começar
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 pb-16 grain">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-radial)" }}
      />
      {/* 3D scene */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 -z-0 pointer-events-none"
      >
        <ClientOnly>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </ClientOnly>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Aceitando projetos · 2026
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.95] font-semibold tracking-tighter">
            Sites que <span className="text-gradient">marcam</span>.
            <br />
            Feitos do <em className="not-italic text-muted-foreground">zero</em>.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Nexar é um web studio focado em criar experiências digitais modernas,
            rápidas e memoráveis — com design sob medida e performance obsessiva.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Iniciar projeto
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-surface transition"
            >
              Ver projetos
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          scroll
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-muted-foreground to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Design sob medida",
    "Performance obsessiva",
    "Motion & interação",
    "SEO técnico",
    "Acessibilidade",
    "Escalável",
  ];
  const loop = [...items, ...items];
  return (
    <section className="border-y border-border/60 bg-surface/40 py-8 overflow-hidden">
      <div className="flex marquee gap-16 whitespace-nowrap text-2xl md:text-4xl font-display tracking-tight text-muted-foreground">
        {loop.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-16">
            {t}
            <span className="text-foreground">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

const services = [
  {
    icon: Sparkles,
    title: "Design de marca digital",
    body: "Identidades visuais coerentes que se traduzem em interfaces refinadas.",
  },
  {
    icon: Layers,
    title: "Web design & UI",
    body: "Sites únicos, pensados pixel a pixel para o seu público e sua história.",
  },
  {
    icon: Zap,
    title: "Desenvolvimento",
    body: "Código limpo, moderno e escalável. Stack de ponta, entregas rápidas.",
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    body: "Carregamento instantâneo, Core Web Vitals verdes e visibilidade orgânica.",
  },
];

function Services() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Serviços"
          title={<>O que fazemos<br />de melhor.</>}
          copy="Da estratégia à entrega, cuidamos de cada detalhe do produto digital."
        />
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative surface-panel p-8 md:p-10 overflow-hidden hover:border-foreground/40 transition-colors"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
              <s.icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
              <h3 className="mt-8 text-2xl md:text-3xl font-display font-medium">
                {s.title}
              </h3>
              <p className="mt-3 text-muted-foreground max-w-md">{s.body}</p>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                <span>Saiba mais</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", t: "Descoberta", d: "Entendemos negócio, público e objetivos. Estratégia antes do pixel." },
  { n: "02", t: "Design", d: "Direção de arte, protótipos navegáveis e refinamento até o detalhe." },
  { n: "03", t: "Build", d: "Desenvolvimento moderno, com foco em performance e escalabilidade." },
  { n: "04", t: "Lançamento", d: "Deploy, mensuração e evolução contínua pós-lançamento." },
];

function Process() {
  return (
    <section id="process" className="relative py-32 px-6 bg-surface/30 border-y border-border/60">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Processo"
          title={<>Método claro,<br />resultado impecável.</>}
          copy="Um framework de trabalho enxuto, focado em transparência e velocidade."
        />
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border overflow-hidden rounded-2xl">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background p-8 md:p-10 min-h-[220px] flex flex-col"
            >
              <div className="text-sm text-muted-foreground font-mono">{s.n}</div>
              <div className="mt-auto">
                <h3 className="text-2xl font-display font-medium">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  { name: "Coffee House", tag: "Cafeteria", year: "2025", href: "https://nexarsite.github.io/landing/projects/coffee_house" },
];

function Work() {
  return (
    <section id="work" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Projetos"
          title={<>Trabalhos<br />recentes.</>}
          copy="Nossos projetos fictícios para demonstração"
        />
        <div className="mt-20 border-t border-border">
          {projects.map((p, i) => (
            <motion.a
              href={p.href}
              key={p.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group grid grid-cols-12 items-center gap-4 py-8 md:py-10 border-b border-border hover:bg-surface/50 transition-colors px-2"
            >
              <div className="col-span-1 text-xs font-mono text-muted-foreground">
                0{i + 1}
              </div>
              <div className="col-span-6 md:col-span-5 text-2xl md:text-4xl font-display font-medium tracking-tight">
                {p.name}
              </div>
              <div className="col-span-3 md:col-span-4 text-sm text-muted-foreground">
                {p.tag}
              </div>
              <div className="col-span-2 text-right text-sm text-muted-foreground font-mono">
                {p.year}
              </div>
              <div className="col-span-12 md:col-span-0 md:absolute md:right-8 opacity-0 group-hover:opacity-100 transition">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[0.95]"
        >
          Vamos construir<br />
          <span className="text-gradient">algo memorável.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto"
        >
          Conte sobre o seu projeto. Respondemos em até 24h úteis.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://ig.me/m/nexar.site"
            className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-medium hover:opacity-90 transition"
          >
            Fale conosco pelo Instagram
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <img src="https://i.ibb.co/DHw11p9s/site-logo.png" alt="Nexar" width="150"></img>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/nexar.site" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="mailto:nexar.site@gmail.com" className="hover:text-foreground transition-colors">E-mail</a>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
      <div className="md:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6"
        >
          — {eyebrow}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[0.95]"
        >
          {title}
        </motion.h2>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:col-span-5 text-muted-foreground max-w-md"
      >
        {copy}
      </motion.p>
    </div>
  );
}
