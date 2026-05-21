/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 *  Licensed under the MIT. See LICENSE.txt for details.
 *--------------------------------------------------------------------------------------------*/

import path from 'node:path';
import fs from 'fs';
import os from 'os';

import println from '../utils/println';

import { loadTodos, saveTodos, Todo } from './todos.service';


export const importMarkDown = (args: string[]): void => {
	if (!args || args.length === 0) {
		println("Please provide a file path.");
		return;
	}

	const filePath: string = args[0];

	if (!fs.existsSync(filePath)) {
		println(`File ${filePath} does not exist.`);
		return;
	}

	let checked: boolean = false;
	let name: string = "";
	let todos: Todo[] = loadTodos();

	const content: string = fs.readFileSync(filePath, "utf-8");

	const lines: string[] = content.split("\n").slice(1);

	lines.forEach((line) => {
		if (line.trim() === "" || line.includes("File was generated via axmos")) return;

		const match = line.match(/^\s*-\s*\[( |X|x)\]\s*(.+)$/);

		if (match) {
			checked = match[1].toLowerCase() === "x";
			name = match[2].trim();

			const newTodo: Todo = {
				id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
				name,
				completed: checked,
			};

			todos.push(newTodo);
		}
	});

	console.log(todos);

	saveTodos(todos);
	println("Import successful.");

}