import * as React from 'react';

export const Expensive = () => {
    // Hog main thread for 1 second
    const start = Date.now();
    while (Date.now() - start < 1000) {
        // do nothing
    }

    console.log('Render Expensive');

    return <div>Expensive</div>;
};

const Item: React.FC<{ value: string }> = ({ value }) => {
    console.log('Render Item', value);

    React.useEffect(() => {
        console.log('Mount Item', value);
    }, []);

    return (
        <div style={{ border: '1px solid black' }}>
            <Expensive />
            <input defaultValue={value} />
        </div>
    );
};

const useIsFirstRender = (): boolean => {
    const isFirst = React.useRef(true);

    if (isFirst.current) {
        isFirst.current = false;

        return true;
    } else {
        return false;
    }
};

export const SkipRenderOnClient: React.FC<{
    children: React.ReactNode;
    id: string;
    shouldRenderOnClient: boolean;
}> = ({ children, id, shouldRenderOnClient }) => {
    const isBrowser = typeof window !== 'undefined';
    const isFirstRender = useIsFirstRender();

    if (isBrowser && isFirstRender && shouldRenderOnClient === false) {
        const el = document.querySelector(`#${id}`);
        if (el !== null) {
            console.log('Empty', id);
            el.innerHTML = '';
        }
    }

    const shouldRender = isBrowser ? shouldRenderOnClient : true;
    return <div id={id}>{shouldRender && children}</div>;
};

export const App = () => {
    const isBrowser = typeof window !== 'undefined';
    const all = ['A', 'B'];
    const render = isBrowser ? ['B'] : all;

    return all.map((id) => (
        <SkipRenderOnClient
            key={id}
            id={id}
            shouldRenderOnClient={render.includes(id)}
        >
            <Item value={id} />
        </SkipRenderOnClient>
    ));
};
