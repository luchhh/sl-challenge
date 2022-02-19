import { useState } from "react";

/**
 * Experimental hook. Bundles two strings so when a value is assigned to one, the other gets clear
 * Useful for message and error strings where only one should have a value
 */
export const useMessageErrorBundle = (): [
  string,
  string,
  Function,
  Function,
  Function
] => {
  const [error, _setError] = useState("");
  const [message, _setMessage] = useState("");
  const clearMessageError = () => {
    _setError("");
    _setMessage("");
  };

  const setMessage = (newMessage: string) => {
    _setError("");
    _setMessage(newMessage);
  };

  const setError = (newError: string) => {
    _setMessage("");
    _setError(newError);
  };

  return [message, error, setMessage, setError, clearMessageError];
};
