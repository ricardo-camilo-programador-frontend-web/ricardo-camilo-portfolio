"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "../ui/Card";
import type { Experience } from "@/types";

const skills = [
  "React", "Next.js", "TypeScript", "Tailwind CSS",
  "Vue.js", "VueUse", "Pinia", "Vitest",
  "Node.js", "PostgreSQL", "Docker", "Git",
];

const experiences: Experience[] = [
  {
    id: 1,
    period: "2023 — Presente",
    company: "Self-Employed",
    role: "Frontend Engineer",
    desc: "Desenvolvimento de aplicações React/Next.js com foco em performance e acessibilidade.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    id: 2,
    period: "2021 — 2023",
    company: "Consultoria SGS",
    role: "Fullstack Developer",
    desc: "Manutenção e evolução de sistemas Vue 3 + TypeScript com backend NestJS.",
    tags: ["Vue 3", "TypeScript", "NestJS"],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
      ease: [0.22, 1, 0.33, 1] as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <motion.section
      id="sobre-mim"
      className="py-20 md:py-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 space-y-16">
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold tracking-tight">Sobre Mim</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Desenvolvedor frontend apaixonado por criar experiências rápidas,
            acessíveis e visualmente agradáveis. Especializado em React,
            Next.js e TypeScript, com experiência em Vue.js e sistemas
            fullstack. Acredito em código limpo, testes automatizados e
            documentação clara.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-6">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md border border-border px-3 py-1 text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-6">Experiência</h3>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <Card key={exp.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <CardTitle className="text-lg">{exp.role}</CardTitle>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{exp.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
