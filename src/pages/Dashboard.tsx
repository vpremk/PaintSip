import React from 'react'
import { Card, CardContent, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { useStore } from '../store/useStore'
import { totalRevenue, monthlyCOGS, grossProfit, operatingExpenses, netProfit, breakEvenMonths, roiPercent, totalInvestment, sumValues } from '../utils/calculations'

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
  const investment = totalInvestment(assumptions)
  const eventsPM = assumptions.revenue.eventsPerWeek * assumptions.revenue.weeksPerMonth
  const revenuePerEvent = revenue / Math.max(1, eventsPM)

  const cogsPerEvent = sumValues(assumptions.cogs)
  const fixedTotal = sumValues(assumptions.fixed)

  const summaryRows = [
    {
      label: 'Revenue',
      value: revenue,
      formula: `${assumptions.revenue.eventsPerWeek} × ${assumptions.revenue.weeksPerMonth} × ${assumptions.revenue.guestsPerEvent} × $${assumptions.revenue.ticketPrice} = ${formatCurrency(revenue)}`,
    },
    {
      label: 'COGS',
      value: -cogs,
      formula: `${formatCurrency(cogsPerEvent)} total COGS per event`,
    },
    {
      label: 'Fixed Expenses',
      value: -opex,
      formula: `${formatCurrency(fixedTotal)} total monthly fixed costs`,
    },
    {
      label: 'Purchase',
      value: investment,
      formula: `$${assumptions.purchase.purchasePrice} + $${assumptions.purchase.transferFee} + $${assumptions.purchase.refreshCost} = ${formatCurrency(investment)}`,
    },
    {
      label: 'Estimated Net Operating Profit',
      value: np,
      formula: `${formatCurrency(np)} total net operating profit`,
    },
  ]

  return (
    <div>
      <Typography variant="h4" gutterBottom>Dashboard — {active}</Typography>
      
      <Card sx={{mb:3}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Assumptions Summary</Typography>
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
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{row.formula}</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ color: row.value >= 0 ? 'success.main' : 'text.primary', fontWeight: row.label === 'Estimated Net Operating Profit' ? 700 : 400 }}>
                    {row.value >= 0 ? '+' : '-'}{formatCurrency(Math.abs(row.value))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
