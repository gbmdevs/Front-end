import React, { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// @mui material dialogs
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";  
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography"; 
import SoftButton from "components/SoftButton";

function MiniStatisticsCard({ bgColor, title, count, percentage, icon, direction }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [{ field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Descrição', width: 230 },
    { field: 'price', headerName: 'Valor', width: 130,
      renderCell: (params) => {
        const formatter = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }); 
        return (
          <span style={{ color: params.formattedValue >= 0 ? "green" : "red" }}>
               {formatter.format(params.formattedValue)}
          </span>
        )
      }
    },
    { field: 'actions', headerName: 'Ações', width: 130,
      renderCell: (params) =>{
        console.log(params);
        return(<span>
          <Icon fontSize="small" color="inherit" style={{ cursor: "pointer" }}>public</Icon></span>
        )


      }
     }
  ];

  const rows =[
     { id: 1, description: 'Pagamento DAS', firstName: 'Jon', price: -351.88 },
     { id: 2, description: 'Credito Reembolso', firstName: 'Cersei', price: 42 },
     { id: 3, description: 'Resgate FGTS', firstName: 'Cersei', price: 126.11 },
     { id: 4, description: 'Pagamento Aluguel', firstName: 'Cersei', price: -1250 },
     { id: 5, description: 'Fatura Nubank', firstName: 'Cersei', price: -342.56 },
     { id: 6, description: 'Fatura XP', firstName: 'Cersei', price: -4795.56 },
     { id: 7, description: 'Fatura XP', firstName: 'Cersei', price: -4795.56 },
     { id: 8, description: 'Fatura XP', firstName: 'Cersei', price: -4795.56 },
     { id: 9, description: 'Fatura XP', firstName: 'Cersei', price: -4795.56 },
     { id: 10, description: 'Fatura XP', firstName: 'Cersei', price: -4795.56 },
     { id: 11, description: 'Fatura XP', firstName: 'Cersei', price: -4795.56 }
    ];

    console.log(icon.component);
  return (
<>
              {/* Dialog */}
              <Dialog open={open} onClose={handleClose} maxWidth="lg">
              <DialogTitle>{"Itau ITI - Conta Corrente"}</DialogTitle>
                  
              <DialogContent>
                 <Paper sx={{ width: '100vh', height: 400, overflow: 'hidden' }}>
                   <DataGrid  columns={columns}
                     rows={rows}
                     checkboxSelection 
                     autoPageSize
                     sx={{ width: '100%', border: 0}}>
                  </DataGrid>
                 </Paper>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose} color="primary">
                  Adicionar Gasto
                </Button>
                <Button onClick={handleClose} color="primary">
                  Fechar
                </Button>
              </DialogActions>
            </Dialog>

    <Card onClick={handleOpen} style={{ cursor: "pointer" }}>
      <SoftBox bgColor={bgColor} variant="gradient">
        <SoftBox p={2}>
          <Grid container alignItems="center">
            {direction === "left" ? (
              <Grid item>
                <SoftBox
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="3rem"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </SoftBox>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <SoftBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <SoftTypography
                  variant="button"
                  color={bgColor === "white" ? "text" : "white"}
                  opacity={bgColor === "white" ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </SoftTypography>
                <SoftTypography
                  variant="h5"
                  fontWeight="bold"
                  color={bgColor === "white" ? "dark" : "white"}
                >
                  {count}{" "}
                  <SoftTypography variant="button" color={percentage.color} fontWeight="bold">
                    {percentage.text}
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </Grid>
            {direction === "right" ? (
              <Grid item xs={4}>
                <SoftBox
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="3rem"
                  marginLeft="auto"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </SoftBox>
              </Grid>
            ) : null}
          </Grid>
        </SoftBox>
      </SoftBox>
    </Card>
    </>
  );  
}

// Setting default values for the props of MiniStatisticsCard
MiniStatisticsCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the MiniStatisticsCard
MiniStatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default MiniStatisticsCard;
