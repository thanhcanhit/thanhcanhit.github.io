class MainController {
	// [GET] /
	getRoot(req, res) {
		res.send("This is ROot");
	}
}

export default new MainController();
