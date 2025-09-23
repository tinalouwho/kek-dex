import LandingPage from "@/components/LandingPage";
import MatrixRainBackground from "@/components/MatrixRainBackground";

export default function HomePage() {
  return (
    <div className="landing-page flex flex-col justify-center items-center relative">
      <MatrixRainBackground />
      <LandingPage />
    </div>
  );
}
