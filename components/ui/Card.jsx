export default function Card({ className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag
      className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-sm ${className}`}
      {...rest}
    />
  );
}

export function CardHeader({ className = "", ...rest }) {
  return <div className={`px-5 pt-5 ${className}`} {...rest} />;
}

export function CardBody({ className = "", ...rest }) {
  return <div className={`p-5 ${className}`} {...rest} />;
}

export function CardFooter({ className = "", ...rest }) {
  return (
    <div
      className={`px-5 py-4 border-t border-zinc-100 dark:border-zinc-900 ${className}`}
      {...rest}
    />
  );
}
