export const authenticateUser = async (req, res, next) => {
	console.log(req.cookies);
	next();
};
