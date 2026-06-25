/**
 * Navigation definition for the docs sidebar.
 *
 * The order and grouping here drive both the desktop sidebar and the mobile
 * "Browse" overlay. Slugs are relative to the site root (no leading slash here;
 * it's added in the components).
 */

export interface NavItem {
  title: string;
  slug: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { title: 'Overview', slug: 'overview' },
  { title: 'Users', slug: 'users' },
  { title: 'Key User Flows', slug: 'key-user-flows' },
  { title: 'Key Admin Flows', slug: 'key-admin-flows' },
  { title: 'Data Model', slug: 'data-model' },
  { title: 'Reporting Flows', slug: 'reporting-flows' },
  {
    title: 'Developer Docs',
    slug: 'developer-docs',
    children: [
      { title: 'Technical Overview', slug: 'developer-docs/technical-overview' },
      {
        title: 'Proposing Change Requests',
        slug: 'developer-docs/proposing-change-requests',
      },
      { title: 'Design Guidelines', slug: 'developer-docs/design-guidelines' },
    ],
  },
];

/**
 * Normalize a path to a comparable slug:
 *   "/overview/"  -> "overview"
 *   "/"           -> ""
 */
export function pathToSlug(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, '');
}
