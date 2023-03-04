import Layout from "../components/Layout";
import { getSession } from "next-auth/react";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import prisma from "../../lib/prisma";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function ListDatasets({ models }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "category", headerName: "Category", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "ipfsHash", headerName: "Content Identifier", width: 200 },
    { field: "contractaddress", headerName: "Contract Address", width: 200 },
    {
      field: "view",
      headerName: "",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            size="small"
            type="submit"
            onClick={handleOpen}
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
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </div>
      ),
    },
  ];
  console.log("models", models);
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

  const models = await prisma.datasets.findMany();

  return {
    props: { models },
  };
}

export default ListDatasets;
