import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ScrollTop from "./scrollTop";
import ElevationScroll from "./elevationScroll";
import {Fab} from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ButtonAppBar(props) {
    return (
        <>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'center'}}>
                            hanTan's blog
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>

            <Toolbar id="back-to-top-anchor"/>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </>
    );
}