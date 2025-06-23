import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { createShortUrl } from "../utils/api";
import Log from "../logger";
import "../styles/ShortenerPage.css";

const ShortenerPage = () => {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [result, setResult] = useState(null);

  const handleShorten = async () => {
    if (!url.startsWith("http")) {
      alert("Enter a valid URL with http/https");
      Log("frontend", "error", "component", "Invalid URL format");
      return;
    }

    try {
      const payload = { url };
      if (validity) payload.validity = parseInt(validity);
      if (shortcode) payload.shortcode = shortcode;

      const res = await createShortUrl(payload);
      setResult(res.data);
      Log("frontend", "info", "api", "Short URL created");
    } catch (err) {
      console.error(err);
      Log("frontend", "error", "api", "Failed to create short URL");
    }
  };

  return (
    <div className="shortener-container">
      <Box className="shortener-box" p={4}>
        <Typography variant="h4" mb={2}>
          URL Shortener
        </Typography>

        <TextField
          label="Long URL"
          fullWidth
          margin="normal"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
          label="Validity (minutes)"
          fullWidth
          margin="normal"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />
        <TextField
          label="Custom Shortcode"
          fullWidth
          margin="normal"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleShorten}
          sx={{ mt: 2 }}
        >
          Shorten
        </Button>

        {result && (
          <Box mt={3}>
            <Typography>
              <strong>Short Link:</strong> {result.shortLink}
            </Typography>
            <Typography>
              <strong>Expires at:</strong> {result.expiry}
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ShortenerPage;
