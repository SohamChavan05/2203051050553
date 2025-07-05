import axios from "axios";

const LOG_SERVER_URL = "http://20.244.56.144/evaluation-service/logs";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjAzMDUxMDUwNTUzQHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc1MTY5MjY5MywiaWF0IjoxNzUxNjkxNzkzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMjIxMWUwZWQtZjJiNC00ZTBjLWIyNmMtZGVjMjBmMTA4ZWIyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic29oYW0gY2hhdmFuIiwic3ViIjoiMzI1ZTcyOGMtMDMwNC00YmU0LWI0MDMtNGE1MmI4OGZkMGFjIn0sImVtYWlsIjoiMjIwMzA1MTA1MDU1M0BwYXJ1bHVuaXZlcnNpdHkuYWMuaW4iLCJuYW1lIjoic29oYW0gY2hhdmFuIiwicm9sbE5vIjoiMjIwMzA1MTA1MDU1MyIsImFjY2Vzc0NvZGUiOiJaU3ViQ1oiLCJjbGllbnRJRCI6IjMyNWU3MjhjLTAzMDQtNGJlNC1iNDAzLTRhNTJiODhmZDBhYyIsImNsaWVudFNlY3JldCI6ImJYTkZyUG14cHRqRm1oRW0ifQ.LBBbz38dCuCFklYuPgiakGWN_KAT-y89SqCV68uHSjA";

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

export default Log;
