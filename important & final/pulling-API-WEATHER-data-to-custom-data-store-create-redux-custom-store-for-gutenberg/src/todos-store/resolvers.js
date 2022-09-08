import { fetchTodos } from './controls';
import { populateTodos } from './actions';

export function* getForcast() {
	const todos = yield fetchTodos();
	return populateTodos(todos);
}
