import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/router";

export default function NavTabs() {
  const [value, setValue] = React.useState("text");
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
        <Tab label="text" value="text" />
        <Tab label="media" value="media" />
        <Tab label="code" value="code" />
        <Tab label="publish" value="publish" />
        <Tab label="about" value="about" />
      </Tabs>
    </Box>
  );
}
