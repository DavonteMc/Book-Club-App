import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";

export const metadata = {
  title: "Shopping List",
  description: "Assignment Project for Web Development 2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
