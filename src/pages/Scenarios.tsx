import React from 'react'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { useStore } from '../store/useStore'
import { totalRevenue, netProfit, breakEvenMonths, roiPercent } from '../utils/calculations'

export default function Scenarios(){
  const active = useStore(s => s.active)
  const setActive = useStore(s => s.setActive)
  const scenarios = useStore(s => s.scenarios)

  return (
    <div>
      <Typography variant="h4" gutterBottom>Scenario Comparison</Typography>
      <Grid container spacing={2}>
        {(['conservative','expected','optimistic'] as any).map((k:string)=>{
          const a = scenarios[k]
          return (
            <Grid item xs={12} md={4} key={k}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{k}</Typography>
                  <Typography>Revenue: ${totalRevenue(a).toFixed(0)}</Typography>
                  <Typography>Profit: ${netProfit(a).toFixed(0)}</Typography>
                  <Typography>Break-even: {isFinite(breakEvenMonths(a))? breakEvenMonths(a).toFixed(1): 'N/A'}</Typography>
                  <Typography>ROI: {isFinite(roiPercent(a))? roiPercent(a).toFixed(1)+'%':'N/A'}</Typography>
                  <Button variant="outlined" sx={{mt:1}} onClick={()=>setActive(k)}>Activate</Button>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
