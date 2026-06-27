import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from "./components/layout/header";
import Home from "./pages/home";

export default function App() {
  return (
    <>
      <Header />
      <Home />
      <SpeedInsights />
    </>
  );
}
