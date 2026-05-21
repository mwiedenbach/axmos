/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2025 Max Wiedenbach <max.wiedenbach@icloud.com>, All rights reserved.
 *  Licensed under the MIT. See LICENSE.txt for details.
 *--------------------------------------------------------------------------------------------*/

import path from 'node:path';
import fs from 'fs';
import os from 'os';

import println from '../utils/println';
import { newError } from '../errorHandling';
import { exportInMarkDown } from './export.service';
import { importMarkDown } from './import.service';

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

export let todoList: string = path.join(os.homedir(), 'todos.json');

!fs.existsSync(todoList) && fs.writeFileSync(todoList, '');

export const saveTodos = (todo: Todo[]): void => {
  fs.writeFileSync(todoList, JSON.stringify(todo, null, 2), 'utf-8');
};

export const loadTodos = (): Todo[] => {
  try {
    if (!fs.existsSync(todoList)) return [];

    const content = fs.readFileSync(todoList, 'utf-8').trim();

    if (!content) return [];

    const parsed: Todo[] = JSON.parse(content);
    return parsed;
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    println(err.message);
    return [];
  }
};

let todos: Todo[] = loadTodos();

const listTodo = () => {
  println('\n--- MY TODOS ---');

  let todosFromFile: Todo[] = JSON.parse(fs.readFileSync(todoList, 'utf-8'));

  if (todos.length === 0) println('List is empty.');

  todos.forEach((t) => {
    const status = t.completed ? '[x]' : '[ ]';
    println(`${t.id}. ${status} ${t.name}`);
  });
  println('');
};

const createTodo = (args: string[] | undefined) => {
  if (!args || args.length === 0) return;

  const newTodo: Todo = {
    id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
    name: args.join(' '),
    completed: false,
  };

  todos.push(newTodo);

  saveTodos(todos);

  println(`Added: "${newTodo.name}"`);
  listTodo();
};

const deleteTodo = (args: string[] | undefined) => {
  if (!args) return;
  const id = parseInt(args[0]);

  if (isNaN(id)) {
    newError('OPERATION', `${args[0]} is not a valid number.`);
    return;
  }

  todos = todos.filter((t) => t.id !== id);

  saveTodos(todos);

  println(`ID ${id} removed.`);
  listTodo();
};

const checkTodo = (args: string[] | undefined) => {
  if (!args || args.length === 0) return;
  const id = parseInt(args[0]);

  if (isNaN(id)) {
    newError('OPERATION', `${args[0]} is not a valid number.`);
    return;
  }

  todos = todos.map((t) => (t.id === id ? { ...t, completed: true } : t));

  saveTodos(todos);
  println(`Todo ${id} done`);
  listTodo();
};

const uncheckTodo = (args: string[] | undefined) => {
  if (!args || args.length === 0) return;
  const id = parseInt(args[0]);

  if (isNaN(id)) {
    newError('OPERATION', `${args[0]} is not a valid number.`);
    return;
  }

  todos = todos.map((t) => (t.id === id ? { ...t, completed: false } : t));

  saveTodos(todos);
  println(`Todo ${id} reopened.`);
  listTodo();
};


const todoService = {
  create: createTodo,
  check: checkTodo,
  delete: deleteTodo,
  uncheck: uncheckTodo,
  list: listTodo,
    export: exportInMarkDown,
	import: importMarkDown
};

export default todoService;
