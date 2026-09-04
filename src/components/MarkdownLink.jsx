export default function MarkdownLink({ href = '', children, ...props }) {
  const isExternal = /^(https?:)?\/\//i.test(href)

  return (
    <a
      {...props}
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
