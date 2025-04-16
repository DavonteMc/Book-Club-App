import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";
import { GroupContextProvider } from "./_utils/group-context";
import { ProgressContextProvider } from "./_utils/progress-context";

export const metadata = {
  title: "Shopping List",
  description: "Assignment Project for Web Development 2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <GroupContextProvider>
            <ProgressContextProvider>{children}</ProgressContextProvider>
          </GroupContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
