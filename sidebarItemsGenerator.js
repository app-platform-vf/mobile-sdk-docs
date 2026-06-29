/**
 * Custom sidebar items generator that orders release docs newest first:
 *   2.2.0 -> 2.2.0-rc2 -> 2.2.0-rc1 -> 2.1.9
 * Official releases rank above their own release candidates. Non-version
 * items (e.g. an "index"/overview page) stay on top, and any other items
 * keep their original (stable) order.
 */

function parseVersion(value) {
  if (!value) return null;
  const name = String(value).split('/').pop(); // basename of the doc id
  const match = name.match(/(\d+)\.(\d+)\.(\d+)(?:-rc(\d+))?/i);
  if (!match) return null;
  const isRc = match[4] !== undefined;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    // Infinity keeps the official release on top within the same x.y.z.
    rc: isRc ? Number(match[4]) : Infinity,
  };
}

function compareReleases(a, b) {
  const va = parseVersion(a.type === 'doc' ? a.id : undefined);
  const vb = parseVersion(b.type === 'doc' ? b.id : undefined);

  if (!va && !vb) return 0; // stable: keep original order
  if (!va) return -1; // non-version (index/overview) stays on top
  if (!vb) return 1;

  if (va.major !== vb.major) return vb.major - va.major;
  if (va.minor !== vb.minor) return vb.minor - va.minor;
  if (va.patch !== vb.patch) return vb.patch - va.patch;
  return vb.rc - va.rc; // official first, then rc desc
}

function sortItems(items) {
  const next = items.map((item) =>
    item.type === 'category' && item.items
      ? {...item, items: sortItems(item.items)}
      : item,
  );
  return next.sort(compareReleases);
}

module.exports = async function sidebarItemsGenerator({
  defaultSidebarItemsGenerator,
  ...args
}) {
  const items = await defaultSidebarItemsGenerator(args);
  return sortItems(items);
};
