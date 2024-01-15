import React, {ReactNode} from "react";

function AuthLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}

export default AuthLayout;
