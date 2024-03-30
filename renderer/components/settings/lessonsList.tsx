'use client';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
  Textarea,
  Button,
  Divider,
} from '@nextui-org/react';
import {
  DataGridPremium,
  GridApiPro,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

const columns = [
  {
    id: 'id',
    label: 'Index',
  },
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'sunday',
    label: 'Sunday',
  },
  {
    id: 'monday',
    label: 'Monday',
  },
  {
    id: 'tuesday',
    label: 'Tuesday',
  },
  {
    id: 'wednesday',
    label: 'Wednesday',
  },
  {
    id: 'thursday',
    label: 'Thursday',
  },
  {
    id: 'friday',
    label: 'Friday',
  },
  {
    id: 'saturday',
    label: 'Saturday',
  },
];
function formattedRows(rows) {
  return rows.map((row, rowIndex) => {
    const formattedRow = { id: rowIndex, ...row };
    return formattedRow;
  });
}
const formattedColumns = columns.map(column => ({
  field: column.id,
  headerName: column.label,
  editable: true,
}));
async function getConfigSync(arg) {
  return new Promise((resolve, reject) => {
    window.ipc.send('get-config', arg);
    window.ipc.once('get-config/' + arg, data => {
      resolve(data);
    });
  });
}

export function LessonsListName() {
  const [rows, setRows] = useState([{}]) as any;
  useEffect(() => {
    (async () => {
      const data = await getConfigSync('lessonsList.name');
      data && setRows(data);
    })();
  }, []);
  return (
    <>
      <div className='*:mb-4'>
        <Table isStriped aria-label='Example table with dynamic content'>
          <TableHeader>
            {columns.map(column => (
              <TableColumn key={column.id}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columnKey => (
                  <TableCell
                    className={columnKey == 'id' ? '' : 'min-w-[14ch]'}
                  >
                    {columnKey == 'id' ? (
                      rowIndex + 1
                    ) : (
                      <textarea
                        className='resize-none !outline-0 !border-0 bg-[transparent] w-full h-full rounded-sm'
                        defaultValue={getKeyValue(row, columnKey)}
                        onInput={(e: any) => {
                          e.target.style.height = `auto`;
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        onChange={e => {
                          let new_rows = [...rows];
                          if (e.target.value) {
                            new_rows[rowIndex][columnKey] = e.target.value;
                          } else {
                            delete new_rows[rowIndex][columnKey];
                          }
                          let finished_delete = false;
                          for (let i = 0; i < new_rows.length; i++) {
                            const element = new_rows[new_rows.length - 1 - i];
                            if (!finished_delete) {
                              if (Object.keys(element).length == 0) {
                                new_rows[new_rows.length - 1 - i] = undefined;
                              } else {
                                finished_delete = true;
                              }
                            }
                          }
                          new_rows = new_rows.filter(
                            value => value != undefined
                          );
                          new_rows.push({});
                          // console.log(new_rows);
                          window.ipc.send(
                            'set-config',
                            'lessonsList.name',
                            new_rows
                          );
                          setRows(new_rows);
                        }}
                      />
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider></Divider>
        <CellSelectionGrid rows={rows}></CellSelectionGrid>
      </div>
    </>
  );
}
export function LessonsListTime() {
  const [rows, setRows] = useState([{}]) as any;
  const [weekStart, setWeekStart] = useState('') as any;
  useEffect(() => {
    (async () => {
      const data = await getConfigSync('lessonsList.time');
      data && setRows(data);
    })();
    (async () => {
      const data = await getConfigSync('lessonsList.weekStart');
      data && setWeekStart(data);
    })();
  }, []);
  return (
    <>
      <div className='*:mb-4'>
        <Input
          label='Week Start Time'
          className='max-w-xs'
          value={weekStart}
          onChange={e => {
            window.ipc.send(
              'set-config',
              'lessonsList.weekStart',
              e.target.value
            );
            setWeekStart(e.target.value);
          }}
        ></Input>
        <Table isStriped aria-label='Example table with dynamic content'>
          <TableHeader>
            {columns.map(column => (
              <TableColumn key={column.id}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columnKey => (
                  <TableCell
                    className={columnKey == 'id' ? '' : 'min-w-[20ch]'}
                  >
                    {columnKey == 'id' ? (
                      rowIndex + 1
                    ) : (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label='Start Time'
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                          }}
                          ampm={false}
                          className='resize-none !outline-0 !border-0 w-full h-full rounded-sm'
                          value={
                            getKeyValue(row, columnKey)
                              ? dayjs(
                                  '1970-1-1 ' +
                                    getKeyValue(row, columnKey).split('-')[0]
                                )
                              : null
                          }
                          onChange={e => {
                            const time = e.format('HH:mm');
                            let new_rows = [...rows];
                            if (time && time !== 'Invalid Date') {
                              if (
                                new_rows[rowIndex][columnKey] &&
                                new_rows[rowIndex][columnKey].split('-')[1]
                              ) {
                                new_rows[rowIndex][columnKey] =
                                  time +
                                  '-' +
                                  new_rows[rowIndex][columnKey].split('-')[1];
                              } else {
                                new_rows[rowIndex][columnKey] = time + '-';
                              }
                            } else {
                              delete new_rows[rowIndex][columnKey];
                            }
                            let finished_delete = false;
                            for (let i = 0; i < new_rows.length; i++) {
                              const element = new_rows[new_rows.length - 1 - i];
                              if (!finished_delete) {
                                if (Object.keys(element).length == 0) {
                                  new_rows[new_rows.length - 1 - i] = undefined;
                                } else {
                                  finished_delete = true;
                                }
                              }
                            }
                            new_rows = new_rows.filter(
                              value => value != undefined
                            );
                            new_rows.push({});
                            // console.log(new_rows);
                            window.ipc.send(
                              'set-config',
                              'lessonsList.time',
                              new_rows
                            );
                            setRows(new_rows);
                          }}
                        />
                        <TimePicker
                          label='End Time'
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                          }}
                          ampm={false}
                          className='resize-none !outline-0 !border-0 w-full h-full rounded-sm'
                          value={
                            getKeyValue(row, columnKey)
                              ? dayjs(
                                  '1970-1-1 ' +
                                    getKeyValue(row, columnKey).split('-')[1]
                                )
                              : null
                          }
                          onChange={e => {
                            const time = e.format('HH:mm');
                            let new_rows = [...rows];
                            if (time && time !== 'Invalid Date') {
                              if (
                                new_rows[rowIndex][columnKey] &&
                                new_rows[rowIndex][columnKey].split('-')[0]
                              ) {
                                new_rows[rowIndex][columnKey] =
                                  new_rows[rowIndex][columnKey].split('-')[0] +
                                  '-' +
                                  time;
                              } else {
                                new_rows[rowIndex][columnKey] = '-' + time;
                              }
                            } else {
                              delete new_rows[rowIndex][columnKey];
                            }
                            let finished_delete = false;
                            for (let i = 0; i < new_rows.length; i++) {
                              const element = new_rows[new_rows.length - 1 - i];
                              if (!finished_delete) {
                                if (Object.keys(element).length == 0) {
                                  new_rows[new_rows.length - 1 - i] = undefined;
                                } else {
                                  finished_delete = true;
                                }
                              }
                            }
                            new_rows = new_rows.filter(
                              value => value != undefined
                            );
                            new_rows.push({});
                            // console.log(new_rows);
                            window.ipc.send(
                              'set-config',
                              'lessonsList.time',
                              new_rows
                            );
                            setRows(new_rows);
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider></Divider>
        <CellSelectionGrid rows={rows}></CellSelectionGrid>
      </div>
    </>
  );
}
export function CellSelectionGrid(props) {
  const apiRef = useGridApiRef();
  const autosizeOptions = {
    includeHeaders: true,
    includeOutliers: true,
    expand: true,
  };
  return (
    <>
      <Button onClick={() => apiRef.current.autosizeColumns(autosizeOptions)}>
        AUTOWEIGHT
      </Button>
      <div style={{ width: '100%' }}>
        <div style={{ height: '90vh' }}>
          <DataGridPremium
            throttleRowsMs={2000}
            rowSelection={false}
            checkboxSelection={false}
            unstable_cellSelection
            disableColumnMenu={true}
            // sortingOrder={['asc']}
            rows={formattedRows(props.rows)}
            columns={formattedColumns}
            apiRef={apiRef}
            autosizeOptions={autosizeOptions}
            autosizeOnMount
          />
        </div>
      </div>
    </>
  );
}
