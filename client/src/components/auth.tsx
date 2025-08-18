import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import { PageLoader } from "./page-loader";

interface AuthProps {
  component: ComponentType;
}

export const Auth: React.FC<AuthProps> = ({
  component,
}) => {

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};
