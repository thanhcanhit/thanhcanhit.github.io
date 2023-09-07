interface User {
	_id: string;
	name: string;
	avatar_path?: string;
	username: string;
	bio: string;
	password: string;
	isAdmin: boolean;
	numPost: number;
	createdAt: Date;
	accessToken: string;
}

export type { User };
