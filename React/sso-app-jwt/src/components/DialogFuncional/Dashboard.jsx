import React,{ useState } from "react";
import Dialog from '../Dialog/Dialog';

const Dashboard = () =>{
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
      };
    
      const closeDialog = () => {
        setIsDialogOpen(false);
      };
    
      const handleConfirm = () => {
        alert('Confirmed!');
        closeDialog();
      };

    return (<div style={styles.container}>
        <h2>Dashboard</h2>
        <p>This is the Dashboard component. Click the button below to open the dialog.</p>
        <button onClick={openDialog} style={styles.button}>Open Dialog</button>
  
        {/* Diálogo embutido no Dashboard */}
        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          onConfirm={handleConfirm}
          title="Confirmation Dialog"
        >
          <p>Are you sure you want to proceed?</p>
        </Dialog>
      </div>)
}


const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      textAlign: 'center',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      marginTop: '20px',
    },
  };

export default Dashboard;