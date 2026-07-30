import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Button, Grid, TextField, Typography, Card, CardContent } from '@mui/material'
import { useStore } from '../store/useStore'
import prodAssumptionsJson from '../data/prodAssumptions.json'

const renderProductionValues = (obj: Record<string, any>, title?: string, depth = 0): React.ReactNode => {
  const entries = Object.entries(obj)

  return (
    <Box sx={{ display: 'grid', gap: 1.5, mt: depth === 0 ? 0 : 1 }}>
      {entries.map(([key, value]) => {
        if (typeof value === 'number' || typeof value === 'string') {
          return (
            <TextField
              key={`${title ?? 'group'}-${key}`}
              label={key}
              value={value}
              size="small"
              InputProps={{ readOnly: true }}
              fullWidth
            />
          )
        }

        if (value && typeof value === 'object') {
          return (
            <Card key={`${title ?? 'group'}-${key}`} variant="outlined" sx={{ p: 1, backgroundColor: depth === 0 ? 'rgba(0,0,0,0.01)' : 'transparent' }}>
              <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>{key}</Typography>
                {renderProductionValues(value as Record<string, any>, key, depth + 1)}
              </CardContent>
            </Card>
          )
        }

        return null
      })}
    </Box>
  )
}

export default function Assumptions(){
  const active = useStore(s => s.active)
  const assumptions = useStore(s => s.scenarios[active])
  const update = useStore(s => s.updateAssumptions)

  const { control, handleSubmit, reset } = useForm({ defaultValues: assumptions })

  React.useEffect(()=> reset(assumptions), [assumptions, reset])

  const onSubmit = (data:any) => {
    update(active, data)
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Assumptions — {active}</Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Production Assumptions (prodAssumptions.json)</Typography>
          {renderProductionValues(prodAssumptionsJson as Record<string, any>)}
        </CardContent>
      </Card>

      <form onBlur={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Revenue</Typography>
                <Grid container spacing={1} sx={{mt:1}}>
                  {Object.entries(assumptions.revenue).map(([k,v])=> (
                    <Grid item xs={12} sm={6} key={k}>
                      <Controller name={`revenue.${k}` as any} control={control} render={({field})=> (
                        <TextField {...field} label={k} fullWidth type="number" />
                      )} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">COGS per Guest</Typography>
                <Grid container spacing={1} sx={{mt:1}}>
                  {Object.entries(assumptions.cogs).map(([k,v])=> (
                    <Grid item xs={12} sm={6} key={k}>
                      <Controller name={`cogs.${k}` as any} control={control} render={({field})=> (
                        <TextField {...field} label={k} fullWidth type="number" />
                      )} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            <Box sx={{height:12}} />

            <Card>
              <CardContent>
                <Typography variant="h6">Fixed Expenses</Typography>
                <Grid container spacing={1} sx={{mt:1}}>
                  {Object.entries(assumptions.fixed).map(([k,v])=> (
                    <Grid item xs={12} sm={6} key={k}>
                      <Controller name={`fixed.${k}` as any} control={control} render={({field})=> (
                        <TextField {...field} label={k} fullWidth type="number" />
                      )} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            <Box sx={{height:12}} />

            <Card>
              <CardContent>
                <Typography variant="h6">Purchase</Typography>
                <Grid container spacing={1} sx={{mt:1}}>
                  {Object.entries(assumptions.purchase).map(([k,v])=> (
                    <Grid item xs={12} sm={6} key={k}>
                      <Controller name={`purchase.${k}` as any} control={control} render={({field})=> (
                        <TextField {...field} label={k} fullWidth type="number" />
                      )} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{mt:2}}>
          <Button variant="contained" onClick={() => handleSubmit(onSubmit)()}>Save</Button>
          <Button variant="outlined" sx={{ml:2}} onClick={()=>{ useStore.getState().reset() }}>Reset to Defaults</Button>
        </Box>
      </form>
    </div>
  )
}
