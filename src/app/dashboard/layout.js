import "../globals.css";

export const metadata = {
    title: "SuffX Dashboard"
};

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col bg-slate-900">
        {children}
    </div>
  );
}
