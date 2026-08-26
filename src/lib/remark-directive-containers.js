import { visit } from 'unist-util-visit';

/**
 * Renders remark-directive containers (must run AFTER remark-directive, at
 * the remark stage, so `data.hName` survives the mdast → hast conversion):
 *
 * - `:::details[Title]`  → <details class="directive-details"><summary>Title</summary>…</details>
 * - `:::note|tip|info|warning|caution|danger[Title]` → styled callout divs
 */
const CALLOUTS = ['note', 'tip', 'info', 'warning', 'caution', 'danger'];

function attrTitle(node) {
  const attrs = node.attributes;
  return attrs && typeof attrs.title === 'string' && attrs.title ? attrs.title : undefined;
}

function makeTitle(tagName, properties, value) {
  return {
    type: 'paragraph',
    data: { hName: tagName, hProperties: properties },
    children: [{ type: 'text', value }],
  };
}

export default function remarkDirectiveContainers() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      const { name } = node;
      const data = node.data || (node.data = {});
      const labelChild = node.children.find(
        (child) => child.data && child.data.directiveLabel === true,
      );
      const title = attrTitle(node);

      if (name === 'details') {
        data.hName = 'details';
        data.hProperties = { class: 'directive-details' };
        if (labelChild) {
          labelChild.data.hName = 'summary';
          if (title) labelChild.children = [{ type: 'text', value: title }];
        } else {
          node.children.unshift(makeTitle('summary', undefined, title || 'Details'));
        }
        return;
      }

      if (CALLOUTS.includes(name)) {
        data.hName = 'div';
        data.hProperties = { class: `callout callout--${name}` };
        if (labelChild) {
          labelChild.data.hName = 'div';
          labelChild.data.hProperties = { class: 'callout__title' };
          if (title) labelChild.children = [{ type: 'text', value: title }];
        } else {
          node.children.unshift(
            makeTitle('div', { class: 'callout__title' }, title || name),
          );
        }
      }
    });
  };
}
