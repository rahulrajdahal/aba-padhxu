type LogLevel = "info" | "warn" | "error";

const isServer = typeof window === "undefined";
const isProduction = process.env.NODE_ENV === "production";

const log = (level: LogLevel, message: string, context?: any) => {
  if (!isServer) return;

  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    level: level.toUpperCase(),
    message,
    ...(context && {
      context: isProduction ? "[Context Hidden in Production]" : context,
    }),
  };

  if (isProduction && level === "info") return;

  switch (level) {
    case "error":
      console.error(JSON.stringify(logData));
      break;
    case "warn":
      console.warn(JSON.stringify(logData));
      break;
    case "info":
      console.info(JSON.stringify(logData));
      break;
  }
};

export const logger = {
  info: (message: string, context?: any) => log("info", message, context),
  warn: (message: string, context?: any) => log("warn", message, context),
  error: (message: string, context?: any) => log("error", message, context),
};
