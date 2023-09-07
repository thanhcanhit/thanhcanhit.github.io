interface CommentInterface {
	_id: string;
	post_id: string;
	user_id: string | null;
	displayName: string;
	createdAt: Date;
	rating: number;
	content: string;
}

export type { CommentInterface };
