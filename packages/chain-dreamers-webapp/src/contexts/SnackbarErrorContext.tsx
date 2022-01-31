import React from "react";

export const SnackbarErrorContext = React.createContext<{
  error: string | null;
  setError: (error: string | null) => void;
}>({
  error: null,
  setError: () => {},
});
