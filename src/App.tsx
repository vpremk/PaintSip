import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material'
import Dashboard from './pages/Dashboard'
import Assumptions from './pages/Assumptions'
import ProfitLoss from './pages/ProfitLoss'
import ROI from './pages/ROI'
import Scenarios from './pages/Scenarios'
import History from './pages/History'

const theme = createTheme()

export default function App(){
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{flex:1}}>Paint & Sip Planner</Typography>
          <nav>
            <Link to="/" style={{color:'white',marginRight:12}}>Dashboard</Link>
            <Link to="/assumptions" style={{color:'white',marginRight:12}}>Assumptions</Link>
            <Link to="/pl" style={{color:'white',marginRight:12}}>P&L</Link>
            <Link to="/roi" style={{color:'white',marginRight:12}}>ROI</Link>
            <Link to="/scenarios" style={{color:'white',marginRight:12}}>Scenarios</Link>
            <Link to="/history" style={{color:'white'}}>History</Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Container className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/assumptions" element={<Assumptions/>} />
          <Route path="/pl" element={<ProfitLoss/>} />
          <Route path="/roi" element={<ROI/>} />
          <Route path="/scenarios" element={<Scenarios/>} />
          <Route path="/history" element={<History/>} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}
