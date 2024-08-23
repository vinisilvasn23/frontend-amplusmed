import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import Toggles from '../UserMiniModal/miniModalPermissions'
import FiliationForm from './filiation/filiationPage/filiationPage'
// import { companies, roles } from './table/data'
interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs() {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Filiação" {...a11yProps(0)} />
          <Tab label="Permissões" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <CustomTabPanel value={value} index={0} dir={theme.direction}>
          <div className="pt-4">
            <FiliationForm />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} dir={theme.direction}>
          <Toggles />
        </CustomTabPanel>
      </SwipeableViews>
    </Box>
  )
}
