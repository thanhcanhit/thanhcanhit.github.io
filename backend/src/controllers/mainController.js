class MainController {
	// [GET] /
	getRoot(req, res) {
		res.send("This is root");
	}
}
module.exports = new MainController();
