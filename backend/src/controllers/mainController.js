class MainController {
	// [GET] /
	getRoot(req, res) {
		res.send("This is root");
	}
}

export default new MainController();
