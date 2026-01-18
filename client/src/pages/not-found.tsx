import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-4rem)] w-[calc(100%+2rem)] md:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)] -m-4 md:-m-6 lg:-m-8 flex flex-col items-center justify-center bg-white dark:bg-neutral-950 relative px-6 overflow-hidden">
      {/* void baby! with big bang shit texture */}
      <h1
        className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-black leading-none tracking-tight select-none mb-4"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #1a1a4e 0%, #4a2c7a 25%, #7b4397 50%, #2c1654 75%, #1a1a4e 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
        data-testid="text-oops"
      >
        Void!
      </h1>

      {/* 404 - Page Not Found */}
      <h2
        className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a1a4e] dark:text-purple-300 tracking-wide mb-4"
        data-testid="text-404-title"
      >
        404 - PAGE NOT FOUND
      </h2>

      {/* Description */}
      <p
        className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base text-center max-w-md mb-10 leading-relaxed"
        data-testid="text-404-description"
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Dashboard Button */}
      <Link href="/">
        <Button
          className="bg-[#1a1a4e] hover:bg-[#2a2a6e] text-white font-medium px-6 py-2.5 h-auto rounded-full text-sm tracking-wide transition-all duration-200"
          data-testid="button-go-dashboard"
        >
          GO TO DASHBOARD
        </Button>
      </Link>

      {/* Contact Support */}
      <p
        className="absolute bottom-6 text-xs text-neutral-400 dark:text-neutral-500"
        data-testid="text-contact-support"
      >
        Need help? Contact support:{" "}
        <span className="font-medium text-neutral-500 dark:text-neutral-400">7889277705</span>
      </p>
    </div>
  );
}
