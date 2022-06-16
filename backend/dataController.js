import dataService from "./services/dataService.js"

// контроллер сервера
class DataController {

    // запрос на отправку всех данных из таблицы бд
    async getAllData(req, res) {
        try {
            const data = await dataService.getData()
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new DataController()
