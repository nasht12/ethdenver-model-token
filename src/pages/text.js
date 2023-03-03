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
  { field: "cid", headerName: "Content Identifier", width: 200 },
  { field: "contractaddress", headerName: "Contract Address", width: 200 },
];

const rows = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", age: 25 },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", age: 45 },
  { id: 4, name: "Mary Williams", email: "mary.williams@example.com", age: 35 },
  { id: 5, name: "Tom Brown", email: "tom.brown@example.com", age: 50 },
];

function Text({ models }) {
  console.log("models", models);
  return (
    <Layout>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={models} columns={columns} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const models = await prisma.models.findMany();

  return {
    props: { models },
  };
}

export default Text;
