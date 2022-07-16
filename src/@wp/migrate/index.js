import { Parser } from 'htmlparser2';

const tagToProperty = {
  em: 'italic',
  strong: 'bold',
  code: 'code',
};

export const contentToChildren = content => {
  const rootChildren = [];
  const stack = [rootChildren];
  const currentChildren = () => stack[stack.length - 1];
  let textNode = null;

  const parser = new Parser({
    onopentag(name, attribs, isImplied) {
      switch (name) {
        case 'code':
        case 'strong':
        case 'em':
          if (textNode == null) {
            textNode = { type: 'text', text: '' };
            currentChildren().push(textNode);
          } else if (textNode.text !== '') {
            textNode = { ...textNode, text: '' };
            currentChildren().push(textNode);
          }
          textNode[tagToProperty[name]] = true;
          break;
        case 'a':
          const a = {
            type: name,
            url: attribs.href,
            children: [],
          };
          if (textNode?.text === '') {
            a.children.push(textNode);
            currentChildren().pop();
          } else {
            textNode = null;
          }
          currentChildren().push(a);
          stack.push(a.children);
          break;
        case 'li':
          const li = {
            type: 'li',
            children: [
              {
                type: 'lic',
                children: [],
              },
            ],
          };
          currentChildren().push(li);
          stack.push(li.children[0].children);
          break;
        case 'blockquote':
          const quote = {
            type: 'mdxJsxFlowElement',
            name: 'ExtendedQuote',
            props: {
              children: {
                type: 'root',
                children: [],
              },
            },
          };
          currentChildren().push(quote);
          stack.push(quote.props.children.children);
          break;
        // Ignore span
        case 'span':
          break;
        case 'p':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'ul':
        case 'ol':
          const element = {
            type: name,
            children: [],
          };
          currentChildren().push(element);
          stack.push(element.children);
          break;
        default:
          throw new Error(`Failed to handle ${name} in Parser. HTML:
          
${content}`);
      }
    },
    ontext(text) {
      // If it's only whitespace, don't add it.
      if (!text.trim()) return;
      if (textNode) {
        textNode.text += text;
      } else {
        currentChildren().push({ type: 'text', text });
      }
    },
    onclosetag(name, isImplied) {
      // Ignore span
      if (name === 'span') return;
      // Move back up only if not inline tag.
      if (!['em', 'strong', 'code'].includes(name)) {
        // Remove if we added an empty text node before closing.
        if (textNode?.text === '') {
          const index = currentChildren().indexOf(textNode);
          if (index !== -1) {
            currentChildren().splice(index, 1);
          }
        }
        textNode = null;
        stack.pop();
      } else if (textNode != null) {
        textNode = { ...textNode, text: '' };
        delete textNode[tagToProperty[name]];
        currentChildren().push(textNode);
      }
    },
  });
  parser.write(content);
  parser.end();
  return rootChildren;
};
