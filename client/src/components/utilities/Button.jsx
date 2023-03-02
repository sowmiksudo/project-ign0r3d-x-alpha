import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green, blue } from '@mui/material/colors';
import Button from '@mui/material/Button';

export default function CustomButton({ loading, handleButtonClick, text, icon }) {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
                variant="contained"
                fullWidth
                disabled={loading}
                startIcon={icon}
                type="submit"
            >
                {loading ? (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: blue[500],
                            margin: 'auto',
                        }}
                    />
                ) : text}
            </Button>
        </Box>
    );
}
