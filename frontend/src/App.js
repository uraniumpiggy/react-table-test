import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { getData } from './api/getData';
import PaginationBar from './components/PaginationBar/PaginationBar';
import FiltrationBar from './components/FiltrationBar/FiltrationBar';
import Table from './components/Table/Table';
import filter from './utils/filter';
import sort from './utils/sort';

function App() {
  const [serverData, setServerData] = useState([])
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [pageLength, setPageLength] = useState(5)
  const [fetchingError, setFetchingError] = useState(false)

  // выполняем запрос к серверу
  useEffect(() => {
    getData().then(res => {
      if (res.status === 200) {
        setServerData(res.data)
      } else {
        setFetchingError(true)
      }
    })
  }, [])

  // обновляем данные таблицы при получении данных с сервера
  useEffect(() => {
    setData(serverData)
  }, [serverData])

  // выполнение фильтрации данных таблицы в соответствии с параметрами
  const handleFiltration = useCallback((column, condition, filterValue) => {
    const newData = filter([...serverData], column, condition, filterValue)
    setData([...newData])
  }, [])

  // сортировка в соответствии с колонкой и направлением сортировки
  // 1 - по возростанию, -1 - по убыванию, 0 - возвращение изначальных значений 
  const handleSorting = (column, direction) => {
    if (direction === 0) {
      setData([...serverData])
      return
    }
		const newData = sort([...serverData], column, direction)
		setData([...newData])
	}

  return (
    <div className='d-flex flex-column align-items-center p-4'>
      <div className='container'>
        {fetchingError ? 
          <div className='p-3 mb-2 bg-danger text-white'>Ошибка загрузки данных</div> :
          <>
            <Table
              data={data.slice(pageLength * (page - 1), pageLength * page)} 
              sorting={handleSorting}
            />
            <PaginationBar 
              dataLength={data.length} 
              pageLength={pageLength}
              currentPage={page}
              setPage={setPage}
              setPageLength={setPageLength}
            />
            <FiltrationBar handleFiltration={handleFiltration}/>
          </>

        }
      </div>
    </div>
  );
}

export default App;
