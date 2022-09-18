interface HighlightedProps {
  text: string;
  highlight: string;
  className?: string;
}

const Highlighted = ({ text, highlight, className = "" }: HighlightedProps) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.filter(String).map((part, i) => {
        return regex.test(part) ? (
          <mark key={i}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
};

export default Highlighted;
