/* eslint-disable no-useless-catch */
'use client'
import * as React from 'react'
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  createTheme,
} from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { FaHospital } from 'react-icons/fa'
import {
  MdAppRegistration,
  MdDarkMode,
  MdDashboardCustomize,
  MdWork,
} from 'react-icons/md'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { SiAwsorganizations } from 'react-icons/si'

import Link from 'next/link'
import { IoMdNotifications, IoMdPerson } from 'react-icons/io'
import ErrorApp from '@/erros/error'
import { AuthContext } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/use-toast'
import Loading from '../Loading/Loading'

// interface SidebarProps {
//   // children: React.ReactNode
// }

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function MiniDrawer() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [currentTheme, setCurrentTheme] = React.useState('light')
  const { toast } = useToast()
  const { signOut } = React.useContext(AuthContext)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const appTheme = createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderBottom: '1px solid var(--blue-dark-200)',
            backgroundColor: '#f6f6f6',
          },
        },
      },
    },
  })

  const appDarkTheme = createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderBottom: '1px solid var(--blue-dark-200)',
            backgroundColor: '#2A3452',
          },
        },
      },
    },
  })

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setCurrentTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  React.useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light'
    setCurrentTheme(currentTheme)
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  React.useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [currentTheme])

  // const handleMenuItemClick = (url: string) => {
  //   setLoading(true)

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then(() => {
  //       setLoading(false)
  //     })
  //     .catch(() => {
  //       setLoading(false)
  //     })
  // }

  async function handleSignOut() {
    try {
      setLoading(true)
      await signOut()
    } catch (error) {
      const isAppError = error instanceof ErrorApp
      const title = isAppError
        ? error.message
        : 'Não foi possível realizar o login, tente novamente mais tarde.'
      console.log(title)
      toast({
        title,
        description: 'Por favor, tente novamente.',
        duration: 4000,
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // listagem de usuarios = /user/ GET
  return (
    <div>
      {loading ? <Loading /> : null}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          theme={currentTheme === 'light' ? appTheme : appDarkTheme}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: `${currentTheme === 'light' ? '#2A3452' : '#FFF'}`,
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link href={'/dashboard'}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color={`${currentTheme === 'light' ? '#2A3452' : '#fff'}`}
                fontSize={'30px'}
                fontFamily={'Poppins'}
                fontWeight={'700'}
              >
                AmplusMed
              </Typography>
            </Link>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 'auto',
                gap: '5px',
              }}
            >
              <MdDarkMode
                className={`${currentTheme === 'light' ? 'fill-[#2A3452]' : 'fill-white'} cursor-pointer`}
                size={22}
                onClick={toggleTheme}
              />
              <IoMdNotifications
                className={`${currentTheme === 'light' ? 'fill-[#2A3452]' : 'fill-white'} cursor-pointer`}
                size={22}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <div className={`${open ? '' : 'max-md:hidden'}`}>
          <Drawer
            variant="permanent"
            open={open}
            ModalProps={{
              BackdropProps: {
                style: {
                  position: 'relative',
                },
              },
            }}
            sx={{
              '& .MuiDrawer-paper': {
                backgroundColor:
                  currentTheme === 'light' ? '#1479FF' : '#2A3452',
              },
            }}
          >
            <DrawerHeader>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  color: '#fff',
                }}
              >
                {open && (
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      flexGrow: 1,
                      fontSize: '24px',
                      marginLeft: '14px',
                      fontFamily: 'Poppins',
                      fontWeight: '600',
                    }}
                  >
                    AmplusMed
                  </Typography>
                )}
                <IconButton onClick={handleDrawerClose} sx={{ color: '#fff' }}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </Box>
            </DrawerHeader>

            <Divider />
            <List>
              {[
                'Dashboard',
                'Unidades Medicas',
                'Cadastros',
                'Usuarios',
                'Empresas',
                'Profissionais',
              ].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                  <Link href={`/${text.toLowerCase().replace(' ', '')}`}>
                    <ListItemButton
                      sx={{
                        color: '#fff',
                        minHeight: 48,
                        fontFamily: 'Poppins',
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {index === 0 && (
                          <MdDashboardCustomize size={22} color="#fff" />
                        )}
                        {index === 1 && <FaHospital size={22} color="#fff" />}
                        {index === 2 && (
                          <MdAppRegistration size={22} color="#fff" />
                        )}
                        {index === 3 && <IoMdPerson size={22} color="#fff" />}
                        {index === 4 && (
                          <SiAwsorganizations size={22} color="#fff" />
                        )}
                        {index === 5 && <MdWork size={22} color="#fff" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Sair'].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      color: '#fff',
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={handleSignOut}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {index === 0 && (
                        <RiLogoutBoxRFill size={22} color="#fff" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>
        {/* <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          {children}
        </Box> */}
      </Box>
    </div>
  )
}
