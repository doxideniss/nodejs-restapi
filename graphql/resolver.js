const Todo = require('../models/todo')

module.exports = {
	async getTodos() {
		try {
			return await Todo.findAll()
		} catch (error) {
			throw new Error('Fetch todos is not available')
		}
	},
	async createTodo({ todo }) {
		try {
			return await Todo.create({
				title: todo.title,
				done: false
			})

		} catch (error) {
			throw new Error('Err')
		}
	},
	async completeTodo({ id }) {
		try {
			const todo = await Todo.findByPk(id)
			todo.done = true
			await todo.save()
			return todo
		} catch (error) {
			throw new Error('Err')
		}
	},
	async removeTodo({ id }) {
		try {
			const todos = await Todo.findAll({
				where: {id}
			})
			await todos[0].destroy()
			return true
		} catch (error) {
			throw new Error('err')
			return false
		}
	}
}