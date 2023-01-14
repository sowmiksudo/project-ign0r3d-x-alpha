import React, { useEffect } from 'react';
import { Avatar, Typography } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Typed from "typed.js";

function Header() {

    const el = React.useRef(null);
    const typed = React.useRef(null);


    useEffect(() => {
        const options = {
            strings: [
                '<strong>F<small>IERY</small></strong> <small> S<x-small>MS</x-small> B<x-small>OMBER</x-small></small>',
                '<strong>F<small>IERY</small></strong> <small>F<x-small>ULL</x-small> F<x-small>EATURED</x-small></small>',
                '<strong>F<small>IERY</small></strong> <small>F<x-small>ULL F<x-small>REEDOM</x-small></small>',
                '<strong>F<small>IERY</small></strong> <small>M<x-small>OST A<x-small>DVANCED</x-small></small>',
                '<strong>F<small>IERY</small></strong> <x-small>FROM</x-small><small> MR TOOLS</small>',
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
            <Avatar sx={{
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
            }} >
                <LocalFireDepartmentIcon sx={{ width: 30, height: 30 }} />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ textShadow: "0 0 10px 0 lime" }}>
                <span ref={el}></span>
            </Typography>
        </>
    )
}

export default Header;