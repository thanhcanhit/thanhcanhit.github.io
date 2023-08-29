interface Post {
	_id: string;
	title: string;
	shortDesc: string;
	procLink: string;
	img_path: string;
	sourceLink: string;
	content: string;
	tags: string[];
	user_id: string;
	rating: number;
	view: number;
	createdAt: Date;
}

export type { Post };
