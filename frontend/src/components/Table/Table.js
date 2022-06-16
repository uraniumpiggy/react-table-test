import React, { useState } from 'react';
import TableRow from '../TableRow/TableRow';
import './Table.css'

const Table = ({data, sorting}) => {
	const [sortingData, setSortingData] = useState({
		direction: 0,
		column: -1,
	})

	// обработка параметров сортировки (колонка и направление)
	const handleSorting = (column) => {

		// случай если сортировка выбрана в первый раз
		// или до этого сортировался другой столбец
		if (sortingData.column === -1 || sortingData.column !== column) {
			// сортируем по возрастанию
			sorting(column, 1)
			// задаем текущую колонку и направление сортировки
			setSortingData({
				column: column,
				direction: 1,
			})
		}
		// до этого сортировался этот же столбец
		else if (sortingData.column === column) {
			
			// направление сортировки переключается в соответствии с правилом
			// по возрастанию -> по убыванию -> изначальное расположение элементов (1 -> -1 -> 0 -> 1...)
			const newDirection = sortingData.direction < 1 ? sortingData.direction + 1 : -1
			sorting(column, newDirection)

			const newData = {...sortingData}
			newData.direction = newDirection
			setSortingData(newData)
		}
	}

	return (
		<table className='table table-striped'>
			<thead>
				<tr>
					<th>Дата</th>
					<th onClick={() => handleSorting(1)}>
						Название 
					</th>
					<th data-testId="amount-header" onClick={() => handleSorting(2)}>
						Количество
					</th>
					<th onClick={() => handleSorting(3)}>
						Расстояние
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((value, index) => <TableRow rowItems={value} key={index}/>)}
			</tbody>
		</table>
	);
}
 
export default Table;