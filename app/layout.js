import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";
import { ProgressContextProvider } from "./_utils/progress-context";
import { DataContextProvider } from "./_utils/data_context";

export const metadata = {
  title: "Shopping List",
  description: "Assignment Project for Web Development 2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <DataContextProvider>
              <ProgressContextProvider>{children}</ProgressContextProvider>
          </DataContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
