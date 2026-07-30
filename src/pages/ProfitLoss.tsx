import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Button } from '@mui/material'
import { useStore } from '../store/useStore'
import { ticketRevenue, tipsRevenue, privateRevenue, corporateRevenue, airbnbRevenue, merchandiseRevenue, giftCardRevenue, monthlyCOGS, grossProfit, operatingExpenses, netProfit, totalRevenue } from '../utils/calculations'

function exportCSV(data:string, filename='pl.csv'){
  const blob = new Blob([data], {type:'text/csv'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

export default function ProfitLoss(){
  const active = useStore(s => s.active)
  const a = useStore(s => s.scenarios[active])

  const rows = [
    ['Ticket Sales', ticketRevenue(a)],
    ['Tips', tipsRevenue(a)],
    ['Private Events', privateRevenue(a)],
    ['Corporate Events', corporateRevenue(a)],
    ['Airbnb Events', airbnbRevenue(a)],
    ['Merchandise', merchandiseRevenue(a)],
    ['Gift Cards', giftCardRevenue(a)],
  ]

  const cogs = monthlyCOGS(a)
  const revenue = totalRevenue(a)
  const gp = grossProfit(a)
  const opex = operatingExpenses(a)
  const np = netProfit(a)

  const csv = [
    ['Line Item','Amount'],
    ...rows.map(r=> [r[0], String(r[1])]),
    ['COGS', String(cogs)],
    ['Gross Profit', String(gp)],
    ['Operating Expenses', String(opex)],
    ['Net Profit', String(np)],
  ].map(r=> r.join(',')).join('\n')

  return (
    <div>
      <Typography variant="h4" gutterBottom>Profit & Loss — {active}</Typography>
      <Button variant="outlined" sx={{mb:2}} onClick={()=>exportCSV(csv)}>Export CSV</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Line Item</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(r=> (
            <TableRow key={String(r[0])}><TableCell>{r[0]}</TableCell><TableCell align="right">${Number(r[1]).toFixed(2)}</TableCell></TableRow>
          ))}

          <TableRow><TableCell>COGS</TableCell><TableCell align="right">${cogs.toFixed(2)}</TableCell></TableRow>
          <TableRow><TableCell>Gross Profit</TableCell><TableCell align="right">${gp.toFixed(2)}</TableCell></TableRow>
          <TableRow><TableCell>Operating Expenses</TableCell><TableCell align="right">${opex.toFixed(2)}</TableCell></TableRow>
          <TableRow><TableCell><strong>Net Profit</strong></TableCell><TableCell align="right"><strong>${np.toFixed(2)}</strong></TableCell></TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
