import React from 'react';

const PaginationBar = ({dataLength, pageLength, currentPage, setPage, setPageLength}) => {
  const totalPages = Math.ceil(dataLength / pageLength)

  // навигация на страницу таблицы
  const navigateToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setPage(page)
    }
  }

  return (
    <div className='d-flex align-items-center gap-5'>
      <div>
        <button
          type='button' 
          className='btn btn-primary m-2' 
          onClick={() => {navigateToPage(currentPage - 1)}}
        >
          <div className='arrow left'/>
        </button>
        <button 
          type='button' 
          className='btn btn-primary' 
          onClick={() => {navigateToPage(currentPage + 1)}}
        >
          <div className='arrow right'/>
        </button>
      </div>

      <div className='w-20 d-flex align-items-center gap-1'>
        <label htmlFor='select'>Показывать</label>
        <select className='form-select' id='select' onChange={e => {
          setPage(1)
          setPageLength(e.target.value)}
        }>
          <option value="5" defaultValue>5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>

      <div className='flex-grow-1 text-right'>Страница {currentPage} из {totalPages}</div>
    </div>
  );
}
 
export default React.memo(PaginationBar);