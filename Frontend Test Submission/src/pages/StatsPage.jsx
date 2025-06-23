import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { getStats } from "../utils/api";
import Log from "../logger";

const StatsPage = () => {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState(null);

  const handleFetch = async () => {
    try {
      const res = await getStats(code);
      setStats(res.data);
      Log("frontend", "info", "api", "Fetched stats");
    } catch (err) {
      console.error(err);
      Log("frontend", "error", "api", "Failed to fetch stats");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">URL Stats</Typography>
      <TextField
        label="Shortcode"
        fullWidth
        margin="normal"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button variant="contained" onClick={handleFetch}>
        Get Stats
      </Button>

      {stats && (
        <Box mt={2}>
          <Typography>Original URL: {stats.originalUrl}</Typography>
          <Typography>Total Clicks: {stats.totalClicks}</Typography>
          {stats.clickDetails.map((click, idx) => (
            <Box key={idx} mt={1}>
              <Typography>Clicked at: {click.timestamp}</Typography>
              <Typography>Source: {click.source}</Typography>
              <Typography>Location: {click.location}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default StatsPage;
