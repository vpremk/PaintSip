import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import storeData from '../data/store.json'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const formatMoney = (value: number) => currency.format(Number(value || 0))

const categories = [
  { key: 'income', label: 'Income' },
  { key: 'costOfGoodsSold', label: 'Cost of Goods Sold' },
  { key: 'summary', label: 'Summary' },
  { key: 'expenses', label: 'Expenses' },
  { key: 'otherIncome', label: 'Other Income' },
  { key: 'adjustments', label: 'Adjustments' },
]

export default function History() {
  const years = Object.entries((storeData as any).years || {})

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        History
      </Typography>

      {years.map(([year, data]) => {
        const yearData = data as Record<string, any>

        return (
          <Accordion key={year} defaultExpanded={year === '2025'} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6">{year}</Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {yearData.adjustments?.['Net Income / Loss'] !== undefined
                    ? formatMoney(yearData.adjustments['Net Income / Loss'])
                    : '—'}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={2}>
                {categories.map((category) => {
                  const values = yearData[category.key] || {}
                  const entries = Object.entries(values)

                  if (entries.length === 0) return null

                  return (
                    <Grid item xs={12} md={6} key={`${year}-${category.key}`}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {category.label}
                          </Typography>
                          {entries.map(([label, value]) => (
                            <Box
                              key={`${year}-${category.key}-${label}`}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 2,
                                py: 0.5,
                                borderBottom: '1px solid rgba(0,0,0,0.08)',
                              }}
                            >
                              <Typography variant="body2">{label}</Typography>
                              <Typography variant="body2" sx={{ fontWeight: typeof value === 'number' ? 600 : 400 }}>
                                {typeof value === 'number' ? formatMoney(value) : String(value)}
                              </Typography>
                            </Box>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}
