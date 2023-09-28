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

export const App = () => {
    const isFirstRender = useIsFirstRender();
    const isBrowser = typeof window !== 'undefined';
    const all = ['A', 'B'];
    const elements = isBrowser ? ['B'] : all;
    const unused = ['A'];

    if (typeof window !== 'undefined' && isFirstRender) {
        unused.map((id) => {
            console.log('Remove', id);
            document.querySelector(`#${id}`)?.remove();
        });
    }

    return (
        // TODO: why is div required??
        <div>
            {elements.map((value) => (
                <div id={value} key={value}>
                    <Item value={value} />
                </div>
            ))}
        </div>
    );
};
