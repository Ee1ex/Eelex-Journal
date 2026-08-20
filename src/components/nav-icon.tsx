type NavIconName =
  | "about"
  | "archive"
  | "display"
  | "feedback"
  | "github"
  | "home"
  | "menu"
  | "project"
  | "search";

export function NavIcon({
  className = "eelex-nav-icon",
  name,
}: {
  className?: string;
  name: NavIconName;
}) {
  if (name === "github") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="currentColor"
        focusable="false"
        viewBox="0 0 32 32"
      >
        <path
          clipRule="evenodd"
          d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C27.42 29.06 32 23.06 32 16C32 7.16 24.84 0 16 0V0Z"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {name === "home" ? (
        <>
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10M9 20v-6h6v6" />
        </>
      ) : null}
      {name === "project" ? (
        <>
          <rect height="14" rx="2" width="18" x="3" y="5" />
          <path d="M7 5V3h10v2M7 10h4M7 14h8" />
        </>
      ) : null}
      {name === "about" ? (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8h.01" />
        </>
      ) : null}
      {name === "search" ? (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </>
      ) : null}
      {name === "display" ? (
        <>
          <path d="M12 22a10 10 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-1.8a1.5 1.5 0 0 0-1.2 2.4l.3.4a2 2 0 0 1-1.6 3.2Z" />
          <circle cx="7.5" cy="10.5" r=".75" />
          <circle cx="10" cy="6.5" r=".75" />
          <circle cx="15" cy="6.5" r=".75" />
          <circle cx="16.5" cy="11" r=".75" />
        </>
      ) : null}
      {name === "menu" ? <path d="M4 7h16M4 12h16M4 17h16" /> : null}
      {name === "archive" ? (
        <>
          <path d="M4 7h16v13H4zM3 4h18v3H3zM9 11h6" />
        </>
      ) : null}
      {name === "feedback" ? (
        <>
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
          <path d="M8 9h8M8 13h5" />
        </>
      ) : null}
    </svg>
  );
}
