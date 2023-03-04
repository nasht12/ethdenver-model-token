import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import styles from "@/styles/Home.module.css";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

/* configure Infura auth settings */
// const projectId = process.env.INFURA_PROJECTID;
// const projectSecret = process.env.INFURA_PROJECTSECRET;
const projectId = "";
const projectSecret = "";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

/* Create an instance of the client */
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

function Datasets() {
  const { data: session } = useSession();
  const [fileUrl, updateFileUrl] = useState(``);

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      updateFileUrl(url);
      console.log("IPFS URI: ", url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  if (!session) {
    return (
      <Layout>
        <main className={styles.main}>
          <h1>Publish Dataset</h1>
          <div>Need to be authenticated to view this page.</div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ backgroundColor: "black", color: "white", padding: "10px" }}
        >
          Publish Dataset
        </Typography>
        {/* <input type="file" onChange={onChange} />
        {fileUrl && (
          <div>
            <img src={fileUrl} width="600px" />
            <a href={fileUrl} target="_blank">
              {fileUrl}
            </a>
          </div>
        )} */}
        <Card>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                // marginBottom: "10px",
              }}
            >
              <Typography variant="body1" gutterBottom sx={{ margin: "20px" }}>
                Upload Dataset:
              </Typography>
              <input type="file" onChange={onChange} />
            </div>
            {fileUrl && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={fileUrl}
                  width="600px"
                  style={{ marginRight: "10px" }}
                />
                <div>
                  <label>File URL:</label>
                  <a
                    href={fileUrl}
                    target="_blank"
                    style={{ marginLeft: "5px" }}
                  >
                    {fileUrl}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <form action="/api/datasets" method="POST">
          <TextField
            label="Name"
            name="name"
            fullWidth
            variant="standard"
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            variant="standard"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            fullWidth
            variant="standard"
            margin="normal"
          />
          <TextField
            label="IPFS Hash"
            name="ipfsHash"
            fullWidth
            variant="standard"
            margin="normal"
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#212121" }}
          >
            Publish
          </Button>
        </form>
      </main>
    </Layout>
  );
}

export default Datasets;
