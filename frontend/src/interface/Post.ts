interface Post {
	_id: string;
	title: string;
	procLink: string;
	sourceLink: string;
	content: string;
	tags: string[];
	user_id: string;
	rating: number;
	view: number;
}

export type { Post };