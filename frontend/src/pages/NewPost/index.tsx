import TagSelect from "./TagSelect";
import TextEditor from "./TextEditor";

const NewPost = () => {
	return (
		<div className="container pt-4 text-normal">
			<h1 className="mb-4 text-3xl font-semibold text-center">
				Tạo bài viết mới
			</h1>
			<table className="w-full px-4 mx-auto border-separate md:max-w-3xl border-spacing-2">
				<tbody>
					<tr>
						<td className="min-w-[150px] hidden md:block">
							<span className="font-semibold">Tiêu đề:</span>
						</td>
						<td className="w-full">
							<div className="relative flex-1 ">
								<input
									type="text"
									id="floating_outlined"
									className="block border px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
								/>
								<label
									htmlFor="floating_outlined"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Tiêu đề mô tả bài viết của bạn
								</label>
							</div>
						</td>
					</tr>
					<tr>
						<td className="min-w-[150px] hidden md:block">
							<span className="font-semibold">
								Link sản phẩm:
							</span>
						</td>
						<td className="w-full">
							<div className="relative flex-1 ">
								<input
									type="text"
									id="proc_link"
									className="block border px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
								/>
								<label
									htmlFor="proc_link"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Nơi người khác có thể xem ứng dụng của bạn
									(Optional)
								</label>
							</div>
						</td>
					</tr>
					<tr>
						<td className="min-w-[150px] hidden md:block">
							<span className="font-semibold">
								Link source code:
							</span>
						</td>
						<td className="w-full">
							<div className="relative flex-1 ">
								<input
									type="text"
									id="src_link"
									className="block border px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
								/>
								<label
									htmlFor="src_link"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Nếu bạn muốn chia sẻ code cho mọi người
									(Optional)
								</label>
							</div>
						</td>
					</tr>
					<TagSelect />
				</tbody>
			</table>
			<div>
				<h4 className="my-4 text-center">Nội dung bài viết</h4>
				<TextEditor />
			</div>

			<div className="flex justify-center mt-8">
				<br />
				<button className="mx-auto button-normal ">
					Hoàn tất & đăng tải
				</button>
			</div>
		</div>
	);
};

export default NewPost;
