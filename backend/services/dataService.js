import dataAccessLayer from "../dataAccessLayer.js";

// сервис бизнес логики
class DataService {

    // подключение к бд и заполнение таблицы
    async prepareDatabase() {
        try {
            await dataAccessLayer.connect()
            await dataAccessLayer.createTable()
            await dataAccessLayer.fillTable()
        } catch (error) {
            console.error(error.message)
        }
    }

    // получение всех данных таблицы
    async getData() {
        try {
            return await dataAccessLayer.getAllData()
        } catch (error) {
            console.error(error.message)
        }
    }
}

export default new DataService()