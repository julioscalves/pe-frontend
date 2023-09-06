import Link from "next/link";

export default function Tag({ label, link, color }) {
  return (
    <Link href={`${link}`}>
      <span className="inline-flex min-w-fit max-w-fit">
        <span
          className={`bg-${color}-700 text-${color}-200 hover:bg-${color}-900 text-sm font-mono font-medium subpixel-antialiased mr-2 px-2.5 py-0.5 rounded`}
        >
          {label.toUpperCase()}
        </span>
      </span>
    </Link>
  );
}
