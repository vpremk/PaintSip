import React from 'react'
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useStore } from '../store/useStore'
import prodAssumptionsJson from '../data/prodAssumptions.json'
import { Assumptions } from '../types'

const cloneDeep = <T,>(value: T): T => JSON.parse(JSON.stringify(value))

const mapProdToAssumptions = (prod: any): Assumptions => ({
  revenue: {
    ticketPrice: Number(prod?.revenue?.ticketPrice ?? 35),
    guestsPerEvent: Number(prod?.revenue?.guestsPerEvent ?? 20),
    eventsPerWeek: Number(prod?.revenue?.eventsPerWeek ?? 3),
    weeksPerMonth: Number(prod?.revenue?.weeksPerMonth ?? 4),
    privatePerMonth: Number(prod?.revenue?.privatePerMonth ?? 1),
    corporatePerMonth: Number(prod?.revenue?.corporatePerMonth ?? 2),
    airbnbPerMonth: Number(prod?.revenue?.airbnbPerMonth ?? 2),
    merchPerMonth: Number(prod?.revenue?.merchPerMonth ?? 200),
    giftCardPerMonth: Number(prod?.revenue?.giftCardPerMonth ?? 300),
    tipsPerGuest: Number(prod?.revenue?.tipsPerGuest ?? 2),
  },
  cogs: {
    canvas: Number(prod?.cogs?.canvas ?? 4),
    paint: Number(prod?.cogs?.acrylicPaint ?? 0.9),
    brushes: Number(prod?.cogs?.brushes ?? 0.4),
    palette: Number(prod?.cogs?.paintPalette ?? 0.35),
    snacks: Number(prod?.cogs?.snacks ?? 1),
    wine: Number(prod?.cogs?.wineRefreshments ?? 2.5),
    cleaning: Number(prod?.cogs?.cleaningSupplies ?? 0.4),
  },
  fixed: {
    rent: Number(prod?.fixed?.rent ?? 3850),
    payroll: Number(prod?.fixed?.breakdown?.Payroll?.['Total Payroll'] ?? 8600),
    marketing: 500,
    insurance: Number(prod?.fixed?.breakdown?.['Insurance & Legal']?.Total ?? 600),
    utilities: Number(prod?.fixed?.breakdown?.['Office Expenses']?.Internet ?? 100) + Number(prod?.fixed?.breakdown?.['Office Expenses']?.Phone ?? 75),
    technology: Number(prod?.fixed?.breakdown?.Technology?.['Total Technology'] ?? 1008),
    miscellaneous: Number(prod?.fixed?.breakdown?.Transportation?.Total ?? 350) + Number(prod?.fixed?.breakdown?.['Equipment (Capital Assets)']?.Total ?? 125) + Number(prod?.fixed?.breakdown?.Miscellaneous?.Total ?? 255),
  },
  purchase: {
    purchasePrice: Number(prod?.purchase?.purchasePrice ?? 55000),
    transferFee: Number(prod?.purchase?.transferFee ?? 12500),
    refreshCost: Number(prod?.purchase?.refreshCost ?? 2250),
  },
})

const prodSections = [
  {
    title: 'Revenue',
    sectionKey: 'revenue',
    keys: ['ticketPrice','guestsPerEvent','eventsPerWeek','weeksPerMonth','privatePerMonth','corporatePerMonth','airbnbPerMonth','birthdayPartiesPerMonth','merchPerMonth','giftCardPerMonth','tipsPerGuest'],
  },
  {
    title: 'COGS',
    sectionKey: 'cogs',
    keys: ['canvas','acrylicPaint','brushes','easels','paintPalette','apronLaundry','tableCovers','paperTowels','waterCups','cleaningSupplies','disposableGloves','packaging','printouts','snacks','wineRefreshments','shippingKits'],
  },
  {
    title: 'Fixed Expenses',
    sectionKey: 'fixed',
    keys: ['rent','cleaning','storage','managerPayroll','artistInstructorPayroll','assistantInstructorPayroll','eventHelpersPayroll','bookkeeperPayroll','contractorPayroll','bookingSoftware','website','paymentProcessing','pos','zoom','crm','generalLiabilityInsurance','businessInsurance','llcFees','licenses','accounting','taxPrep','printer','ink','officeSupplies','internet','phone','computerEquipment','mileage','fuel','parking','tolls','vehicleMaintenance','easels','foldingTables','chairs','lighting','speakers','microphone','projector','storageBins','bankFees','creditCardFees','refunds','membershipFees','professionalDevelopment','eventPermits'],
  },
  {
    title: 'Purchase',
    sectionKey: 'purchase',
    keys: ['purchasePrice','transferFee','refreshCost','initialInvestment'],
  },
]

const getSectionTotal = (sectionKey: string, values: Record<string, any>) => {
  if (sectionKey === 'revenue') {
    const revenue = values.revenue ?? {}
    const monthlyEvents = Number(revenue.eventsPerWeek ?? 0) * Number(revenue.weeksPerMonth ?? 0)
    const guestsPerEvent = Number(revenue.guestsPerEvent ?? 0)
    return Number(revenue.ticketPrice ?? 0) * monthlyEvents * guestsPerEvent
  }

  const section = values[sectionKey] ?? {}
  return Object.values(section).reduce((total: number, value) => {
    const numeric = typeof value === 'number' ? value : Number(value ?? 0)
    return total + (Number.isFinite(numeric) ? numeric : 0)
  }, 0)
}

const getSectionFormulaText = (sectionKey: string, values: Record<string, any>) => {
  const revenue = values.revenue ?? {}
  if (sectionKey === 'revenue') {
    const monthlyEvents = Number(revenue.eventsPerWeek ?? 0) * Number(revenue.weeksPerMonth ?? 0)
    const guestsPerEvent = Number(revenue.guestsPerEvent ?? 0)
    const total = Number(revenue.ticketPrice ?? 0) * monthlyEvents * guestsPerEvent
    return `${Number(revenue.eventsPerWeek ?? 0)} × ${Number(revenue.weeksPerMonth ?? 0)} × ${guestsPerEvent} × $${Number(revenue.ticketPrice ?? 0)} = ${formatNumber(total)}`
  }

  if (sectionKey === 'cogs') {
    const cogs = values.cogs ?? {}
    const total = Object.values(cogs).reduce((sum: number, value) => sum + Number(value ?? 0), 0)
    return `${formatNumber(total)} total COGS per event`
  }

  if (sectionKey === 'fixed') {
    const section = values.fixed ?? {}
    const total = Object.values(section).reduce((sum: number, value) => sum + Number(value ?? 0), 0)
    return `${formatNumber(total)} total monthly fixed costs`
  }

  if (sectionKey === 'purchase') {
    const purchase = values.purchase ?? {}
    const total = Number(purchase.purchasePrice ?? 0) + Number(purchase.transferFee ?? 0) + Number(purchase.refreshCost ?? 0)
    return `$${Number(purchase.purchasePrice ?? 0)} + $${Number(purchase.transferFee ?? 0)} + $${Number(purchase.refreshCost ?? 0)} = ${formatNumber(total)}`
  }

  return ''
}

const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

export default function Assumptions(){
  const active = useStore((s) => s.active)
  const assumptions = useStore((s) => s.scenarios[active])
  const update = useStore((s) => s.updateAssumptions)
  const [expanded, setExpanded] = React.useState(true)
  const [prodValues, setProdValues] = React.useState(cloneDeep(prodAssumptionsJson as any))
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    revenue: false,
    cogs: false,
    fixed: false,
    purchase: false,
  })

  const handleProdChange = (section: string, key: string, next: string) => {
    const nextValues = cloneDeep(prodValues) as Record<string, any>
    const sectionValues = nextValues[section] as Record<string, any>
    sectionValues[key] = next === '' ? 0 : Number(next)
    setProdValues(nextValues)
    update(active, mapProdToAssumptions(nextValues))
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Assumptions — {active}
      </Typography>

      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Production Assumptions (prodAssumptions.json)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {prodSections.map((group) => (
            <Accordion
              key={group.title}
              expanded={!!openSections[group.sectionKey]}
              onChange={() => setOpenSections((prev) => ({ ...prev, [group.sectionKey]: !prev[group.sectionKey] }))}
              sx={{ mb: 1 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle1">{group.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {getSectionFormulaText(group.sectionKey, prodValues)}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" color="primary.main">
                    {formatNumber(getSectionTotal(group.sectionKey, prodValues))}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1.5}>
                  {group.keys.map((key) => (
                    <Grid item xs={12} sm={6} md={4} key={`${group.title}-${key}`}>
                      <TextField
                        label={key}
                        value={prodValues[group.sectionKey]?.[key] ?? 0}
                        fullWidth
                        size="small"
                        type="number"
                        onChange={(e) => {
                          handleProdChange(group.sectionKey, key, e.target.value)
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => useStore.getState().reset()}>
          Reset to Defaults
        </Button>
      </Box>
    </div>
  )
}
