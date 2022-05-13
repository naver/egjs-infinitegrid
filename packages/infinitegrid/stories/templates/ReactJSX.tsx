import * as React from "react";

export function getApp(
  appFunc: (props: Record<string, any>) => any,
  containerFunc: () => JSX.Element,
) {
  function App(props: Record<string, any>) {
    const gridRef = React.useRef<any | null>(null);

    React.useEffect(() => {
      gridRef.current = appFunc(props);

      return () => {
        gridRef.current!.destroy();
      };
    }, []);

    return containerFunc();
  }

  return function render (props: Record<string, any>) {
    return <App key={Math.random()} {...props}/>;
  }.bind({});
}
