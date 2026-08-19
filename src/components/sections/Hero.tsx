"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      ease: [0.22, 1, 0.33, 1] as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <motion.section
      className="py-20 md:py-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          variants={itemVariants}
        >
          Ricardo Camilo
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-muted-foreground md:text-xl"
          variants={itemVariants}
        >
          Frontend Engineer | React | Next.js
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <Button size="lg">
            <Link href="#projetos" className="flex items-center">
              Ver Projetos
            </Link>
          </Button>

          <Button variant="outline" size="lg">
            <a
              href="/cv.pdf"
              download
              className={cn("flex items-center gap-2")}
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
