/** Renders a single `<script type="application/ld+json">` tag from a plain
 * object (or array of objects, via `@graph`). Server component — no client
 * JS involved, safe to render from a layout body. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
