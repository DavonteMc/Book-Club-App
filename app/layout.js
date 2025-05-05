import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";
import { DataContextProvider } from "./_utils/data_context";
import { AppContextProvider } from "./_utils/app-context";

export const metadata = {
  title: "Bookie",
  description:
    "Bookie is a book club app that helps you connect with other readers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-serif bg-neutral-50 text-emerald-950">
        <AuthContextProvider>
          <AppContextProvider>
            <DataContextProvider>{children}</DataContextProvider>
          </AppContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
