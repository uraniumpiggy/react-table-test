import pg from 'pg'
import config from 'config'

// класс для взаимодействия с базой данных
class DataAccessLayer {
    tableName = 'data_table'
    client = null

    // подключение к базе данных
    async connect() {
        this.client = new pg.Client({
            user: config.get("DBUSER"),
            host: config.get("DBHOST"),
            database: config.get("DATABASE"),
            password: config.get("DBPASS"),
            port: config.get("DBPORT"),
        })
        await this.client.connect()
    }

    // создание таблицы
    async createTable() {
        const createTableText = `
            CREATE TABLE IF NOT EXISTS ${this.tableName}(
            date_col DATE,
            name_col varchar(255),
            amount_col integer,
            distance_col double precision 
        );`
        if (this.client) {
            await this.client.query(createTableText)
        } else {
            console.log('cringe')
        }
    }

    // заполнение таблицы рандомными значениями
    async fillTable() {
        const rows = 500
        const insertText = `INSERT INTO ${this.tableName}(date_col, name_col, amount_col, distance_col) VALUES ($1, $2, $3, $4)`
        for (let i = 0; i < rows; i++) {
            const startDate = new Date(2012, 0, 1)
            const endDate = new Date()
            const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
            const name = 'Название ' + (i + 1)
            const amount = Math.floor(Math.random() * 100000)
            const distance = Math.random() * 100000
            await this.client.query(
                insertText,
                [date, name, amount, distance]
            )
        }
        console.log('Table filled')
    }

    // получение данных из таблицы
    async getAllData() {
        const result = await this.client.query(`SELECT * FROM ${this.tableName}`)
        return result.rows
    }
}

export default new DataAccessLayer()