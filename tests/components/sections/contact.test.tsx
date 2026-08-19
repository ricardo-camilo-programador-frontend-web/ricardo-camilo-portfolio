import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Contact } from "../../../src/components/sections/Contact";

test("Contact renders section title", () => {
	render(<Contact />);
	expect(screen.getByText("Contato")).toBeInTheDocument();
});

test("Contact renders description text", () => {
	render(<Contact />);
	expect(screen.getByText(/preencha o formulário/i)).toBeInTheDocument();
});

test("Contact renders name input", () => {
	render(<Contact />);
	expect(screen.getByLabelText("Nome")).toBeInTheDocument();
});

test("Contact renders email input", () => {
	render(<Contact />);
	expect(screen.getByLabelText("Email")).toBeInTheDocument();
});

test("Contact renders message textarea", () => {
	render(<Contact />);
	expect(screen.getByLabelText("Mensagem")).toBeInTheDocument();
});

test("Contact renders submit button", () => {
	render(<Contact />);
	expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
});

test("Contact shows validation error for empty name", async () => {
	render(<Contact />);
	const form = document.querySelector("form") as HTMLFormElement;
	fireEvent.submit(form);
	await waitFor(() => {
		expect(screen.getByText("Nome é obrigatório")).toBeInTheDocument();
	});
});

test("Contact shows validation error for empty email", async () => {
	render(<Contact />);
	const form = document.querySelector("form") as HTMLFormElement;
	fireEvent.submit(form);
	await waitFor(() => {
		expect(screen.getByText("Email é obrigatório")).toBeInTheDocument();
	});
});

test("Contact shows validation error for invalid email", async () => {
	render(<Contact />);
	const nameInput = screen.getByLabelText("Nome");
	const emailInput = screen.getByLabelText("Email");
	const messageInput = screen.getByLabelText("Mensagem");

	fireEvent.change(nameInput, { target: { value: "Test User" } });
	fireEvent.change(emailInput, { target: { value: "not-an-email" } });
	fireEvent.change(messageInput, { target: { value: "Valid message here" } });

	const form = document.querySelector("form") as HTMLFormElement;
	fireEvent.submit(form);
	await waitFor(() => {
		expect(screen.getByText("Email inválido")).toBeInTheDocument();
	});
});

test("Contact shows validation error for short message", async () => {
	render(<Contact />);
	const nameInput = screen.getByLabelText("Nome");
	const emailInput = screen.getByLabelText("Email");
	const messageInput = screen.getByLabelText("Mensagem");

	fireEvent.change(nameInput, { target: { value: "Test User" } });
	fireEvent.change(emailInput, { target: { value: "test@example.com" } });
	fireEvent.change(messageInput, { target: { value: "short" } });

	const form = document.querySelector("form") as HTMLFormElement;
	fireEvent.submit(form);
	await waitFor(() => {
		expect(
			screen.getByText("Mensagem deve ter pelo menos 10 caracteres"),
		).toBeInTheDocument();
	});
});

test("Contact shows validation error for empty message", async () => {
	render(<Contact />);
	const form = document.querySelector("form") as HTMLFormElement;
	fireEvent.submit(form);
	await waitFor(() => {
		expect(screen.getByText("Mensagem é obrigatória")).toBeInTheDocument();
	});
});

test("Contact shows loading state on submit", async () => {
	render(<Contact />);
	const nameInput = screen.getByLabelText("Nome");
	const emailInput = screen.getByLabelText("Email");
	const messageInput = screen.getByLabelText("Mensagem");

	fireEvent.change(nameInput, { target: { value: "Test User" } });
	fireEvent.change(emailInput, { target: { value: "test@example.com" } });
	fireEvent.change(messageInput, {
		target: { value: "This is a valid message" },
	});

	const form = document.querySelector("form") as HTMLFormElement;
	fireEvent.submit(form);
	await waitFor(() => {
		expect(screen.getByRole("button", { name: /enviando/i })).toBeDisabled();
	});
});

test("Contact input has aria-invalid when error", async () => {
	render(<Contact />);
	const form = document.querySelector("form") as HTMLFormElement;
	fireEvent.submit(form);
	await waitFor(() => {
		const nameInput = screen.getByLabelText("Nome");
		expect(nameInput).toHaveAttribute("aria-invalid", "true");
	});
});

test("Contact error message has correct id for aria-describedby", async () => {
	render(<Contact />);
	const form = document.querySelector("form") as HTMLFormElement;
	fireEvent.submit(form);
	await waitFor(() => {
		const error = screen.getByText("Nome é obrigatório");
		expect(error).toHaveAttribute("id", "name-error");
	});
});
