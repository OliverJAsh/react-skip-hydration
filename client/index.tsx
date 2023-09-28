import { hydrateRoot } from 'react-dom/client';
import { App } from '../shared/App';

setTimeout(() => {
    console.log('Remove');
    document.querySelector('#A')?.remove();
    console.log('Hydrate');
    hydrateRoot(document.getElementById('root')!, <App />);
}, 3000);
