import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
//import { DateTime } from "luxon";
import dayjs from 'dayjs';
import { Box } from '@mui/material';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useRewardsData } from '../lib/useRewardsData';

import { useContext } from "react";
import { AppContext } from "../context/ContextProvider";

export function RewardsTable() {

  const columns = useMemo(() => {
    return [
      {
        header: 'DateTime',
        accessorKey: 'updatedTime',
        enableGrouping: false, //do not let this column be grouped
      },
      {
        header: 'Month',
        accessorKey: 'month',
      },     
      {
        header: 'Day',
        accessorKey: 'day',
      },
      {
        header: 'Hour',
        accessorKey: 'hour',
      },
      {
        header: 'Value',
        accessorKey: 'value',
      },
      {
        header: 'Gain',
        accessorKey: 'gain',
        aggregationFn: 'sum',
        //required to render an aggregated cell, show the average salary in the group
        AggregatedCell: ({ cell, table }) => (
          <>
            Sum by{' '}
            {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell.getValue()?.toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'PHA',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Box>
          </>
        ),
      },
    ];
  }, []);

  let nodes;
  const { account, poolId, setStartDate, setEndDate } = useContext(AppContext);
  const { data } = useRewardsData(account, poolId);
  let start_date = dayjs()
  let end_date = dayjs()
  
  if (
    data !== undefined 
    && data.delegationSnapshots !== undefined
    && data.delegationSnapshots[0] !== undefined
    && data.delegationSnapshots[0].delegation !== undefined
  ) {
    nodes = data.delegationSnapshots[0].delegation.snapshots
    console.log("NODESSSSSSS",dayjs().format("SSS"),nodes)
    let prev_value = nodes[0].value
    let prev_cost = nodes[0].cost
    start_date = dayjs(nodes[0].updatedTime)
    //setStartDate(start_date)
    end_date = dayjs(nodes[nodes.length-1].updatedTime)
    //setEndDate(end_date)
  
    nodes.forEach(element => {
      element.costdiff =  Math.round((element.cost - prev_cost) * 10000) / 10000
      element.gain = (Math.round((element.value - prev_value) * 10000) / 10000) - element.costdiff
      prev_value = element.value
      prev_cost = element.cost
      element.month = dayjs(element.updatedTime).format('MM - MMMM');
      element.day = dayjs(element.updatedTime).format('DD');
      element.hour = dayjs(element.updatedTime).format('hh:mm');
  });
  }
  if (nodes !== undefined) {
  return (<> 
    <MaterialReactTable
        columns={columns}
        data={nodes}
        enableColumnResizing
        enableGrouping
        enablePagination={false}
        initialState={{
          density: 'compact',
          expanded: false, //expand all groups by default
          grouping: ['month','day'], //an array of columns to group by by default (can be multiple)
          //pagination: { pageIndex: 0, pageSize: 100 },
          //sorting: [{ id: 'state', desc: false }], //sort by state by default
        }}
      />
      </>
  );
  } else {
    return <>Saisir une adresse...</>
  }
}
