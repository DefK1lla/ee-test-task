import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
  useGridApiRef,
} from '@mui/x-data-grid'
import axios from 'axios'
import { useEffect, useState } from 'react'

import s from './countriesDataGrid.module.scss'
import { useGirdPersist } from '../../hooks/useGridPersist'

import cn from 'classnames'
import { Modal } from '@mui/material'

interface Country {
  abbreviation: string
  capital: string
  id: number
  currency: string
  media: {
    flag: string
    emblem: string
    orthographic: string
  }
  name: string
  phone: string
  population: number
}

const CountriesDataGrid = () => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      cellClassName: s.id,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'capital',
      headerName: 'Capital',
      width: 150,
      valueGetter: (params: GridValueGetterParams<Country>) =>
        !!params.row.capital ? params.row.capital : 'No data',
    },
    {
      field: 'emblem',
      headerName: 'Emblem',
      sortable: false,
      width: 150,
      valueGetter: (params: GridValueGetterParams<Country>) =>
        params.row.media.emblem,
      renderCell: (params: GridRenderCellParams<Country>) => (
        <img
          className={s.media}
          src={params.value}
          alt={`${params.row.name} emblem`}
        />
      ),
      cellClassName: s.mediaWrapper,
    },
    {
      field: 'flag',
      headerName: 'Flag',
      sortable: false,
      width: 150,
      valueGetter: (params: GridValueGetterParams<Country>) =>
        params.row.media.flag,
      renderCell: (params: GridRenderCellParams<Country>) => (
        <img
          onClick={() => setSelectedImg(params.value)}
          className={cn(s.media, s.flag)}
          src={params.value}
          alt={`${params.row.name} flag`}
        />
      ),
      cellClassName: s.mediaWrapper,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 80,
    },
    {
      field: 'population',
      headerName: 'Population',
      width: 150,
      cellClassName: s.population,
    },
  ]

  const [countries, setCountries] = useState<Country[]>([])
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  const apiRef = useGridApiRef()

  useGirdPersist(apiRef, 'countries_grid_state')

  useEffect(() => {
    axios
      .get<Country[][]>(
        'https://api.sampleapis.com/countries/countries'
      )
      .then(res => setCountries(res.data.flat()))
  }, [])

  return (
    <>
      {columns.length > 0 ? (
        <>
          <DataGrid
            rows={countries}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            apiRef={apiRef}
          />

          <Modal open={!!selectedImg}>
            <div
              className={s.modalContainer}
              onClick={() => setSelectedImg(null)}
            >
              <img src={selectedImg!} alt='' />
            </div>
          </Modal>
        </>
      ) : (
        'Error'
      )}
    </>
  )
}

export default CountriesDataGrid
