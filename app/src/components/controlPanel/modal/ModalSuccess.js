import React from 'react';
import { Box, Dialog, DialogContent, Button } from "@mui/material"
import { getText } from "../../../utils/language"
import { useNavigate } from 'react-router-dom'
 
const ModalSuccess = ({ open, onClose, message }) => {
    const history = useNavigate()

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            sx={{
                '& .MuiPaper-root' : {
                    minWidth : '300px !important'
                }
            }}
        >
            <DialogContent className='success_message'>
                {getText(message)}
            </DialogContent>

            <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                    sx={{
                        marginBottom : '15px'
                    }}
                    variant="contained" color="success"
                    onClick={() => history(-1)}
                >
                    {getText('TEXT_OK')}
                </Button>
            </Box>

        </Dialog>
    );
};

export default ModalSuccess;