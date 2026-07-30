import React from 'react'
import { Typography, Card, CardContent, Grid } from '@mui/material'
import { useStore } from '../store/useStore'
import { totalInvestment, netProfit, roiPercent, breakEvenMonths } from '../utils/calculations'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function ROI(){
  const active = useStore(s => s.active)
  const a = useStore(s => s.scenarios[active])

  const investment = totalInvestment(a)
  const monthly = netProfit(a)
  const annual = monthly * 12
  const roi = roiPercent(a)
  const be = breakEvenMonths(a)

  const data = [
    { name: 'Investment', value: investment },
    { name: 'Monthly Profit', value: monthly },
    { name: 'Annual Profit', value: annual },
  ]

  return (
    <div>
      <Typography variant="h4" gutterBottom>ROI — {active}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card><CardContent>
            <Typography>Total Investment</Typography>
            <Typography variant="h6">${investment.toFixed(0)}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card><CardContent>
            <Typography>Monthly Profit</Typography>
            <Typography variant="h6">${monthly.toFixed(0)}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card><CardContent>
            <Typography>Annual Profit</Typography>
            <Typography variant="h6">${annual.toFixed(0)}</Typography>
          </CardContent></Card>
        </Grid>

        <Grid item xs={12} md={6} sx={{height:300}}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" fill="#1976d2"/></BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card><CardContent>
            <Typography>ROI %</Typography>
            <Typography variant="h6">{isFinite(roi)? roi.toFixed(1)+'%':'N/A'}</Typography>
            <Typography>Break-even Months: {isFinite(be)? be.toFixed(1) : 'N/A'}</Typography>
          </CardContent></Card>
        </Grid>
      </Grid>
    </div>
  )
}
