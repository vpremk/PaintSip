# Paint & Sip Financial Planner – MVP

A modern Single Page Application (SPA) to evaluate the financial viability of purchasing and operating a paint-and-sip studio. Built with React, TypeScript, Vite, Material UI, and Recharts.

## Features

✅ **Dashboard** – KPI cards showing monthly revenue, expenses, gross/net profit, profit margin, break-even, ROI, and revenue per event  
✅ **Assumptions** – Fully editable revenue, COGS, fixed expenses, and purchase assumptions  
✅ **Profit & Loss** – Automatic P&L calculation with detailed revenue breakdown and CSV export  
✅ **ROI Analysis** – Investment tracking, monthly/annual profit, ROI %, break-even months with bar charts  
✅ **Scenario Comparison** – Conservative, Expected, and Optimistic scenarios with independent assumptions  
✅ **Local Storage Persistence** – Auto-save all data; refreshing the browser restores your state  
✅ **Reset to Defaults** – One-click reset to factory assumptions  
✅ **Instant Calculations** – All metrics update automatically as you edit assumptions  
✅ **Responsive Design** – Mobile, tablet, and desktop layouts with Material UI  

## Tech Stack

- **React** 18.2
- **TypeScript** 5.6
- **Vite** 5.2 (fast build & dev server)
- **Material UI** 5.14 (components & theming)
- **React Hook Form** 7.45 (editable forms)
- **Zustand** 4.4 (state management + persistence)
- **Recharts** 2.6 (charts & visualizations)
- **React Router** 6.14 (navigation)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
  App.tsx                 # Main app with routing & AppBar
  main.tsx                # React entry point
  styles.css              # Global styles

  pages/
    Dashboard.tsx         # KPI cards & assumptions summary
    Assumptions.tsx       # Editable assumptions form
    ProfitLoss.tsx        # P&L table with CSV export
    ROI.tsx               # ROI analysis with bar chart
    Scenarios.tsx         # Scenario comparison & switcher

  store/
    useStore.ts           # Zustand store with localStorage persistence

  utils/
    calculations.ts       # Financial calculation functions

  types/
    index.ts              # TypeScript interfaces

Config Files:
  package.json            # Dependencies & scripts
  tsconfig.json           # TypeScript configuration
  vite.config.ts          # Vite configuration
  index.html              # HTML entry point
```

## Key Calculations

All calculations are automated and instant:

- **Monthly Revenue** = Ticket Sales + Private + Corporate + Airbnb + Merchandise + Gift Cards + Tips
- **COGS** = (Sum of per-guest materials) × Guests per Event × Events per Month
- **Gross Profit** = Revenue − COGS
- **Net Profit** = Gross Profit − Fixed Operating Expenses
- **Break-even** = Total Investment ÷ Monthly Net Profit
- **ROI %** = (Annual Profit ÷ Total Investment) × 100

## Usage

### 1. Dashboard
View at-a-glance financial metrics and key assumptions. Green indicators show profitability; red shows loss.

### 2. Assumptions
Edit all revenue drivers, COGS per guest, fixed expenses, and purchase investment. Changes auto-save to Local Storage and update dashboard instantly.

### 3. Profit & Loss
Review detailed monthly P&L statement. Export to CSV for Excel/spreadsheet analysis.

### 4. ROI
See investment recovery timeline and annual profit projections. Visual bar chart compares investment vs. profit.

### 5. Scenarios
Compare three independent financial models:
- **Conservative** – Pessimistic projections
- **Expected** – Base case
- **Optimistic** – Best-case scenario

Switch between scenarios with the "Activate" button. Each maintains its own assumptions.

## Data Persistence

All data is stored in your browser's **Local Storage** under the key `psp-storage`. 

- ✅ Data persists across browser sessions
- ✅ Survives tab closes and browser restarts
- ✅ Each scenario is independent
- 🔄 Click "Reset to Defaults" to wipe and start fresh

## Default Assumptions

**Revenue:**
- Ticket: $35/guest
- 20 guests/event, 3 events/week, 4 weeks/month
- 1 private event/month
- No corporate or Airbnb events initially
- No merchandise, gift cards, or tips

**COGS per Guest:**
- Canvas $2, Paint $1.50, Brushes $0.50, Palette $0.20
- Snacks $1.50, Wine $3.00, Cleaning $0.30
- **Total: $8.90/guest**

**Fixed Expenses:**
- Rent $3,800, Payroll $4,000, Marketing $500
- Insurance $400, Utilities $300, Tech $100, Misc $200
- **Total: $9,300/month**

**Purchase Investment:**
- Purchase price $60,000, Transfer fee $1,200, Refresh $5,000
- **Total: $66,200**

## CSV Export

From the **Profit & Loss** page, export your P&L statement as CSV for use in Excel or Google Sheets. File is named `pl.csv`.

## Responsive Design

- **Mobile (< 600px)**: Single column layout, full-width inputs
- **Tablet (600–960px)**: Two-column sections
- **Desktop (> 960px)**: Multi-column grids with side-by-side cards

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Requires ES2022 support.

## No Backend

This is a **client-side only** MVP. All calculations and data storage happen in your browser. No authentication, no server, no database.

## Future Enhancements

Potential additions post-MVP:
- Dark/Light theme toggle
- Monthly profit projection chart
- Sensitivity analysis (what-if scenarios)
- Customer management
- Event scheduling
- Inventory tracking
- Backend sync & multi-device support
- PDF report generation

## License

Private project.

---

**Ready to plan your paint studio?** Install, run, and start editing assumptions! 🎨

