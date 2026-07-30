import React from 'react'
import { Card, CardContent, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { useStore } from '../store/useStore'
import { totalRevenue, monthlyCOGS, grossProfit, operatingExpenses, netProfit, breakEvenMonths, roiPercent } from '../utils/calculations'

function KPI({label, value, green=true}:{label:string,value:string|number,green?:boolean}){
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography variant="h6" color={green? 'success.main':'error.main'}>{value}</Typography>
      </CardContent>
    </Card>
  )
}

function formatCurrency(value:number){
  return new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits: 0 }).format(value)
}

export default function Dashboard(){
  const active = useStore(s => s.active)
  const assumptions = useStore(s => s.scenarios[active])

  const revenue = totalRevenue(assumptions)
  const cogs = monthlyCOGS(assumptions)
  const gp = grossProfit(assumptions)
  const opex = operatingExpenses(assumptions)
  const np = netProfit(assumptions)
  const be = breakEvenMonths(assumptions)
  const roi = roiPercent(assumptions)
  const eventsPM = assumptions.revenue.eventsPerWeek * assumptions.revenue.weeksPerMonth
  const revenuePerEvent = revenue / Math.max(1, eventsPM)

  const summaryRows = [
    { label: 'Total Revenue', value: 22600 },
    { label: 'Less COGS', value: -4700 },
    { label: 'Gross Profit', value: 17900 },
    { label: 'Venue Costs', value: -4250 },
    { label: 'Payroll', value: -8600 },
    { label: 'Technology', value: -1008 },
    { label: 'Insurance & Legal', value: -600 },
    { label: 'Office Expenses', value: -315 },
    { label: 'Transportation', value: -350 },
    { label: 'Equipment Reserve', value: -125 },
    { label: 'Miscellaneous', value: -255 },
    { label: 'Estimated Net Operating Profit', value: 2400 },
  ]

  return (
    <div>
      <Typography variant="h4" gutterBottom>Dashboard — {active}</Typography>
      
      {/* Assumptions Summary */}
      <Card sx={{mb:3}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Summary</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Monthly</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summaryRows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell>{row.label}</TableCell>
                  <TableCell align="right" sx={{ color: row.value >= 0 ? 'success.main' : 'text.primary', fontWeight: row.label === 'Estimated Net Operating Profit' ? 700 : 400 }}>
                    {row.value >= 0 ? '+' : '-'}{formatCurrency(Math.abs(row.value))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* KPIs */}
      <Grid container spacing={2}>  <Grid item xs={12} sm={6} md={3}><KPI label="Monthly Revenue" value={`$${revenue.toFixed(0)}`} green={revenue>0} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KPI label="Monthly Expenses" value={`$${(cogs+opex).toFixed(0)}`} green={(cogs+opex)<=revenue} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KPI label="Gross Profit" value={`$${gp.toFixed(0)}`} green={gp>0} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KPI label="Net Profit" value={`$${np.toFixed(0)}`} green={np>0} /></Grid>

        <Grid item xs={12} sm={6} md={3}><KPI label="Profit Margin" value={`${(np/revenue*100 || 0).toFixed(1)}%`} green={(np/revenue)>0} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KPI label="Break-even (months)" value={isFinite(be)? be.toFixed(1): 'N/A'} green={be!==Infinity && be<36} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KPI label="ROI %" value={isFinite(roi)? roi.toFixed(1)+'%':'N/A'} green={roi>0} /></Grid>
        <Grid item xs={12} sm={6} md={3}><KPI label="Revenue per Event" value={`$${revenuePerEvent.toFixed(0)}`} green={revenuePerEvent>0} /></Grid>
      </Grid>
    </div>
  )
}
