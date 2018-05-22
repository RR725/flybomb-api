const counter = require("../../schema/counter").stock;
const schema = require("../../schema/stock");

const https = require("https");
const cheerio = require("cheerio");

let Counter = db.model("counter_stock", counter);
schema.pre("save", function(next) {
	let self = this;
	Counter.findByIdAndUpdate(
		{ _id: "entityId" },
		{ $inc: { stockId: 1 } },
		function(error, data) {
			console.log('data:',data)
			if (error) return next(error);
			self.stockId = data.stockId;
			next();
		}
	);
});
let Stock = db.model("stock", schema);

let add = function() {
	const url = "https://www.meizu.com";
	https
		.get(url, res => {
			let body='';
			let name='';
			res.on("data", d => {
				let $ = cheerio.load(d);
				console.log($("a").attr("href"));
				body += d;
				name = new Stock({
					name: "body.name"
				});
			});
			res.on("end", d => {

				name.save(function (err) {
					if (err) {
						console.log(err);
						return;
					}
					console.log('ok')
				})
			});
		})
		.on("error", e => {
			console.log(e);
		});
};
add();
exports.list = function(req, res) {
	Stock.find().find(function(err, doc) {
		if (err) {
			console.log(err);
			return;
		}
		let value = [];
		doc.map(function(data, key) {
			value.push({
				name: data.name,
				subjectId: data.subjectId
			});
		});
		res.send({ code: "200", value: value });
	});
};
