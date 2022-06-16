import axios from 'axios'

const URL = 'http://localhost:5000/api/'

// получение данных таблицы с сервера
export const getData = async () => {
    try {
        return await axios.get(URL)
    } catch (error) {
        return false
    }
}