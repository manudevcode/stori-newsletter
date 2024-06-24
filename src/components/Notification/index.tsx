import { ReactElement } from "react";

const COLORS: {
  [index: string]: {
    text: string;
    button: string;
    background: string;
  };
} = {
  info: {
    text: "text-blue-500",
    button:
      "bg-blue-50 text-blue-500 focus:ring-2 focus:ring-blue-400 hover:bg-blue-200",
    background: "bg-blue-50",
  },
  success: {
    text: "text-green-500",
    button:
      "bg-green-50 text-green-500 focus:ring-2 focus:ring-green-400 hover:bg-green-200",
    background: "bg-green-50",
  },
  error: {
    text: "text-red-500",
    button:
      "bg-red-50 text-red-500 focus:ring-2 focus:ring-red-400 hover:bg-red-200",
    background: "bg-red-50",
  },
  warning: {
    text: "text-amber-500",
    button:
      "bg-amber-50 text-amber-500 focus:ring-2 focus:ring-amber-400 hover:bg-amber-200",
    background: "bg-amber-50",
  },
};

export const Notification = ({
  title,
  type = "info",
  children,
  removeNotification,
}: {
  id: number;
  title: string;
  type: "info" | "success" | "error" | "warning";
  children: ReactElement[] | ReactElement | string;
  removeNotification: () => void;
}) => {
  return (
    <div
      className={`notification flex p-4 mb-4 rounded-lg ${COLORS[type].background} ${COLORS[type].text}`}
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="flex-shrink-0 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">{title}</span>
      <div className="ml-3 text-sm font-medium">{children}</div>
      <button
        type="button"
        onClick={removeNotification}
        className={`ml-1 -mr-1 -my-1.5  rounded-lg p-1.5 ${COLORS[type].button} inline-flex h-8 w-8`}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
