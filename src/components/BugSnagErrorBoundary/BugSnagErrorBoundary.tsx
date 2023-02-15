import React from "react";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact, {
  BugsnagPluginReactResult,
} from "@bugsnag/plugin-react";
import { browser } from "@bugsnag/source-maps";

// start service
Bugsnag.start({
  apiKey: "5984a70a690788253f53643d5b481dab",
  appVersion: "1.0.0",
  plugins: [new BugsnagPluginReact()],
});

console.log("bugsnag started");

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
