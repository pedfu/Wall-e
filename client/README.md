# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

ADICIONAR CHAT E LOGIN
PARA USAR O BACK MESMO QUE NAO TENHA GERACAO DE IMAGEM (POR CONTA DO PRECO)

ADICIONAR CONTEXT PRA SALVAR LOGIN
VERIFICAT SE NAO ESTIVER LOGADO, EXIGE O CREATE NO TOPO? MAS TB PRECISA MOSTRAR O BOTAO DE DESLOGAR

FLEX STRETCH PRA OCULPAR TODA TELA

# Technologies used

- Vite: faster server start, instant update (invalidate the chain betwwen the edited module and its closest HMR - hot module replacement - boundary).
- Tailwind: CSS framework.
- Redux-thunk: allow dispatch to call a thunk service or function, and then (inside thunk) call new dispatches with error, success or other cases.
- Redux-promise-middleware: robust way to handle async actions. Transform the action in pending, fulfulled or rejected actions.
- Redux-devtools: allow to use redux console in development mode
- React-cookies: load and save cookies using React
- Redux-logger: allow developer to check redux action in console

# Structure

- assests
- components
- constants
- hooks
- pages
- store
- utils
