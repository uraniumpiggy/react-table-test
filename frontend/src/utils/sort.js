// сортировка данных таблицы
const sort = (array, column, direction) => {

    if (column < 1 || column > 3 || array.length === 0 || array === undefined) {
        return array
    }

    // получение ключей объяектов таблицы
    const keys = Object.keys(array[0])

    // сортировка с учетом колонки таблицы (column)
    // и направления сортировки (direction)
    return array.sort((a, b) => {
        if (a[keys[column]] > b[keys[column]]) {
            return direction
        } else if (a[keys[column]] < b[keys[column]]) {
            return -direction
        }  else {
            return 0
        }
    })
    
}

export default sort