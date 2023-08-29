interface Comment {
	_id: string;
	post_id: string;
	user_id: string;
	rating: number;
	content: string;
}

export type { Comment };
