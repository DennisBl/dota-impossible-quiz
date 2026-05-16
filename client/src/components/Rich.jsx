/* Renders trusted HTML fragments from the question bank (em/strong/span).
   Content is authored server-side in seed data, not user input. */
export default function Rich({ html, as: Tag = 'span', ...rest }) {
  return <Tag dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
}
