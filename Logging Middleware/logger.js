const axios = require("axios");

const LOG_SERVER_URL = "http://20.244.56.144/evaluation-service/logs";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjAzMDUxMDUwNTUzQHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc1MDY3MDY3MSwiaWF0IjoxNzUwNjY5NzcxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYWE0M2FjNDEtNjEwYS00ZTM2LTg0MzItODViNjE0NDBlM2MyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic29oYW0gY2hhdmFuIiwic3ViIjoiNGJlZmYzNjktZDFhNy00MzRiLWFhMmEtYTZkMGU5MDdkMDY4In0sImVtYWlsIjoiMjIwMzA1MTA1MDU1M0BwYXJ1bHVuaXZlcnNpdHkuYWMuaW4iLCJuYW1lIjoic29oYW0gY2hhdmFuIiwicm9sbE5vIjoiMjIwMzA1MTA1MDU1MyIsImFjY2Vzc0NvZGUiOiJUUnpnV00iLCJjbGllbnRJRCI6IjRiZWZmMzY5LWQxYTctNDM0Yi1hYTJhLWE2ZDBlOTA3ZDA2OCIsImNsaWVudFNlY3JldCI6InFqRmJaZ01nWEVLdUJlSnIifQ.58IMagM_7gwS093NFSI7wxP6Mq2xMBiAOninU2Jw8LU";

const Log = async (stack, level, pkg, message) => {
  try {
    const logPayload = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: pkg.toLowerCase(),
      message: message,
    };

    await axios.post(LOG_SERVER_URL, logPayload, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    console.log("Log sent successfully");
  } catch (error) {
    console.error(
      "Failed to send log to log server:",
      error.response?.status,
      error.response?.data
    );
  }
};

module.exports = Log;