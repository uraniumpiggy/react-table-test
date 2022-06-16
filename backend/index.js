import express from 'express'
import cors from 'cors'
import router from './router.js'
import dataService from './services/dataService.js'
import config from 'config'

const PORT = config.get("PORT")

const app = express()

// подключаем cors и определяем эндпоинты
app.use(cors())
app.use('/api', router)

const startApp = async () => {
    try {
        dataService.prepareDatabase()
        app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()
