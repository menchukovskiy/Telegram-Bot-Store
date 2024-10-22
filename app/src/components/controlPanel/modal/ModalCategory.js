import { DialogActions, Dialog, DialogContent, TextField, DialogTitle } from "@mui/material"
import { getText } from "../../../utils/language"
import CancelBtn from "../button/CancelBtn";
import SaveBtn from "../button/SaveBtn";
import { useDispatch } from "react-redux";
import { add } from "../../../store/slice/categorySlice";



const ModalCategory = ({ open, onClose, colors, input }) => {

    const dispatch = useDispatch()

    const handler = () => {
        dispatch( add( [ input.value, 0 ] ) )
        onClose()
    }

    

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"

        >
            <DialogTitle>{getText('TEXT_ADD_CATEGORY')}</DialogTitle>
            <DialogContent>

                <TextField
                    value={input.value}
                    onChange={e => input.onChange(e)}
                    onBlur={e => input.onBlur(e)}
                    variant="standard"
                    label={getText('TEXT_NAME_CATEGORY')}
                    error={input.getError()}
                    helperText={input.getError()}
                    fullWidth
                    autoFocus
                />
            </DialogContent>

            <DialogActions>
                <CancelBtn onClick={onClose} />
                <SaveBtn status={null} onClick={ handler } disabled={input.inputValid} />
            </DialogActions>

        </Dialog>
    )

}

export default ModalCategory