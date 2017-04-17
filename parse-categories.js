const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const categoryZoom = process.argv[3];

const encoding = 'utf-8';

getFiles(dir)
.then(getPosts)
.then(getStats)
.then(printStats)
.catch(printErr);

function getFiles(dir) {
	return new Promise((resolve, reject)=> {
		fs.readdir(dir, (err, files)=> {
			if (err) {
				reject(err);
			} else {
				resolve(files);
			}
		});
	});
}

function getPosts(files) {
	return Promise.all(files.map(getPost));

	function getPost(file) {
		return new Promise((resolve, reject)=> {
			fs.readFile(path.join(dir, file), {encoding}, (err, data)=> {
				if (err) {
					reject(err);
				} else {
					resolve({ 
						name: file,
						content: data
					});
				}
			});
		});
	}
}

function getStats(posts) {
	const postCount = posts.length;
	const postData = posts.map(post => ({
		name: post.name,
		categories: getFrontMatter(post).categories
	}));
	const categoryAnalysis = postData.reduce((acc, post)=> {
		const postCategories = Array.isArray(post.categories) ? post.categories : [post.categories];
		postCategories.forEach(category => {
			if (!acc[category]) {
				acc[category] = {count: 0, posts: []};
			}
			acc[category].count++;
			acc[category].posts.push(post.name);
		});
		return acc;
	}, {});

	return {
		postCount,
		categoryAnalysis
	};
}

function getFrontMatter(post) {
	// regex hell
	const data = post.content.split('---')[1];
	const linebreaks = new RegExp(/\r\n?|\n/g); // needed for cross-platform compat
	const lines = data.split(linebreaks).filter(s => s.length);
	const entries = lines.map(getEntry);
	return entries.map(parseEntry).reduce((acc, entry)=> {
		acc[entry.key] = entry.value;
		return acc;
	}, {});

	function getEntry(line) {
		const separator = line.indexOf(':');
		const keyRaw = line.slice(0, separator);
		const valRaw = line.slice(separator + 1);
		return [keyRaw, valRaw].map(s => s.trim());
	}

	function parseEntry(entry) {
		const key = entry[0];
		const isArrayValue = /^\[.*\]$/g.test(entry[1]);
		const arrayBody = isArrayValue ? 
			entry[1]
			.split(/[\[\]]/g)[1] // between brackets
			.split(',') // array items
			.map(s => s.trim()) 
		: null;
		
		const value = arrayBody ? arrayBody : entry[1];
		return {key, value};
	}
}


function printStats(stats) {
	if (!categoryZoom) {
		console.log(`Analysing all categories from ${stats.postCount} posts`);
		Object.keys(stats.categoryAnalysis).forEach(key => {
			console.log(`${key} -- ${stats.categoryAnalysis[key].posts.length} files`);
		});
	} else {
		console.log(`Finding posts with category ${categoryZoom}`);
		console.log(stats.categoryAnalysis[categoryZoom].posts);
	}
}

function printErr(e) {
	console.log('Error:', e);
}
