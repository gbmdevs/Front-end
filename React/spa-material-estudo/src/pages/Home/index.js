import React, {useEffect, useState } from 'react';
import {Button , Dialog, DialogTitle, 
  DialogActions, DialogContent,Paper,TableContainer,Table,TableHead,TableCell,TableRow,TableBody,Tooltip,IconButton} from '@mui/material'; 
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Edit, Delete } from '@mui/icons-material';

import DialogEditFixedExpensive from 'components/fixed-expensive/DialogEditFixedExpensive';

import axios from 'axios';

const Home = () =>{
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = useState([]);    
    const [options2, setOptions2] = useState([]);    
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };  

    const handleEditClickOpen = (item) => {
      console.log(item)
      setSelectedItem(item); 
      setDialogOpen(true);
    }

    const fetchData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWloLnNtaTJAZ21haWwuY29tIiwiaWF0IjoxNzM2MjYxMzc3LCJleHAiOjE3MzYzNDc3Nzd9.hobp7vpULuZawxTuwUE7lYlkG_AvoHaPtyGoXvSX6Vg'; // Substitua pelo token real
        const response1 = await axios.get('http://localhost:5000/finance/tipdespesa', {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o Bearer Token no cabeçalho
          },
        });
        const response2 = await axios.get('http://localhost:5000/finance/fixed-expense/my', {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o Bearer Token no cabeçalho
          },
        });
  
        // Atualiza as opções com os dados recebidos da API
        setOptions(response1.data);
        setOptions2(response2.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
    useEffect(() => {
      fetchData(); 
    }, []);

    return(
        <>
        <Button variant="outlined" onClick={handleClickOpen}>
           Inserir despesa fixa
        </Button> 
        <Dialog
          open={open}
          onClose={handleClose}>
            <DialogTitle>Inserir despesa fixa</DialogTitle>
            <DialogContent>
              
            <Autocomplete     
      disablePortal
      options={options}
      getOptionLabel={(option) => option.typeDesc}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Tipo" />}
    />
            <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard" /> 

               

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit">Enviar</Button>
            </DialogActions>
        </Dialog>
        
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
           <TableContainer>
           <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {options2.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.typeFixedExpense.typeDesc}</TableCell>
                    <TableCell>{item.valueExpenseActual}</TableCell>
                    <TableCell align="center">
                        <Tooltip title="Editar" onClick={() => handleEditClickOpen(item)}>
                          <IconButton >
                            <Edit color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar">
                          <IconButton >
                            <Delete color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

           </TableContainer>

        </Paper>

        <DialogEditFixedExpensive
            open={isDialogOpen}
            item={selectedItem}
            onClose={() => setDialogOpen(false)}
         />
           
        </>
    )
}

export default Home