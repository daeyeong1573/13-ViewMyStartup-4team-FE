function CloseIcon({ onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <circle cx="8" cy="8" r="8" fill="#747474" />
      <path
        d="M10.5 5.5L5.5 10.5M5.5 5.5L10.5 10.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CloseIcon;
