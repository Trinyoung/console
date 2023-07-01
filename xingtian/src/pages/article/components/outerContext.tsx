import { createContext } from 'react';
// const OuterProvider = () => {
//     const OuterContext = createContext({name: 'lqy'})
//     return OuterContext;
// }
// export default OuterProvider()
interface ContextProps { 
    name?: string
}
const OuterContext = createContext<ContextProps>({});
export default OuterContext;