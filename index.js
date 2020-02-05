const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')
const graphqlHTTP = require('express-graphql')
const schema = require('./graphql/schema')
const rootValue = require('./graphql/resolver')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use(graphqlHTTP({
	schema,
	rootValue,
	graphiql: true
}))

app.use((req, res, next) => {
	res.sendFile('/index.html')
})

async function start(params) {
	try {
		await sequelize.sync()
		app.listen(PORT)
	} catch (error) {
		console.log(error);
	}	
}
start()