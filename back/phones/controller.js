const storage = {};

exports.setup = (data) => {
	storage.data = data
		.map((phone) => {
			phone.imageFileName = `/images/${phone.imageFileName}`;

			return phone;
		})
		.reduce((acc, curr) => {
			acc[curr.id] = curr;
			return acc;
		}, {});
};

exports.get = (req, res) => {
	res.json(Object.values(storage.data));
};
exports.getById = (req, res, next) => {
	try {
		if (storage.data[req.params.id]) {
			const item = { ...storage.data[req.params.id] };
			res.json(item);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
};
exports.delete = (req, res, next) => {
	try {
		if (storage.data[req.params.id]) {
			const item = { ...storage.data[req.params.id] };
			delete storage.data[req.params.id];
			res.json(item);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
};

exports.post = (req, res, next) => {
	try {
		const item = req.body;

		const id =
			item.id ||
			Object.keys(storage.data)
				.map((id) => parseInt(id, 10))
				.sort((a, b) => a - b)
				.pop() + 1;
		if (storage.data[id]) {
			res.sendStatus(409);
		} else {
			item.id = id;
			storage.data[id] = item;
			res.json(item);
		}
	} catch (error) {
		next(error);
	}
};
exports.put = (req, res, next) => {
	try {
		const item = req.body;
		const id = req.params.id;

		if (!storage.data[id]) {
			res.sendStatus(404);
		} else {
			storage.data[id] = item;
			res.json(item);
		}
	} catch (error) {
		next(error);
	}
};
exports.patch = (req, res, next) => {
	try {
		const item = req.body;
		const id = req.params.id;

		if (!storage.data[id]) {
			res.sendStatus(404);
		} else {
			storage.data[id] = Object.assign({}, storage.data[id], item);
			res.json(storage.data[id]);
		}
	} catch (error) {
		next(error);
	}
};
