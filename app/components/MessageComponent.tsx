import React, { FC } from "react";
interface MessageComponentProps {
  error?: string;
  message?: string;
}
const MessageComponent: FC<MessageComponentProps> = ({ error, message }) => {
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
        {error}
      </div>
    );
  }

  if (message) {
    return (
      <div className="bg-green-50 text-blue-600 p-3 rounded-lg text-sm border border-green-200">
        {message}asdasdasdasdas
      </div>
    );
  }
  return null;
};

export default MessageComponent;
