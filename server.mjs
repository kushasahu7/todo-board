#!/usr/bin/env node
// todo-board — a zero-dependency, read-only board for a Markdown TODO file.
// The Markdown file stays the single source of truth; the board never writes to it.
//
// Usage:
//   node server.mjs [path/to/TODO.md]     # or set TODO_FILE / PORT
//   PORT=5000 node server.mjs ~/notes/TODO.md
//
// With no path it serves the bundled example/TODO.md so you can try it immediately.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4319;
const TODO_FILE = process.argv[2] ? resolve(process.argv[2])
  : process.env.TODO_FILE ? resolve(process.env.TODO_FILE)
  : join(__dirname, 'example', 'TODO.md');

const HTML = await readFile(join(__dirname, 'index.html'), 'utf8');

const server = createServer(async (req, res) => {
  try {
    if (req.url === '/' || req.url.startsWith('/?')) {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      return res.end(HTML);
    }
    if (req.url === '/api/todo') {
      const md = await readFile(TODO_FILE, 'utf8'); // fresh read on every request
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
      return res.end(md);
    }
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found');
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end('Error reading ' + TODO_FILE + '\n' + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`\n  todo-board  →  http://localhost:${PORT}`);
  console.log(`  Reading:  ${TODO_FILE}`);
  console.log(`  Edit the file, then refresh the browser.\n`);
});
