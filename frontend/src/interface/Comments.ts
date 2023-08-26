interface Comment {
	_id: string;
	user_id: string;
	rating: number;
	content: string;
}

interface Comments {
	_id: string;
	post_id: string;
	comments: Comment[];
}

export type { Comment, Comments };
