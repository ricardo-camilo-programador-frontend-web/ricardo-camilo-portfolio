"use client";

import type { GitHubRepo } from "@/types";
import { motion } from "framer-motion";
import { Github, Star } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/Card";

const containerVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			staggerChildren: 0.1,
			ease: [0.22, 1, 0.33, 1] as const,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

interface ProjectsProps {
	repos: GitHubRepo[];
}

export function Projects({ repos }: ProjectsProps) {
	return (
		<motion.section
			id="projetos"
			className="py-20 md:py-32"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="container mx-auto px-4 space-y-16">
				<motion.div variants={itemVariants}>
					<h2 className="text-3xl font-bold tracking-tight">Projetos</h2>
					<p className="mt-4 max-w-2xl text-muted-foreground">
						Uma seleção dos meus projetos mais recentes e relevantes no GitHub.
						Código aberto, TypeScript, React e mais.
					</p>
				</motion.div>

				<motion.div
					className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
					variants={containerVariants}
				>
					{repos.map((repo) => (
						<motion.div key={repo.id} variants={itemVariants}>
							<Card className="group h-full">
								<CardContent className="pt-6">
									<CardTitle className="text-lg">
										<div className="flex items-center justify-between">
											<span>{repo.name}</span>
											<div className="flex items-center gap-1 text-sm text-muted-foreground">
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												{repo.stargazers_count}
											</div>
										</div>
									</CardTitle>
									{repo.description ? (
										<p className="mt-2 text-sm text-muted-foreground line-clamp-3">
											{repo.description}
										</p>
									) : null}
									{repo.language ? (
										<span className="mt-3 block text-xs font-medium text-muted-foreground">
											{repo.language}
										</span>
									) : null}
									{repo.topics && repo.topics.length > 0 ? (
										<div className="mt-3 flex flex-wrap gap-1.5">
											{repo.topics.slice(0, 4).map((topic) => (
												<span
													key={topic}
													className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs"
												>
													{topic}
												</span>
											))}
										</div>
									) : null}
									<div className="mt-4 flex items-center gap-2">
										<Link
											href={repo.html_url}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`Ver ${repo.name} no GitHub`}
											className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
										>
											<Github className="h-4 w-4" />
											Ver código
										</Link>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
}
