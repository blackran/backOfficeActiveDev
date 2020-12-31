import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import {
    Dashboard,
    ExpandMore,
    ExpandLess,
    Group,
    ViewList,
    Category,
    DevicesOther,
    Build,
    ExitToApp
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        marginTop: 15,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}))

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

function NavBackOffice (props) {
    const router = useRouter()
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    const deconexion = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Êtes-vous sûr?',
            text: 'Vous ne pourrez pas revenir en arrière!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, deconnecter!',
            cancelButtonText: 'Non, annulez!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/Login')
            }
        })
    }

    return (
        <div className='NavBackOffice'>
            <div className='Header'>
                <img
                    src={ prefix + '/logo.svg' }
                    alt='logo'
                />
                <h1>Activedev</h1>
            </div>
            <div className='listNav'>
                <List
                    color='primary'
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    <Link href="BackOffice?page=Dashboard">
                        <ListItem button>
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </Link>

                    <Link href="BackOffice?page=Membres">
                        <ListItem button>
                            <ListItemIcon>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="Membres" />
                        </ListItem>
                    </Link>
                    <Link href="BackOffice?page=Projets">
                        <ListItem button>
                            <ListItemIcon>
                                <DevicesOther />
                            </ListItemIcon>
                            <ListItemText primary="Projets" />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <Build />
                        </ListItemIcon>
                        <ListItemText primary="Technologies" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Link href="BackOffice?page=ListesTech">
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ViewList />
                                    </ListItemIcon>
                                    <ListItemText primary="Listes" />
                                </ListItem>
                            </List>
                        </Link>
                        <Link href="BackOffice?page=TypesTech">
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Category />
                                    </ListItemIcon>
                                    <ListItemText primary="Types" />
                                </ListItem>
                            </List>
                        </Link>
                    </Collapse>
                </List>
            </div>
            <div className='Deconnexion'>
                <List
                    color='primary'
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                    onClick={deconexion}
                >
                    <Link href="BackOffice?page=Dashboard">
                        <ListItem button>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary="Deconnexion" />
                        </ListItem>
                    </Link>

                </List>
            </div>
        </div>
    )
}

export default NavBackOffice
