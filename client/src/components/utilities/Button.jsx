import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function CircularIntegration({ loading, handleButtonClick }) {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={handleButtonClick}
                startIcon={<SendIcon />}
                type="submit"
            >
                {loading ? (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            margin: 'auto',
                        }}
                    />
                ) : "SEND SMS"}
            </Button>
        </Box>
    );
}
