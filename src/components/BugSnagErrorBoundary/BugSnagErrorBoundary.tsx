import React from "react";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact, {
  BugsnagPluginReactResult,
} from "@bugsnag/plugin-react";

import { getAppVersion } from "utils";

// start service if not in local development
if (process.env.NODE_ENV !== "development") {
  Bugsnag.start({
    apiKey: process.env.REACT_APP_BUGSNAG_API_KEY as string,
    appVersion: getAppVersion(),
    plugins: [new BugsnagPluginReact()],
    releaseStage: process.env.REACT_APP_BUGSNAG_RELEASE_STAGE as string,
  });

  console.log("bugsnag started");
}

const plugin = Bugsnag.getPlugin("react") as BugsnagPluginReactResult;
const ErrorBoundary = plugin?.createErrorBoundary(React);

interface BugSnagErrorBoundaryProps {
  children: React.ReactNode;
}

const BugsnagErrorBoundary = ({ children }: BugSnagErrorBoundaryProps) => {
  if (ErrorBoundary) {
    return <ErrorBoundary>{children}</ErrorBoundary>;
  }

  return <>{children}</>;
};

export default BugsnagErrorBoundary;
