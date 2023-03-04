import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/router";

export default function NavTabs() {
  const [value, setValue] = React.useState("listmodels");
  const router = useRouter();
  const { pathname } = router;

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
        {/* <Tab label="publish" value="publish" disabled /> */}
        <Tab label="publish ai models" value="aimodels" />
        <Tab label="publish datasets" value="datasets" />
      </Tabs>
    </Box>
  );
}
