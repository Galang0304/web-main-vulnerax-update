export default function DynamicContent({ content, style, styleOverrides = {} }) {
    return (
      <div style={style}>
        {content.map((item, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: item }}
            style={{
              ...style,
              ...(styleOverrides[item.match(/<(\w+)/)?.[1]] || {}),
            }}
          />
        ))}
      </div>
    );
  }
