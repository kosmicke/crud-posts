const db = require('../../config/database');

module.exports = (app) => {

	app.get('/', (req, res) => {
		res.json({ message: 'Hello api!' });
	});

	app.get('/api/posts/', (req, res) => {
		const sql = 'select * from posts';
		db.all(sql, (err, rows) => {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: 'success',
				data: rows,
			});
		});
	});

	app.get('/api/posts/:id', (req, res) => {
		const sql = 'select * from posts where id = ?';
		const params = [req.params.id];
		db.all(sql, params, (err, row) => {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: 'success',
				data: row,
			});
		});
	});

	app.post('/api/posts/', (req, res) => {
		var errors = [];
		if (!req.body.title) {
			errors.push('Título não informado');
		}
		if (errors.length) {
			res.status(400).json({ error: errors.join(',') });
			return;
		}
		var post = {
			title: req.body.title,
			content: req.body.content ? req.body.content : '',
			imageUrl: req.body.imageUrl ? req.body.imageUrl : '',
		};
		var sql = `
			INSERT INTO posts (
				title,
				content,
				imageUrl
			) VALUES (?, ?, ?)
    	`;
		var params = [
			post.title,
			post.content,
			post.imageUrl,
		];

		db.run(sql, params, function (err, result) {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: 'success',
				data: post,
				id: this.lastID,
			});
		});
	});

	app.put('/api/posts/:id', (req, res, next) => {
		var post = {
			title: req.body.title,
			content: req.body.content,
			imageUrl: req.body.imageUrl,
		};
		db.run(
			`UPDATE posts set 
                title = COALESCE(?,title), 
                content = COALESCE(?,content),
                imageUrl= COALESCE(?,imageUrl)
            WHERE id = ?`,
			[
				post.title,
				post.content,
				post.imageUrl,
				req.params.id,
			],
			function (err, result) {
				if (err) {
					console.log(err)
					res.status(400).json({ error: res.message });
					return;
				}
				res.json({
					message: 'success',
					data: post,
					changes: this.changes,
				});
			}
		);
	});

	app.delete('/api/posts/:id', (req, res) => {
		db.run('DELETE FROM posts WHERE id = ?', req.params.id, function (
			err,
			result
		) {
			if (err) {
				res.status(400).json({ error: res.message });
				return;
			}
			res.json({ message: 'deleted', changes: this.changes });
		});
	});

	app.get((request, response) => {
		response.status(404);
	});
};
