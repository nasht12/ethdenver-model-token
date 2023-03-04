import Layout from "../components/Layout";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ListModels({ models }) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleOpen = (rowData) => {
    setOpen(true);
    setSelectedRow(rowData);
  };
  const handleClose = () => setOpen(false);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "category",
      headerName: "Category",
      width: 100,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "ipfsHash",
      headerName: "IPFS hash",
      width: 200,
    },
    // {
    //   field: "contractaddress",
    //   headerName: "Contract Address",
    //   width: 200,
    // },
    {
      field: "view",
      headerName: "",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            size="small"
            type="submit"
            onClick={() => handleOpen(params.row)}
            sx={{ backgroundColor: "#212121" }}
          >
            View
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 1200,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography
                id="modal-modal-name"
                // variant="h6"
                // component="h2"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                }}
              >
                <b>Name</b>: {selectedRow ? selectedRow.name : ""}
              </Typography>
              <Typography
                id="modal-modal-category"
                sx={{
                  // mt: 2,
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                }}
              >
                <b>Category</b>: {selectedRow ? selectedRow.category : ""}
              </Typography>
              <Typography
                id="modal-modal-ipfshash"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                }}
              >
                <b>Description</b>: {selectedRow ? selectedRow.description : ""}
              </Typography>
              <Typography
                id="modal-modal-ipfshash"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                }}
              >
                <b>IPFS</b>: {selectedRow ? selectedRow.ipfsHash : ""}
              </Typography>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#212121",
                  marginTop: "20px",
                  marginLeft: "10px",
                }}
              >
                Mint
              </Button>
            </Box>
          </Modal>
        </>
      ),
    },
  ];
  return (
    <Layout>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={models} columns={columns} disableSelectionOnClick />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const models = await prisma.models.findMany();

  return {
    props: { models },
  };
}

export default ListModels;
