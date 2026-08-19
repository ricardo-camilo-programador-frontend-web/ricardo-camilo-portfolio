"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

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

function isValidEmail(email: string): boolean {
	const atIndex = email.indexOf("@");
	if (atIndex <= 0) return false;
	const dotIndex = email.indexOf(".", atIndex + 1);
	if (dotIndex === -1) return false;
	if (dotIndex === email.length - 1) return false;
	return true;
}

interface ContactProps {
	className?: string;
}

export function Contact({ className }: ContactProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) {
			newErrors.name = "Nome é obrigatório";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email é obrigatório";
		} else if (!isValidEmail(formData.email)) {
			newErrors.email = "Email inválido";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Mensagem é obrigatória";
		} else if (formData.message.length < 10) {
			newErrors.message = "Mensagem deve ter pelo menos 10 caracteres";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setIsSubmitting(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.section
			id="contato"
			className={cn("py-20 md:py-32", className)}
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="container mx-auto px-4">
				<motion.div variants={itemVariants} className="max-w-2xl">
					<h2 className="text-3xl font-bold tracking-tight">Contato</h2>
					<p className="mt-4 max-w-2xl text-muted-foreground">
						Tem um projeto em mente ou quer apenas dizer olá? Preencha o
						formulário abaixo e eu retornarei em breve.
					</p>
				</motion.div>

				<motion.form
					onSubmit={handleSubmit}
					className="mt-12 grid gap-6"
					variants={containerVariants}
				>
					<motion.div variants={itemVariants}>
						<label htmlFor="name" className="block text-sm font-medium">
							Nome
						</label>
						<input
							id="name"
							name="name"
							type="text"
							autoComplete="name"
							className={cn(
								"mt-1 block w-full rounded border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
								errors.name && "border-red-500 focus:ring-red-500",
							)}
							value={formData.name}
							onChange={handleChange}
							aria-invalid={Boolean(errors.name)}
							aria-describedby={errors.name ? "name-error" : undefined}
						/>
						{errors.name ? (
							<p id="name-error" className="mt-1 text-sm text-red-500">
								{errors.name}
							</p>
						) : null}
					</motion.div>

					<motion.div variants={itemVariants}>
						<label htmlFor="email" className="block text-sm font-medium">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							className={cn(
								"mt-1 block w-full rounded border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
								errors.email && "border-red-500 focus:ring-red-500",
							)}
							value={formData.email}
							onChange={handleChange}
							aria-invalid={Boolean(errors.email)}
							aria-describedby={errors.email ? "email-error" : undefined}
						/>
						{errors.email ? (
							<p id="email-error" className="mt-1 text-sm text-red-500">
								{errors.email}
							</p>
						) : null}
					</motion.div>

					<motion.div variants={itemVariants}>
						<label htmlFor="message" className="block text-sm font-medium">
							Mensagem
						</label>
						<textarea
							id="message"
							name="message"
							rows={5}
							className={cn(
								"mt-1 block w-full rounded border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
								errors.message && "border-red-500 focus:ring-red-500",
							)}
							value={formData.message}
							onChange={handleChange}
							aria-invalid={Boolean(errors.message)}
							aria-describedby={errors.message ? "message-error" : undefined}
						/>
						{errors.message ? (
							<p id="message-error" className="mt-1 text-sm text-red-500">
								{errors.message}
							</p>
						) : null}
					</motion.div>

					<motion.div variants={itemVariants}>
						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full sm:w-auto"
						>
							{isSubmitting ? (
								<span className="flex items-center gap-2">Enviando...</span>
							) : (
								<span className="flex items-center gap-2">
									Enviar
									<Send className="h-4 w-4" />
								</span>
							)}
						</Button>
					</motion.div>
				</motion.form>
			</div>
		</motion.section>
	);
}
