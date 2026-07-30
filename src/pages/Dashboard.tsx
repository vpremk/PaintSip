import React from 'react'
import { Card, CardContent, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { useStore } from '../store/useStore'
import { totalRevenue, monthlyCOGS, grossProfit, operatingExpenses, netProfit, breakEvenMonths, roiPercent, eventsPerMonth } from '../utils/calculations'

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

  return (
    <div>
      <Typography variant="h4" gutterBottom>Dashboard — {active}</Typography>
      
      {/* Assumptions Summary */}
      <Card sx={{mb:3}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Key Assumptions</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2">Revenue</Typography>
              <Typography>${assumptions.revenue.ticketPrice}/ticket</Typography>
              <Typography>{assumptions.revenue.guestsPerEvent} guests/event</Typography>
              <Typography>{eventsPerMonth(assumptions)} events/month</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2">COGS per Guest</Typography>
              <Typography>${(Object.values(assumptions.cogs).reduce((s,v)=>s+v,0)).toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2">Fixed Expenses</Typography>
              <Typography>${(Object.values(assumptions.fixed).reduce((s,v)=>s+v,0)).toFixed(0)}/month</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2">Total Investment</Typography>
              <Typography>${(assumptions.purchase.purchasePrice + assumptions.purchase.transferFee + assumptions.purchase.refreshCost).toFixed(0)}</Typography>
            </Grid>
          </Grid>
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
