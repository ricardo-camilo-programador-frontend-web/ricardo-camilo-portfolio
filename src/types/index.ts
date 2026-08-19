export interface Project {
	id: string;
	title: string;
	category: string;
	description: string;
	image?: string;
	tags: string[];
	link: string;
	year: string;
}

export interface Experience {
	id: number;
	period: string;
	company: string;
	role: string;
	desc: string;
	tags: string[];
}

export interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	topics: string[];
	updated_at: string;
}
