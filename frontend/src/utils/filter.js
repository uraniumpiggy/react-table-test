const filter = (arr, sortableColumn, condition, filterValue) => {
  
  if (arr.length === 0 || arr === undefined) {
    return []
  }

  for (let i = 0; i < arr.length; i++) {

    // sortableColumn === 0 - Дата
    // sortableColumn === 1 - Название
    // sortableColumn === 2 - Количество
    // sortableColumn === 3 - Расстояние
    switch (condition) {
      case 'равно':
        // фильтрация по равенству в зависимости от фильтруемой колонки
        return arr.filter(value => {
          if (sortableColumn === 0 && value.date_col.split('T')[0] === filterValue) {
            return true
          } else if (sortableColumn === 1 && value.name_col === filterValue) {
            return true
          } else if (sortableColumn === 2 && value.amount_col === parseInt(filterValue)) {
            return true
          } else if (sortableColumn === 3 && value.distance_col === parseFloat(filterValue)) {
            return true
          } else {
            return false
          }
        })

      case 'содержит':
        // фильтрация по вхождению значения filterValue в фильтруемую колонки
        return arr.filter(value => {
          if (sortableColumn === 0 && value.date_col.split('T')[0].includes(filterValue)) {
            return true
          } else if (sortableColumn === 1 && value.name_col.includes(filterValue)) {
            return true
          } else if (sortableColumn === 2 && value.amount_col.toString().includes(filterValue)) {
            return true
          } else if (sortableColumn === 3 && value.distance_col.toString().includes(filterValue)) {
            return true
          } else {
            return false
          }
        })

      case 'больше':
        // поиск элементов бОльших чем filterValue в фильтруемой колонке 
        return arr.filter(value => {
          if (sortableColumn === 0 && new Date(value.date_col) > Date.parse(filterValue)) {
            return true
          } else if (sortableColumn === 1 && value.name_col > filterValue) {
            return true
          } else if (sortableColumn === 2 && value.amount_col > parseInt(filterValue)) {
            return true
          } else if (sortableColumn === 3 && value.distance_col > parseFloat(filterValue)) {
            return true
          } else {
            return false
          }
        })

      case 'меньше':
        // поиск элементов меньших чем filterValue в фильтруемой колонке
        return arr.filter(value => {
          if (sortableColumn === 0 && new Date(value.date_col) < Date.parse(filterValue)) {
            return true
          } else if (sortableColumn === 1 && value.name_col < filterValue) {
            return true
          } else if (sortableColumn === 2 && value.amount_col < parseInt(filterValue)) {
            return true
          } else if (sortableColumn === 3 && value.distance_col < parseFloat(filterValue)) {
            return true
          } else {
            return false
          }
        })
      
      default:
        return arr
    }
  }
}

export default filter
