import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";

export default function NavTabs() {
  const [value, setValue] = React.useState("listmodels");
  const router = useRouter();
  const { pathname } = router;
  const [isConnected, setIsConnected] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(`/${newValue}`);
  };

  React.useEffect(() => {
    const pathValue = pathname.substring(1);
    setValue(pathValue);
  }, [pathname]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <Tab label="list models" value="listmodels" />
        <Tab label="list datasets" value="listdatasets" />
        <Tab label="publish ai models" value="aimodels" />
        <Tab label="publish datasets" value="datasets" />
      </Tabs>
    </Box>
  );
}
