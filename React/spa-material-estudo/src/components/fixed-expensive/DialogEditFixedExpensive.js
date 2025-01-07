import React,{useState,useEffect} from "react";
import { Dialog,DialogTitle,DialogContent ,TextField,Button,DialogActions} from "@mui/material";
import { ImportExport } from "@mui/icons-material";


const DialogEditFixedExpensive = ({open,item,onClose}) =>{
    const [formData, setFormData] = useState({
        id: item?.id || '',
        typeDesc: item?.typeFixedExpense.typeDesc|| '',
        valueExpenseActual: item?.valueExpenseActual || '',
    });

    useEffect(() => {
        console.log("Recebido: ",item)
        if (item) {
          setFormData({
            id: item?.id || '',
            typeDesc: item?.typeFixedExpense.typeDesc || '',
            valueExpenseActual: item?.valueExpenseActual || '',
          });
        }
      }, [item]);

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Editar {formData.typeDesc}</DialogTitle>
        <DialogContent>
        <TextField
          margin="dense"
          label="Nome"
          name="name"
          value={formData.typeDesc} 
          fullWidth
        />
         <TextField
          margin="dense"
          label="Valor"
          name="valueExpenseActual"
          value={formData.valueExpenseActual} 
          fullWidth
        /></DialogContent>
        <DialogActions>
              <Button>Cancelar</Button>
              <Button type="submit">Enviar</Button>
        </DialogActions>
       </Dialog>
    ); 
}
export default DialogEditFixedExpensive