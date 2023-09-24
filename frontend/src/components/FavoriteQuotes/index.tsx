const FavoriteQuote = () => {
	return (
		<figure className="max-w-screen-md mx-auto text-center">
			<svg
				className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 18 14"
			>
				<path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
			</svg>
			<blockquote>
				<p className="text-2xl italic font-medium text-gray-900 dark:text-white">
					"A winner is just a loser who tried one more time."
				</p>
			</blockquote>
			<figcaption className="flex items-center justify-center mt-6 space-x-3">
				<img
					className="w-6 h-6 rounded-full"
					src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1658495060i/5348195._UX200_CR0,0,200,200_.jpg"
					alt="profile picture"
				/>
				<div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
					<cite className="pr-3 font-medium text-gray-900 dark:text-white">
						George M. Moore Jr.
					</cite>
					<cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
						Irish novelist
					</cite>
				</div>
			</figcaption>
		</figure>
	);
};

export default FavoriteQuote;
