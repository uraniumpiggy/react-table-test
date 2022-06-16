import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App';
import axios from 'axios'

describe('APP TEST', () => {
  let response

  beforeEach(() => {
    response = {
      status: 200,
      data: [
        {
          date_col:"2012-09-20T20:00:00.000Z",
          name_col:"Название 1",
          amount_col:77335,
          distance_col:73322.56361669478
        },
        {
          date_col:"2013-08-26T20:00:00.000Z",
          name_col:"Название 2",
          amount_col:54658,
          distance_col:52210.630766389855
        },
        {
          date_col:"2013-08-21T20:00:00.000Z",
          name_col:"Название 3",
          amount_col:60173,
          distance_col:75035.21974337555
        },
        {
          date_col:"2020-06-11T21:00:00.000Z",
          name_col:"Название 4",
          amount_col:48947,
          distance_col:34502.93447057913
        }
      ]
    }
  })

  test('should render', () => {
    const {container} = render(<App />)
    const containerElement = container.querySelector('.container')
    expect(containerElement).toBeInTheDocument()
  })

  test('should throw api error', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({}))
    render(<App />)
    const errorElement = await screen.findByText(/Ошибка загрузки данных/i)
    expect(errorElement).toBeInTheDocument()
  })

  test('should render table', async () => {
    jest.spyOn(axios, 'get').mockReturnValue(response)
    render(<App />)
    const rows = await screen.findAllByText(/название \d/i)
    expect(rows.length).toBe(4)
  })

  test('should sort by amount', async () => {
    jest.spyOn(axios, 'get').mockReturnValue(response)
    const {container} = render(<App />)
    let rowAmounts = await screen.findAllByText(/название \d/i)
    expect(rowAmounts[0]).toBeInTheDocument()

    const amountHeader = screen.getByTestId('amount-header')
    expect(amountHeader).toBeInTheDocument()

    userEvent.click(amountHeader)
    rowAmounts = await screen.findAllByText(/название \d/i)
    const rowAmountsSum = rowAmounts.map((value) => value.innerHTML).join()
    expect(rowAmountsSum).toBe("Название 4,Название 2,Название 3,Название 1")
  })
});
