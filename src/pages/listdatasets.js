import Layout from "../components/Layout";
import { getSession } from "next-auth/react";
import styles from "@/styles/Home.module.css";
import prisma from "../../lib/prisma";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "category", headerName: "Category", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
  { field: "ipfsHash", headerName: "Content Identifier", width: 200 },
  { field: "contractaddress", headerName: "Contract Address", width: 200 },
];

function ListDatasets({ models }) {
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
