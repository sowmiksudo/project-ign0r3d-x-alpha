import React, { useEffect } from 'react';
import { Avatar, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import Typed from "typed.js";
import { createStyles } from '@mui/material';

function Header() {

    const el = React.useRef(null);
    const typed = React.useRef(null);

    const styles = createStyles({
        logo: {
            m: 1, 
            bgcolor: 'secondary.main', 
            width: 60, 
            height: 60,
            animationName: "spin",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDuration: "5s",
            WebkitAnimationName: "spin",
            WebkitAnimationTimingFunction: "linear",
            WebkitAnimationIterationCount: "infinite",
            WebkitAnimationDuration: "5s"
        }
    });


    useEffect(() => {
        const options = {
            strings: [
                '<strong><small>X</small>SMS</strong> <small>F<x-small>REE</x-small> S<x-small>MS</x-small> S<x-small>ENDER</x-small></small>',
                '<strong><small>X</small>SMS</strong> <small>U<x-small>NLIMITED</x-small> B<x-small>ALANCE</x-small></small>',
                '<strong><small>X</small>SMS</strong> <small>No L<x-small>OGIN</x-small></small>',
                '<strong><small>X</small>SMS</strong> <small>No R<x-small>EGISTRATION</x-small></small>',
                '<strong><small>X</small>SMS</strong> <x-small>FROM</x-small><small> TEAM X 1337</small>', 
            ],
            typeSpeed: 30,
            backSpeed: 10,
            loop: true,
        };

        typed.current = new Typed(el.current, options);

        return () => {
            typed.current.destroy();
        }

    }, [])


    return (
        <>
            <Avatar sx={styles.logo} >
                <MessageIcon sx={{ width: 30, height: 30 }} />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ textShadow: "0 0 10px 0 lime" }}>
                <span ref={el}></span>
            </Typography>
        </>
    )
}

export default Header;